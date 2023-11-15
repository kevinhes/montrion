import React , { useState, useEffect } from "react";
import axios from "axios";
import Image from 'next/image'
import Link from 'next/link';
import { HeaderElement } from '../components/Header'

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDeviceType = () => {
      setIsMobile(window.innerWidth <= 768);
    }

    window.addEventListener('resize', checkDeviceType);
    checkDeviceType();

    return () => {
      window.removeEventListener('resize', checkDeviceType);
    }
  }, []);

  return isMobile;
};

export async function getStaticProps() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/wp-json/custom/v1/home`
    );

    // 解构响应中的数据
    const { banner, banner_list,  up_arrow } = response.data;

    return {
      props: {
        banner,
        banner_list,
        up_arrow,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching home page content:", error);
    return {
      props: {
        banner,
        banner_list,
        up_arrow,
      },
    };
  }
}

export default function Home({ banner, banner_list, up_arrow }) {
  const [activeBanner, setActiveBanner] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredTab, setHoveredTab] = useState(null);
  const [sliding, setSliding] = useState(1);
  const [cookieAgree, setCookieAgree] = useState(false);
  const [bannerScale, setBannerScale] = useState(true);

  function bannerScaleChange(status) {
    setBannerScale(status)
  }

  function changeCookie (status) {
    setCookieAgree(status);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if ( !isHovering ) {
        setActiveBanner((prevBanner) => {
          const newBanner = (prevBanner + 1) % banner_list.length;
          setHoveredTab(newBanner - 1);
          if ( prevBanner === 1) {
            setBannerScale(false);
          } else if ( prevBanner === 3 ) {
            setBannerScale(true);
          }
          return newBanner;
      });      
      }
    }, 5000);
  
    // 清除定時器，當組件卸載時
    return () => clearInterval(interval);
  }, [isHovering]);
  const isMobile = useIsMobile();

  function bgChangeEnter(e,index) {
    if ( isMobile ) {
      e.preventDefault();
      setActiveBanner(index);
      setIsHovering(true);
      setHoveredTab(null);
      setSliding(1);
    } else {
      // setBannerScale(false);
      setActiveBanner(index);
      setIsHovering(true);
      setHoveredTab(null);
      setSliding(1);
      // bannerScaleChange(true);
    }
  }

  function bgChangeLeave() {
    setBannerScale(false);
    setActiveBanner();
    setIsHovering(false);
    setSliding(0);
    setActiveBanner(0)
    setTimeout(() => {
      setBannerScale(true);
    }, 100);
  }
  
  const routeMapping = ['/history', '/assets', '/contact', '/']
  const mobileRouteMapping = ['/', '/history', '/assets', '/contact']
  return (
    <div className="relative h-full page-ani">
      <HeaderElement></HeaderElement>
      {/* banner */}
      <div className={`relative flex justify-center items-center h-full overflow-hidden `}>
        <div className={`relative z-10`}>
          <div className="w-[303px] md:w-[480px]">
            <h2
              className="text-white text-center font-crimsontext font-semibold
              text-[32px] leading-[42px]
              md:text-[2em] md:leading-[54px]">
              {banner.title}
            </h2>
          </div>
        </div>
        <div className={`absolute w-full h-full top-0 left-0`}>
          <Image
            src={banner.banner_img['url']}
            width={1534}
            height={985}
            alt="bannner image"
            className={`hidden md:block w-full h-full object-cover ${sliding === 1 ? 'opacity-0' : 'scale-animation'}`} />
          <Image
            src={banner.sm_banner_img['url']}
            width={375}
            height={646}
            alt="bannner image"
            className='md:hidden w-full h-full object-cover'/>
        </div>
        {
          banner_list.map((bannerItem, index) =>  {
            return (
            <div
              key={index}
              className={`absolute w-full h-full top-0 left-0 flex justify-center
              items-center transition-opacity duration-[1500ms] z-20
              ${activeBanner === index ? 'opacity-100 z-30' : 'opacity-0'}`}>
              <div className="relative z-10">
                <h2 className={`text-white text-center font-crimsontext w-[303px] md:w-[500px] mb-5 md:mb-0
                text-[26px] leading-normal
                md:text-[2em] md:leading-[1.2]`} dangerouslySetInnerHTML={{ __html: bannerItem.content }} />
                <div className="flex justify-center">
                  <Link href={mobileRouteMapping[index]}
                    className="md:hidden block py-[14px] px-[30px]
                    border border-white text-white hover:bg-white hover:text-black ">
                    Learn more
                  </Link>
                </div>
              </div>
              {/* <Image
                src={bannerItem.bg_img['url']}
                width={1534}
                height={985}
                alt="banner image"
                className={`absolute w-full h-full top-0 left-0 object-cover hidden md:block scale-animation
                  ${index === 0 ? (activeBanner === 0 ? 'scale-animation' : 'scale-down-animation') : ''}`}
              /> */}
              <Image
                src={bannerItem.bg_img['url']}
                width={1534}
                height={985}
                alt="banner image"
                className={`absolute w-full h-full top-0 left-0 object-cover hidden md:block
                ${index === 0 ? (bannerScale === true ? 'scale-animation' : '') : ''}`}
              />
              <Image
                src={bannerItem.sm_background_img['url']}
                width={375}
                height={646}
                alt="banner image"
                className={`absolute w-full h-full top-0 left-0 object-cover object-bottom md:hidden
                ${index === 0 ? (bannerScale === true ? 'scale-animation' : '') : ''}`}
              />
            </div>)
          }
          )
        }
      </div>
      {/* banner switch */}
      <div className=" absolute bottom-0 hidden md:flex justify-between w-full items-end z-50 h-[120px] overflow-hidden">
      {banner_list.filter((_, index) => index <= 3 && index > 0).map((item, index) => (
        <Link href={routeMapping[index]}
          key={index} 
          className={`select-tab w-1/3 h-[40px] py-[13px] flex justify-center ${index === hoveredTab ? "active" : ""} hover:h-[90px] group ${index === 0 ? "bg-[#2E4E4C]" : index === 1 ? "mx-[1px] bg-[#723C3F]" : "bg-[#606060]"}`} 
          onMouseEnter={(e) => bgChangeEnter(e,index + 1)}
          onMouseLeave={bgChangeLeave }>
          <div className="h-6 overflow-hidden group-hover:h-[60px]">
            <Image
              src={up_arrow['url']}
              width={20}
              height={20}
              alt="up arrow"
              className="ml-auto mr-auto block h-[24px] opacity-30 group-hover:opacity-100"
            />
            <p className="text-white font-opensans text-[18px] uppercase font-normal leading-[18px] mt-[5px]">{item.title}</p>
          </div>
        </Link>
      ))}
      </div>
      <div className=" absolute bottom-0 flex md:hidden justify-between w-full items-end z-50">
        {banner_list.filter((_, index) => index <= 3 && index > 0).map((item, index) => (
            <Link href={mobileRouteMapping[index]}
              key={index} 
              className={`select-tab w-1/3 h-[48px] py-[15px] flex justify-center hover:items-center hover:h-[60px] group ${index === 0 ? "bg-[#2E4E4C]" : index === 1 ? "mx-[1px] bg-[#723C3F]" : "bg-[#606060]"}`} 
              onClick={(e) => bgChangeEnter(e,index + 1)}>
              <div className="overflow-hidden">
                <Image
                  src={up_arrow['url']}
                  width={18}
                  height={18}
                  alt="up arrow"
                  className="ml-auto mr-auto block h-[18px] group-hover:hidden"
                />
                <p className="text-white font-opensans text-[16px] leading-[20px] font-semibold mt-[20px] group-hover:mt-0">{item.title}</p>
              </div>
            </Link>
          ))}
      </div>
      {/* cookie */}
      <div className={`fixed w-[623px] h-[215px] right-[35px] bottom-[66px] py-[33px] pl-[35px] pr-[23px] bg-[#222727] z-50 hidden ${cookieAgree === true ? 'md:hidden' : 'md:block'}`}>
        <h4 className="text-[18px] font-crimson text-white mb-3 leading-[20px]">We value your privacy</h4>
        <p className="text-[14px] text-white font-opensans mb-[18px] leading-[19px]">We use cookies to enhance your browsing experience and analyze our traffic. By clicking on the “Agree” button or continuing to browse this website, you agree to our use of cookies. To learn more, please view our <Link href="/privacy" className="underline">Privacy Policy</Link>.</p>
        <div className="flex">
          <button
            onClick={() => changeCookie(true)}
            className="bg-[#723C3F] text-white font-opensans font-semibold h-[44px] text-[16px] leading-[20px] py-[12px] px-[20px] mr-5">Agree
          </button>
          <button
            onClick={() => changeCookie(false)}
            className="text-white border border-white font-opensans font-semibold h-[44px] text-[16px] leading-[20px] py-[12px] px-[20px]">Disagree
          </button>
        </div>
      </div>
    </div>
  );
}

// const fetchHomePageContent = async () => {
//   console.log(process.env.NEXT_PUBLIC_API_ENDPOINT);
//   try {
//     const response = await axios.get(
//       "http://montrion.local/wp-json/custom/v1/home"
//     );

//     console.log("data", response);

//     // 解构响应中的数据
//     // const { title, content } = response.data;

//     // 更新标题和内容的状态
//   } catch (error) {
//     console.error("Error fetching home page content:", error);
//   }
// };

// fetchHomePageContent();