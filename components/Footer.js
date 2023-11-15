import Link from 'next/link';

export const FooterElement = () => {
  return (
    <div className="bg-[#222727] hidden md:block">
      <div className="mx-auto max-w-[327px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1230px] 2xl:max-w-[1230px] flex justify-between items-center  h-[40px]">
        <p className="text-white text-[13px]">
        <Link href='/term' className='text-white'>Terms of Use</Link> | <Link href='/privacy' className='text-white'>Privacy & Policy</Link> 
        </p>
        <p className="text-white text-[13px]">
          Montrion Corporation © Copyright 2023
        </p>
      </div>
    </div>
  )
}