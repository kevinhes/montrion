import React , { useState } from "react";
import axios from "axios";
import Image from 'next/image'
import Link from 'next/link';
import { HeaderElement } from '../components/Header'

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
  const [activeBanner, setActiveBanner] = useState(null);
  function bgChangeEnter(index) {
    setActiveBanner(index);
  }
  function bgChangeLeave() {
    setActiveBanner();
  }
  const routeMapping = ['/history', '/assets', '/contact']
  return (
    <div className="relative">
      <HeaderElement></HeaderElement>
      {/* banner */}
      <div className="relative flex justify-center items-center w-screen h-screen">
        <div className="container relative z-10">
          <div className="grid grid-cols-4">
            <div className="col-start-2 col-end-4">
              <h2 className="text text-white text-center text-6xl font-crimson">{banner.title}</h2>
            </div>
          </div>
        </div>
        <div className="absolute w-full h-full top-0 left-0">
          <Image
            src={banner.banner_img['url']}
            fill
            alt="bannner image"
            cover/>
        </div>
        {
          banner_list.map((bannerItem, index) => (
            <div key={index} className={`absolute w-full h-full top-0 left-0 flex justify-center items-center transition-opacity duration-300 z-20 ${activeBanner === index ? 'opacity-100' : 'opacity-0'}`}>
              <div className="relative z-10">
                <h2 className="text text-white text-center text-6xl font-crimson w-[905px]">{bannerItem.content}</h2>
              </div>
              <Image
                src={bannerItem.bg_img['url']}
                fill
                alt="banner image"
                cover
                className="absolute w-full h-full top-0 left-0"
              />
            </div>
          ))
        }
      </div>
      {/* banner switch */}
      <div className="absolute bottom-0 flex justify-between w-full items-end z-20">
        {banner_list.map((item, index) => (
            <Link href={routeMapping[index]}
              key={index} 
              className={`w-1/3 h-[50px] py-[13px] flex justify-center hover:h-[120px] group ${index === 0 ? "bg-[#2E4E4C]" : index === 1 ? "mx-[1px] bg-[#723C3F]" : "bg-[#606060]"}`} 
              onMouseEnter={() => bgChangeEnter(index)}
              onMouseLeave={bgChangeLeave}> 
              <div className="h-6 overflow-hidden group-hover:h-[60px]">
                <Image
                  src={up_arrow['url']}
                  width={24}
                  height={24}
                  alt="up arrow"
                  className="ml-auto mr-auto block h-[24px]"
                />
                <p className="text-white font-opensans text-[28px] leading-[18px] font-semibold mt-[11px]">{item.title}</p>
              </div>
            </Link>
          ))}
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