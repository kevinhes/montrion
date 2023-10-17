import React , { useState } from "react";
import Link from 'next/link';
import Image from 'next/image'

// import React , { useState } from "react";

export const HeaderElement = ( { logo } ) => {
  const [ activeFilter, setActiveFilter ] = useState(0);
  function filterChangeEnter() {
    setActiveFilter(1);
  }
  function filterChangeLeave() {
    setActiveFilter();
  }
  // console.log(logo);
  return (
    <>
      <div className='fixed z-50 left-0 right-0 bg-[#222727]'>
        <div className='mx-auto max-w-[1291px] flex justify-between items-center h-[97px]'>
          <div>
            <Link href="/" className='w-[189px] h-[21px] overflow-hidden flex'>
              <Image
                src='/images/logo-light.png'
                alt='logo'
                width={189}
                height={21}
              />
              <h1>montrion</h1>
            </Link>
          </div>
          <div
            className="flex items-center h-full text-white font-opensans text-[20px] leading-[18px]"
            onMouseEnter={() => filterChangeEnter()}
            onMouseLeave={() => filterChangeLeave()}>
            <div className="flex h-full px-[30px] mr-[10px] cursor-pointer items-center relative group ">
              <p className='mr-[10px]'>About us</p>
              <Image src="/images/ExpandArrowdown.png" alt="arrow" width={15} height={15} />
              <div
                className="absolute top-[97px] right-[130px] translate-x-1/2 opacity-0
                group-hover:opacity-100 transition-opacity duration-300 z-50
                shadow-[0px_4px_20px_rgba(0,0,0,0.25)] -translate-y-96 group-hover:-translate-y-0">
                <div className="flex">
                  <div className='w-[348px] h-[173px] bg-[#606060]'>
                    <p className="text-white pt-[38px] pl-[40px] pr-[41px] font-opensans text-[22px] leading-[30px]">
                      An investment holding company rooted in integrity and resilience.
                    </p>
                  </div>
                  <div className='w-[290px] text-[#222727]'>
                    <Link href="/overview" className="relative bg-[#ECECEC] hover:bg-[#E2E2E2] h-[86px] py-[34px] pl-[87px] flex text-under-deco">
                      <span className='mr-[10px]'>
                        Overview
                      </span>
                      <Image src='/images/Forward.png' alt="arrow" width={16} height={16} />
                    </Link>
                    <Link href="/history" className="bg-[#ECECEC] h-[86px] py-[34px] pl-[87px] flex hover:bg-[#E2E2E2]">
                      <span className='mr-[10px]'>
                        History
                      </span>
                      <Image src='/images/Forward.png' alt="arrow" width={16} height={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex h-full px-[30px] mr-[10px] cursor-pointer items-center relative group">
              <p className='mr-[10px]'>Investment</p>
              <Image src="/images/ExpandArrowdown.png" alt="arrow" width={15} height={15} />
              <div
                className="absolute top-[97px] right-[130px] translate-x-1/2 opacity-0
                group-hover:opacity-100 transition-opacity duration-300 z-50
                shadow-[0px_4px_20px_rgba(0,0,0,0.25)] -translate-y-96 group-hover:-translate-y-0">
                <div className="flex">
                  <div className='w-[348px] h-[173px] bg-[#606060]'>
                    <p className="text-white pt-[38px] pl-[40px] pr-[41px] font-opensans text-[22px] leading-[30px]">
                      Investing with integrity.
                    </p>
                  </div>
                  <div className='w-[290px] text-[#222727]'>
                    <Link href="/management" className="relative bg-[#ECECEC] hover:bg-[#E2E2E2] h-[86px] py-[34px] pl-[87px] flex text-under-deco">
                      <span className='mr-[10px]'>
                        Management
                      </span>
                      <Image src='/images/Forward.png' alt="arrow" width={16} height={16} />
                    </Link>
                    <Link href="/assets" className="bg-[#ECECEC] h-[86px] py-[34px] pl-[87px] flex hover:bg-[#E2E2E2]">
                      <span className='mr-[10px]'>
                        Assets
                      </span>
                      <Image src='/images/Forward.png' alt="arrow" width={16} height={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <Link className="flex h-full px-[30px] cursor-pointer items-center" href='/contact'>
              <p>Contact</p>
            </Link>
          </div>
        </div>
      </div>
      <div className={`full-screen-overlay ${ activeFilter === 1 ? 'active' : '' }`}></div>
    </>
  )
}



// const fetchHomePageContent = async () => {
//   try {
//     const response = await axios.get(
//       "http://montrion.local/wp-json/custom/v1/menu"
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