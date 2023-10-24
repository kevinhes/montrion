import { HeaderPageElement } from '../components/HeaderPage'
import Image from 'next/image'
import axios from "axios";
import { FooterElement } from '../components/Footer'


export default function OverView({ title, subtitle, content, footerImg }) {
  return (
    <div>
      <HeaderPageElement></HeaderPageElement>
      <div className="mx-auto max-w-[327px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1230px] 2xl:max-w-[1291px] pt-[30px] md:pt-[97px]" >
        <div className='md:w-[78%]'>
          <h3 className='text-[#2E4E4C] font-opensans md:text-[20px] md:leading-[36px] tracking-[2px] font-normal mb:pb-[11px] border-b border-[#2E4E4C] md:mb-[45px]
          text-[12px] leading-[16px] pb-[10px] mb-[24px]'>
            {subtitle}
          </h3>
          <h2 className="text-[#723C3F] font-crimson md:text-[36px] md:leading-[42px] font-bold mb-[30px]
          text-[22px] leading-[24px]">
            {title}
          </h2>
        </div>
      </div>
      <div className='h-[250px] md:hidden mb-[30px]'>
        <Image src={footerImg.url} width={375} height={250} className='w-full h-full object-cover' alt='footer image' />
      </div>
      <div className="mx-auto max-w-[327px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1230px] 2xl:max-w-[1291px] md:pb-[103px]" >
        <div className='md:w-[78%]'>
          <p className='text-[#723C3F] font-opensans text-[15px] leading-[20px] md:leading-[33px] md:text-[24px] opacity-70' dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
      <div className='h-[450px] hidden md:block'>
        <Image src={footerImg.url} width={1610} height={1080} className='w-full h-full object-cover' alt='footer image' />
      </div>
      <FooterElement></FooterElement>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/wp-json/custom/v1/overview`
    );

    // 解构响应中的数据
    const { title, subtitle, content, footerImg } = response.data;

    return {
      props: {
        title, subtitle, content, footerImg
      },
    };
  } catch (error) {
    console.error("Error fetching home page content:", error);
    return {
      props: {
        title, subtitle, content, footerImg
      },
    };
  }
}

