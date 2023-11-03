import { HeaderPageElement } from '../components/HeaderPage'
import Image from 'next/image'
import axios from "axios";
import { FooterElement } from '../components/Footer'


export default function OverView({ title, subtitle, content, asideImg, smAsideImg }) {
  return (
    <div className='page-ani'>
      <HeaderPageElement></HeaderPageElement>
      <div className='md:pt-[91px] pt-[30px] md:pb-[233px] relative'>
        <div className='mx-auto max-w-[327px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1230px] 2xl:max-w-[1230px]'>
          <h3 className='md:w-[55%] text-[#2E4E4C]
          font-opensans md:text-[20px] text-[12px] md:leading-[36px]
          leading-normal tracking-[2px] font-normal md:pb-[11px] pb-[10px]
          border-b border-[#2E4E4C] md:mb-[36px] mb-[24px]'>
            {subtitle}
          </h3>
          <h2 className="text-[#723C3F] md:w-[55%] font-crimson
          md:text-[36px] text-[20px] md:leading-[42px] leading-normal
          font-bold mb-[30px]">
            {title}
          </h2>
          <p className='hidden md:block text-[#723C3F] w-[58%] font-opensans text-[1em] opacity-70' dangerouslySetInnerHTML={{ __html: content }} />
        </div>
        <div className="hidden md:block md:absolute right-0 top-0 md:h-full
        md:w-[35%] h-[250px] mb-[30px] md:mb-0">
          <Image src={smAsideImg.url} width={527} height={845} alt='aside image' className='w-full h-full object-cover' />
        </div>
        <div className="md:hidden md:absolute right-0 top-0 md:h-full
        md:w-[35%] h-[250px] mb-[30px] md:mb-0">
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
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/wp-json/custom/v1/management`
    );

    // 解构响应中的数据
    const { title, subtitle, content, asideImg, smAsideImg } = response.data;

    return {
      props: {
        title, subtitle, content, asideImg, smAsideImg
      },
    };
  } catch (error) {
    console.error("Error fetching home page content:", error);
    return {
      props: {
        title, subtitle, content, asideImg, smAsideImg
      },
    };
  }
}
