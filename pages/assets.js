import { HeaderPageElement } from '../components/HeaderPage'
import Image from 'next/image'
import axios from "axios";
import { FooterElement } from '../components/Footer'


export default function OverView({ title, subtitle, content, asideImg }) {
  return (
    <div>
      <HeaderPageElement></HeaderPageElement>
      <div className='md:pr-[146px] md:pt-[92px] pt-[30px] md:h-[845px] relative md:flex justify-end'>
        <div className='max-w-[327px] md:max-w-0 mx-auto'>
          <h3 className='md:w-[680px] text-[#2E4E4C] font-opensans
          md:text-[20px] text-[12px] md:leading-[36px] tracking-[2px] font-normal
          md:pb-[11px] pb-[10px] border-b border-[#2E4E4C] md:mb-[36px] mb-[24px]'>
            {subtitle}
          </h3>
          <h2 className="text-[#723C3F] md:w-[680px] font-crimson
          md:text-[36px] text-[20px] md:leading-[42px] leading-normal font-bold mb-[30px]">
            {title}
          </h2>
          <p className='hidden md:block text-[#723C3F] w-[745px] font-opensans text-[24px] opacity-70' dangerouslySetInnerHTML={{ __html: content }} />
        </div>
        <div className="md:absolute left-0 top-0 md:h-full md:w-[527px] h-[250px] mb-[30px] md:mb-0">
          <Image src={asideImg.url} width={527} height={845} alt='aside image' className='w-full h-full object-cover' />
        </div>
        <p className='md:hidden text-[#723C3F] font-opensans
        md:text-[24px] text-[15px] opacity-70
        max-w-[327px] md:max-w-0 mx-auto md:mx-0
        pb-20' dangerouslySetInnerHTML={{ __html: content }} />
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

