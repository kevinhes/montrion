import { HeaderPageElement } from '../components/HeaderPage'
import Image from 'next/image'
import axios from "axios";
import { FooterElement } from '../components/Footer'


export default function OverView({ title, subtitle, content, footerImg }) {
  return (
    <div>
      <HeaderPageElement></HeaderPageElement>
      <div className="mx-auto max-w-[1291px] pt-[97px] pb-[103px]" >
        <div className='w-[78%]'>
          <h3 className='text-[#2E4E4C] font-opensans text-[20px] leading-[36px] tracking-[2px] font-normal pb-[11px] border-b border-[#2E4E4C] mb-[45px]'>
            {subtitle}
          </h3>
          <h2 className="text-[#723C3F] font-crimson text-[36px] leading-[42px] font-bold mb-[30px]">
            {title}
          </h2>
          <p className='text-[#723C3F] font-opensans text-[24px] opacity-70' dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
      <div className='h-[450px]'>
        <Image src={footerImg.url} width={1610} height={1080} className='w-full h-full' alt='footer image' />
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

