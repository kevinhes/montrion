import { HeaderPageElement } from '../components/HeaderPage'
import Image from 'next/image'
import axios from "axios";
import { FooterElement } from '../components/Footer'


export default function OverView({ title, subtitle, content, asideImg }) {
  return (
    <div>
      <HeaderPageElement></HeaderPageElement>
      <div className='pr-[146px] pt-[92px] h-[845px] relative flex justify-end'>
        <div className=''>
          <h3 className='w-[680px] text-[#2E4E4C] font-opensans text-[20px] leading-[36px] tracking-[2px] font-normal pb-[11px] border-b border-[#2E4E4C] mb-[36px]'>
            {subtitle}
          </h3>
          <h2 className="text-[#723C3F] w-[680px] font-crimson text-[36px] leading-[42px] font-bold mb-[30px]">
            {title}
          </h2>
          <p className='text-[#723C3F] w-[745px] font-opensans text-[24px] opacity-70' dangerouslySetInnerHTML={{ __html: content }} />
        </div>
        <div className="absolute left-0 top-0 h-full w-[527px]">
          <Image src={asideImg.url} width={527} height={845} alt='aside image' className='w-full h-full object-cover' />
        </div>
      </div>
      <FooterElement></FooterElement>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/wp-json/custom/v1/assets`
    );

    // 解构响应中的数据
    const { title, subtitle, content, asideImg } = response.data;

    return {
      props: {
        title, subtitle, content, asideImg
      },
    };
  } catch (error) {
    console.error("Error fetching home page content:", error);
    return {
      props: {
        title, subtitle, content, asideImg
      },
    };
  }
}

