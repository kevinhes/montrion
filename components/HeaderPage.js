import Link from 'next/link';
import Image from 'next/image'
import React , { useState } from "react";

// import React , { useState } from "react";

export const HeaderPageElement = ( { logo } ) => {
  const [ activeFilter, setActiveFilter ] = useState(0);
  const [ activeMenu, setActiveMenu ] = useState(0);
  function filterChangeEnter() {
    setActiveFilter(1);
  }
  function filterChangeLeave() {
    setActiveFilter();
  }

  function menuActive(trigger) {
    console.log(trigger);
    setActiveMenu(trigger);
  }
  // console.log(logo);
  return (
    <>
    <div className='bg-[#222727]'>
      <div className='mx-auto max-w-[327px] md:max-w-[1291px] flex justify-between items-center h-[70px] md:h-[97px]'>
        <div>
        <Link href="/" className='w-[135px] h-[15px] md:w-[189px] md:h-[21px] overflow-hidden flex'>
          <Image
            src='/images/logo-light.png'
            alt='logo'
            width={189}
            height={21}
          />
          <h1 className='hidden'>montrion</h1>
        </Link>
        </div>
        <div
            className="hidden md:flex items-center h-full text-white font-opensans text-[20px] leading-[18px]"
            onMouseEnter={() => filterChangeEnter()}
            onMouseLeave={() => filterChangeLeave()}>
            <div className="flex h-full px-[30px] mr-[10px] cursor-pointer items-center relative group">
              <p className='mr-[10px]'>About us</p>
              <Image src="/images/ExpandArrowdown.png" alt="arrow" width={15} height={15} className="group-hover:rotate-180 transition" />
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
                    <Link href="/overview" className="relative bg-[#ECECEC] hover:bg-[#E2E2E2]
                    h-[86px] py-[34px] pl-[87px] flex text-under-deco
                    link-hover">
                      <span className='mr-[10px]'>
                        Overview
                      </span>
                      <Image src='/images/Forward.png' alt="arrow" width={16} height={16} class="" />
                    </Link>
                    <Link href="/history" className="link-hover bg-[#ECECEC] h-[86px] py-[34px] pl-[87px] flex hover:bg-[#E2E2E2]">
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
              <Image src="/images/ExpandArrowdown.png" alt="arrow" width={15} height={15} className="group-hover:rotate-180 transition" />
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
                    <Link href="/management" className="link-hover relative bg-[#ECECEC] hover:bg-[#E2E2E2] h-[86px] py-[34px] pl-[87px] flex text-under-deco">
                      <span className='mr-[10px]'>
                        Management
                      </span>
                      <Image src='/images/Forward.png' alt="arrow" width={16} height={16} />
                    </Link>
                    <Link href="/assets" className="link-hover bg-[#ECECEC] h-[86px] py-[34px] pl-[87px] flex hover:bg-[#E2E2E2]">
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
        <div onClick={() => {menuActive(1)}} className={`md:hidden ${activeMenu === 1 ? 'hidden' : ''}`}>
          <Image src='/images/Menu.png' width={24} height={24} alt="trigger" />
        </div>
        <div onClick={() => {menuActive(0)}} className={`${activeMenu === 1 ? '' : 'hidden'} md:hidden`}>
          <Image src='/images/close.png' width={24} height={24} alt="trigger" />
        </div>
      </div>
    </div>
    <div className={`fixed top-[70px] left-0 border-t border-[#ffffff26]
      w-full h-screen bg-[#222727] transition-all md:hidden
      z-[100] ${activeMenu === 1 ? 'translate-x-0': '-translate-x-full'}`}>
        <div className="font-opensans text-white">
          <div className="group">
            <div className="max-w-[327px] mx-auto flex justify-between items-center py-5">
              <p className="text-white text-[16px] leading-normal">About</p>
              <div>
                <Image src='/images/expandarrow.png' width={22} height={18} alt=""
                className="group-hover:rotate-180" />
              </div>
            </div>
            <div className="overflow-hidden max-h-0 group-hover:max-h-[500px]">
              <p className="max-w-[327px] mx-auto text-[15px] font-opensans text-white mb-[19px]">
                An investment holding company rooted in integrity and resilience.
              </p>
              <Link href='/overview' className="">
                <div className="bg-[#606060]">
                  <div className="max-w-[327px] mx-auto pt-[21px] pb-[22px]">
                    OverView
                  </div>
                </div>
              </Link>
              <Link href='/history' className="">
                <div className="bg-[#606060]">
                  <div className="max-w-[327px] mx-auto pt-[21px] pb-[22px]">
                    History
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="font-opensans text-white">
          <div className="group">
            <div className="max-w-[327px] mx-auto flex justify-between items-center py-5">
              <p className="text-white text-[16px] leading-normal">Investment</p>
              <div>
                <Image src='/images/expandarrow.png' width={22} height={18} alt=""
                className="group-hover:rotate-180" />
              </div>
            </div>
            <div className="overflow-hidden max-h-0 group-hover:max-h-[500px]">
              <p className="max-w-[327px] mx-auto text-[15px] font-opensans text-white mb-[19px]">
              Investing with integrity.
              </p>
              <Link href='/management' className="">
                <div className="bg-[#606060]">
                  <div className="max-w-[327px] mx-auto pt-[21px] pb-[22px]">
                    Managment
                  </div>
                </div>
              </Link>
              <Link href='/assets' className="">
                <div className="bg-[#606060]">
                  <div className="max-w-[327px] mx-auto pt-[21px] pb-[22px]">
                    Assets
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="font-opensans text-white">
          <div className="group">
            <Link href='/contact' className="max-w-[327px] mx-auto flex justify-between items-center py-5">
              <p className="text-white text-[16px] leading-normal">Contact</p>
            </Link>
          </div>
        </div>
      </div>
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