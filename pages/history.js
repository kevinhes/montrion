import { HeaderPageElement } from '../components/HeaderPage'
import Image from 'next/image'
import axios from "axios";
import { FooterElement } from '../components/Footer'


export default function OverView({ bannerGroup, contentList }) {
  console.log(bannerGroup, contentList);
  return (
    <div>
      <HeaderPageElement></HeaderPageElement>
      <div className="relative md:h-[730px] lg:h-[660px] xl:h-[600px] 2xl:h-[540px] pt-[30px] md:pt-[138px] lg:pt-[120px] 2xl:pt-[80px]">
        <div className="relative z-10 w-full flex justify-end md:pr-[81px] mx-auto md:mx-0 max-w-[327px] md:max-w-none mb-[30px] md:mb-0">
          <div>
            <h3 className='text-[#2E4E4C] md:text-white md:w-[639px] font-opensans
            text-[12px] md:text-[20px] leading-[16px] md:leading-[36px] tracking-[2px] font-normal pb-[10px]
            md:pb-[11px] border-b border-[#2E4E4C] md:border-white md:mb-[36px] mb-[24px]'>
              {bannerGroup.title}
            </h3>
            <p className='text-[#723C3F] md:text-white
            md:w-[665px] font-crimson md:text-[30px] text-[20px] md:leading-[42px] leading-[22px] font-bold' dangerouslySetInnerHTML={{ __html: bannerGroup.content }} />
          </div>
        </div>
        <div className="hidden md:block absolute w-full h-full top-0 left-0">
          <Image src={bannerGroup.bg_img.url} width={1524} height={730} className='w-full h-full object-cover' alt="" />
        </div>
        <div className="md:hidden w-full h-full top-0 left-0">
          <Image src={bannerGroup.sm_bg_img.url} width={614} height={421} className='w-full h-full object-cover' alt="" />
        </div>
      </div>
      <div className='pt-[30px] pb-[81px] md:py-[104px]'>
        {
          contentList.map((item, index) => {
            const finalClass = index === contentList.length - 1 ? '' : 'md:mb-[50px] mb-[36px]';
            return (
              <div className={`mx-auto max-w-[327px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1230px] 2xl:max-w-[1230px]  ${finalClass}`} key={index}>
                <div className='md:w-[78%]'>
                  <h2 className='text-[#723C3F] font-crimson md:text-[32px] md:leading-[35px] font-bold md:mb-[20px] mb-[10px]'>
                    {item.title}
                  </h2>
                  <p className='text-[#723C3F] font-opensans md:text-[24px] text-[15px] opacity-70 md:leadging-[33px] leading-normal' dangerouslySetInnerHTML={{ __html: item.content }} />
                </div>
              </div>
            )
          })
        }
      </div>
      <FooterElement></FooterElement>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/wp-json/custom/v1/history`
    );

    // 解构响应中的数据
    const { bannerGroup, contentList } = response.data;

    return {
      props: {
        bannerGroup, contentList
      },
    };
  } catch (error) {
    console.error("Error fetching home page content:", error);
    return {
      props: {
        bannerGroup, contentList
      },
    };
  }
}
