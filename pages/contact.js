import { HeaderPageElement } from '../components/HeaderPage'
import Image from 'next/image'
import axios from "axios";
import { FooterElement } from '../components/Footer'


export default function OverView({ banner }) {
  console.log(banner);
  return (
    <div>
      <HeaderPageElement></HeaderPageElement>
      <div className='h-[300px]'>
        <Image src={banner.url} alt='banner' width={1512} height={300} className='w-full h-full object-cover'/>
      </div>
      <div className='pt-[100px] pb-[101px]'>
        <h1 className='text-center text-[36px] font-crimson leading-[42px] font-bold text-[#723C3F] mb-[51px]'>Stay connected</h1>
        <form action="" className='mx-auto max-w-[845px]'>
          <div className="flex mb-5">
            <input
            type="text"
            className='mr-5 flex-grow form-control font-opensans pt-[15px] pb-[22px] pl-[41px]'
            placeholder='First name' />
            <input
              type="text"
              className='flex-grow form-control font-opensans pt-[18px] pb-[19px] pl-[36px]'
              placeholder='Last name' />
          </div>
          <div className="flex mb-5">
            <input
            type="text"
            className='mr-5 flex-grow form-control font-opensans pt-[19px] pb-[18px] pl-[41px]'
            placeholder='Company' />
            <input
              type="text"
              className='flex-grow form-control font-opensans pt-[18px] pb-[19px] pl-[36px]'
              placeholder='Position' />
          </div>
          <div className='mb-5'>
            <input
              type="text"
              className='form-control w-full pt-[19px] pb-[18px] pl-[41px] font-opensans'
              placeholder='Subject' />
          </div>
          <div className="mb-[30px]">
            <textarea
              className='form-control w-full pt-[19px] pb-[18px] pl-[41px] font-opensans'
              placeholder='Message'
              name=""
              id=""
              cols="30"
              rows="10">
            </textarea>
          </div>
          <div className="flex justify-center">
            <input type="submit" value="Submit" className='py-[27px] px-[60px] border border-[#2E4E4C] text-[26px] text-[#2E4E4C] font-semibold leading-[20px] font-opensans hover:bg-[#2E4E4C] hover:text-white' />
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

