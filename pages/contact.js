import { HeaderPageElement } from '../components/HeaderPage'
import Image from 'next/image'
import axios from "axios";
import { FooterElement } from '../components/Footer'


export default function OverView({ banner }) {
  console.log(banner);
  return (
    <div>
      <HeaderPageElement></HeaderPageElement>
      <div className='max-w-[327px] mx-auto pt-[30px]'>
        <h3 className='md:w-[680px] text-[#2E4E4C] font-opensans
        md:text-[20px] text-[12px] md:leading-[36px] tracking-[2px] font-normal
        md:pb-[11px] pb-[10px] border-b border-[#2E4E4C] md:mb-[36px] mb-[24px]'>
          CONTACT
        </h3>
        <h2 className="text-[#723C3F] md:w-[680px] font-crimson
        md:text-[36px] text-[20px] md:leading-[42px] leading-normal font-bold mb-[30px]">
          Stay connected
        </h2>
      </div>
      <div className='md:h-[300px] h-[250px]'>
        <Image src={banner.url} alt='banner' width={1512} height={300} className='w-full h-full object-cover'/>
      </div>
      <div className='md:pt-[100px] pt-[30px] md:pb-[101px] pb-[67px]'>
        <h1 className='hidden md:block text-center text-[36px] font-crimson leading-[42px] font-bold text-[#723C3F] mb-[51px]'>Stay connected</h1>
        <form action="" className='mx-auto max-w-[327px] md:max-w-[845px]'>
          <div className="md:flex md:mb-5 mb-[10px]">
            <input
            type="text"
            className='md:mr-5 w-full md:w-auto flex-grow form-control font-opensans
            md:pt-[15px] md:pb-[22px] md:pl-[41px] mb-[10px] py-[11px] pl-[18px] md:mb-0'
            placeholder='First name' />
            <input
              type="text"
              className='w-full md:w-auto flex-grow form-control font-opensans md:pt-[18px] md:pb-[19px] md:pl-[36px]
              py-[11px] pl-[18px]'
              placeholder='Last name' />
          </div>
          <div className="md:flex md:mb-5 mb-[10px]">
            <input
            type="text"
            className='md:mr-5 w-full md:w-auto flex-grow
            form-control font-opensans md:pt-[19px] md:pb-[18px] md:pl-[41px]
            mb-[10px] md:mb-0 py-[11px] pl-[18px]'
            placeholder='Company' />
            <input
              type="text"
              className='w-full md:w-auto flex-grow form-control font-opensans md:pt-[18px] md:pb-[19px] md:pl-[36px]
              py-[11px] pl-[18px]'
              placeholder='Position' />
          </div>
          <div className='md:mb-5 mb-[10px]'>
            <input
              type="text"
              className='form-control w-full md:pt-[19px] md:pb-[18px] md:pl-[41px] font-opensans
              py-[11px] pl-[18px]'
              placeholder='Subject' />
          </div>
          <div className="md:mb-[30px] mb-[24px]">
            <textarea
              className='form-control w-full md:pt-[19px] md:pb-[18px] md:pl-[41px] font-opensans
              py-[11px] pl-[18px]'
              placeholder='Message'
              name=""
              id=""
              cols="30"
              rows="10">
            </textarea>
          </div>
          <div className="flex justify-center"> 
            <input type="submit" value="Submit" className='md:py-[27px] py-[14px] md:px-[60px] px-[30px]
            border border-[#2E4E4C] md:text-[26px] text-[14px] text-[#2E4E4C] font-semibold
            md:leading-[20px] leading-normal font-opensans hover:bg-[#2E4E4C] hover:text-white' />
          </div>
        </form>
      </div>
      <FooterElement></FooterElement>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/wp-json/custom/v1/contact`
    );

    // 解构响应中的数据
    const { banner} = response.data;

    return {
      props: {
        banner
      },
    };
  } catch (error) {
    console.error("Error fetching home page content:", error);
    return {
      props: {
        banner
      },
    };
  }
}

