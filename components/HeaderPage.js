import Link from 'next/link';
import Image from 'next/image'
import React , { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/router';

// import React , { useState } from "react";

export const HeaderPageElement = ( { logo } ) => {
  const menuRef = useRef(null);
  const router = useRouter();
  const [ activeFilter, setActiveFilter ] = useState(0);
  const [ activeMenu, setActiveMenu ] = useState(0);
  const [ leaveMenu, setLeaveMenu ] = useState(0);
  const [ mobileSubmenu, setMobileSubmenu ] = useState(0);

  const pageReload = (e, path) => {
    if (router.pathname === path) {
      e.preventDefault();
      // 强制导航到指定的路径，即使我们已经在那里了
      router.reload();
    }
  };

  function moblieSubmenuActive(e) {
    if ( e !== 0) {
      if ( e.target.dataset.menu === mobileSubmenu ) {
        setMobileSubmenu(0)
      } else {
        setMobileSubmenu(e.target.dataset.menu)
      }
    } else {
      setMobileSubmenu(0)

    }
  }

  function filterChangeEnter() {
    setActiveFilter(1);
  }
  function filterChangeLeave() {
    setActiveFilter();
  }

  function menuActive(trigger) {
    setActiveMenu(trigger);
  }

  function menuLeave(trigger) {
    setLeaveMenu(trigger);
  }

  useEffect(() => {
    const menuElem = menuRef.current;
    
    const handleTransitionEnd = () => {
      // 当动画结束时，将`leaveMenu`设置为false
      setLeaveMenu(false);
    };
  
    // 添加事件监听器
    menuElem && menuElem.addEventListener('transitionend', handleTransitionEnd);
    
    // 在组件卸载时，清除监听器
    return () => {
      menuElem && menuElem.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, []);
  // console.log(logo);
  return (
    <>
    <div className='bg-[#222727]'>
      <div className='mx-auto max-w-[327px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1230px] 2xl:max-w-[1230px] flex justify-between items-center h-[70px] md:h-[55px]'>
        <div>
        <Link href="/" className='w-[135px] h-[15px] md:w-[151px] md:h-[17px] overflow-hidden flex'>
          <Image
            src='/images/logo-light.png'
            alt='logo'
            width={151}
            height={17}
          />
          <h1 className='hidden'>montrion</h1>
        </Link>
        </div>
        <div
            className="hidden md:flex items-center h-full text-white font-opensans text-[16px] leading-[18px]">
            <div className="flex h-full px-[30px] mr-[10px] items-center relative group"
            onMouseEnter={() => filterChangeEnter()}
            onMouseLeave={() => filterChangeLeave()}>
              <p className='mr-[10px] cursor-pointer'>About Us</p>
              <Image src="/images/ExpandArrowdown.png" alt="arrow" width={15} height={15} className="group-hover:rotate-180 transition duration-1000" />
              <div
                className="absolute top-[55px] right-[130px] translate-x-1/2 z-50
                shadow-[0px_4px_20px_rgba(0,0,0,0.25)]">
                <div className="flex h-[0px] overflow-hidden group-hover:h-[120px] transition-all duration-1000">
                  <div className='w-[300px] bg-[#606060] flex justify-center items-center'>
                    <p className="text-white pl-[35px] pr-[30px] font-opensans text-[16px] leading-normal">
                      An investment holding company rooted in integrity and resilience
                    </p>
                  </div>
                  <div className='w-[210px] text-[#222727]'>
                    <Link href="/overview" className="relative bg-[#ECECEC] hover:bg-[#E2E2E2] h-[60px] flex items-center justify-center text-under-deco link-hover">
                      <span className='mr-[10px] text-[16px]'>
                        Overview
                      </span>
                      <Image src='/images/Forward.png' alt="arrow" width={16} height={16} className="over-img relative" />
                    </Link>
                    <Link href="/history" className="link-hover relative bg-[#ECECEC] h-[60px] flex items-center justify-center hover:bg-[#E2E2E2]">
                      <span className='mr-[10px] text-[16px]'>
                        History
                      </span>
                      <Image src='/images/Forward.png' alt="arrow" width={16} height={16} className="over-img relative" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex h-full px-[30px] mr-[10px] items-center relative group"
              onMouseEnter={() => filterChangeEnter()}
              onMouseLeave={() => filterChangeLeave()}>
              <p className='mr-[10px] cursor-pointer'>Investments</p>
              <Image src="/images/ExpandArrowdown.png" alt="arrow" width={15} height={15} className="group-hover:rotate-180 transition duration-1000" />
              <div
                className="absolute top-[55px] right-[130px] translate-x-1/2 z-50 shadow-[0px_4px_20px_rgba(0,0,0,0.25)]">
                <div className="flex h-[0px] overflow-hidden group-hover:h-[120px] transition-all duration-1000">
                  <div className='w-[300px] bg-[#606060] flex items-center justify-center'>
                    <p className="text-white font-opensans text-[16px] leading-normal pl-[35px] pr-[30px]">
                      Investing with integrity
                    </p>
                  </div>
                  <div className='w-[210px] text-[#222727]'>
                    <Link href="/management" className="link-hover relative bg-[#ECECEC] hover:bg-[#E2E2E2] h-[60px] flex items-center justify-center text-under-deco text-[16px]">
                      <span className='mr-[10px]'>
                        Management
                      </span>
                      <Image src='/images/Forward.png' alt="arrow" width={16} height={16} className="over-img relative" />
                    </Link>
                    <Link href="/assets" className="link-hover relative bg-[#ECECEC] h-[60px] flex items-center justify-center hover:bg-[#E2E2E2] text-[16px]">
                      <span className='mr-[10px]'>
                        Assets
                      </span>
                      <Image src='/images/Forward.png' alt="arrow" width={16} height={16} className="over-img relative" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <Link className="flex h-full px-[30px] cursor-pointer items-center" href='/contact'>
              <p>Contact</p>
            </Link>
          </div>
          <div onClick={() => {menuActive(1); moblieSubmenuActive(0);}} className={`md:hidden ${activeMenu === 1 ? 'hidden' : ''}`}>
            <Image src='/images/Menu.png' width={24} height={24} alt="trigger" />
          </div>
          <div onClick={() => {menuActive(0); menuLeave(1); moblieSubmenuActive(0);}} className={`${activeMenu === 1 ? '' : 'hidden'} md:hidden`}>
            <Image src='/images/close.png' width={24} height={24} alt="trigger" />
          </div>
      </div>
    </div>
    <div className={`full-screen-overlay ${ activeFilter === 1 ? 'active' : 'deactivate' }`}></div>
    <div ref={menuRef} className={`off-canvas border-t border-[#ffffff26] bg-[#222727] md:hidden
        ${activeMenu === 1 ? 'active': ''}`}>
        <div className="flex flex-col justify-between h-full">
          <div>

            <div className="font-opensans text-white overflow-hidden">
              <div className={`group mobile-menu-ani ${activeMenu === 1 ? 'active': ''}`}>

                <div
                  className="max-w-[327px] mx-auto flex justify-between items-center py-5" data-menu="about" onClick={(e) => {moblieSubmenuActive(e)}}>
                  <div className="text-white text-[16px] leading-normal font-semibold pointer-events-none flex justify-between w-full">
                    About Us
                    <Image src='/images/expandarrow.png' width={22} height={18} alt=""
                    className={`block w-[22px] h-[19px] ${ mobileSubmenu === 'about' ? 'rotate-180' : '' } `} />
                  </div>
                </div>

                <div className={`mobile-submenu overflow-hidden ${ mobileSubmenu === 'about' ? 'active' : '' }`} data-object="about">
                  <p className="max-w-[327px] mx-auto text-[15px] font-opensans text-white mb-[19px]">
                    An investment holding company rooted in integrity and resilience.
                  </p>
                  <Link href='/overview' className="" onClick={(e) => {pageReload(e, '/overview')}}>
                    <div className="bg-[#606060] border-b border-[#222727]">
                      <div className="max-w-[327px] mx-auto pt-[21px] pb-[22px] text-[14px]">
                        Overview
                      </div>
                    </div>
                  </Link>
                  <Link href='/history' className="" onClick={(e) => {pageReload(e, '/history')}}>
                    <div className="bg-[#606060]">
                      <div className="max-w-[327px] mx-auto pt-[21px] pb-[22px] text-[14px]">
                        History
                      </div>
                    </div>
                  </Link>
                </div>

              </div>
            </div>

            <div className="font-opensans text-white overflow-hidden">
              <div className={`group mobile-menu-ani ${activeMenu === 1 ? 'active': ''}`}>
                <div className="max-w-[327px] mx-auto flex justify-between items-center py-5" data-menu="Investment" onClick={(e) => {moblieSubmenuActive(e)}}>
                  <div className="text-white text-[16px] leading-normal font-semibold pointer-events-none flex justify-between w-full">
                    Investment
                    <Image src='/images/expandarrow.png' width={22} height={18} alt=""
                    className={`block w-[22px] h-[19px] ${ mobileSubmenu === 'Investment' ? 'rotate-180' : '' } `} />
                  </div>
                </div>
                <div className={`mobile-submenu overflow-hidden ${ mobileSubmenu === 'Investment' ? 'active' : '' }`}>
                  <p className="max-w-[327px] mx-auto text-[15px] font-opensans text-white mb-[19px]">
                  Investing with integrity.
                  </p>
                  <Link href='/management' className="" onClick={(e) => {pageReload(e, '/management')}}>
                    <div className="bg-[#606060] border-b border-[#222727]">
                      <div className="max-w-[327px] mx-auto pt-[21px] pb-[22px] text-[14px]">
                        Managment
                      </div>
                    </div>
                  </Link>
                  <Link href='/assets' className="" onClick={(e) => {pageReload(e, '/assets')}}>
                    <div className="bg-[#606060]">
                      <div className="max-w-[327px] mx-auto pt-[21px] pb-[22px] text-[14px]">
                        Assets
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="font-opensans text-white overflow-hidden">
              <div className={`group mobile-menu-ani ${activeMenu === 1 ? 'active': ''}`}>
                <Link href='/contact' className="max-w-[327px] mx-auto flex justify-between items-center py-5">
                  <p className="text-white text-[16px] leading-normal font-semibold">Contact</p>
                </Link>
              </div>
            </div>
          </div>
          <div className="text-white pb-[51px] opacity-40 text-[12px] font-opensans">
            <div className="max-w-[327px] mx-auto">
              <p className="mb-[3px]"><Link href='/term'>Terms of Use</Link> | <Link href='/privacy'>Privacy Policy</Link> </p>
              <p>Montrion Corporation © Copyright 2023</p>
            </div>
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