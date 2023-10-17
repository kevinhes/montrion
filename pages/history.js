import { HeaderPageElement } from '../components/HeaderPage'
import Image from 'next/image'
import axios from "axios";
import { FooterElement } from '../components/Footer'


export default function OverView({ bannerGroup, contentList }) {
  console.log(bannerGroup, contentList);
  return (
    <div>
      <HeaderPageElement></HeaderPageElement>
      <div className="relative h-[730px] pt-[138px]">
        <div className="relative z-10 w-full flex justify-end pr-[81px]">
          <div>
            <h3 className='text-white w-[639px] font-opensans text-[20px] leading-[36px] tracking-[2px] font-normal pb-[11px] border-b border-white mb-[36px]'>
              {bannerGroup.title}
            </h3>
            <p className='text-white w-[665px] font-crimson text-[36px] leading-[45px] font-bold' dangerouslySetInnerHTML={{ __html: bannerGroup.content }} />
          </div>
        </div>
        <div className="absolute w-full h-full top-0 left-0">
          <Image src={bannerGroup.bg_img.url} width={1524} height={730} className='w-full h-full' />
        </div>
      </div>
      <div className='py-[104px]'>
        {
          contentList.map((item, index) => {
            const finalClass = index === contentList.length - 1 ? '' : 'mb-[50px]';
            return (
              <div className={`pl-[110px] w-[1120px] ${finalClass}`} key={index}>
                <h2 className='text-[#723C3F] font-crimson text-[36px] leading-[42px] font-bold mb-[20px]'>
                  {item.title}
                </h2>
                <p className='text-[#723C3F] font-opensans text-[24px] opacity-70 leadgin-[33px]' dangerouslySetInnerHTML={{ __html: item.content }} />
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
