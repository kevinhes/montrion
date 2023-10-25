import { HeaderPageElement } from '../components/HeaderPage'
import Image from 'next/image'
import axios from "axios";
import { FooterElement } from '../components/Footer';
import ReCAPTCHA from "react-google-recaptcha";
import React, { useState } from 'react';


export default function OverView({ banner, smBanner }) {
  const [captchaValue, setCaptchaValue] = useState(null);
  const [isFormSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    formData.append('g-recaptcha-response', captchaValue);
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}wp-json/contact-form-7/v1/contact-forms/108/feedback`, {
        method: 'POST',
        body: formData
      });
  
      const data = await response.json();
  
      if (data.status === "mail_sent") {
        setFormSubmitted(true);
      } else {
        alert('發生錯誤，請稍後再試');
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
    // 將此值與表單數據一起發送到伺服器
  };
  
  return (
    <div>
      <HeaderPageElement></HeaderPageElement>
      <div className='max-w-[327px] mx-auto pt-[30px] md:hidden'>
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
      <div className='hidden md:block md:h-[300px] h-[250px]'>
        <Image src={banner.url} alt='banner' width={1512} height={300} className='w-full h-full object-cover'/>
      </div>
      <div className='md:hidden h-[250px]'>
        <Image src={smBanner.url} alt='banner' width={375} height={250} className='w-full h-full object-cover'/>
      </div>
      <div className='md:pt-[100px] pt-[30px] md:pb-[101px] pb-[67px]'>
        <h1 className='hidden md:block text-center text-[36px] font-crimson leading-[42px] font-bold text-[#723C3F] mb-[51px]'>Stay connected</h1>
        {
          isFormSubmitted ? (
            <div className="mx-auto max-w-[327px] md:max-w-[845px]">
              <p className='text-center text-[36px] font-crimson'>
                We value your response.<br />
                A member of our team will get back to you promptly.
              </p>
            </div>
          ) : (
            <form action="" className='mx-auto max-w-[327px] md:max-w-[845px]' onSubmit={handleSubmit}>
              <div className="md:flex md:mb-5 mb-[10px]">
                <input
                  type="text"
                  name='customer-firstname'
                  className='md:mr-5 w-full md:w-auto flex-grow form-control font-opensans
                  md:pt-[18px] md:pb-[19px] md:pl-[41px] mb-[10px] py-[11px] pl-[18px] md:mb-0'
                  placeholder='First name' />
                <input
                  type="text"
                  name='customer-lastname'
                  className='w-full md:w-auto flex-grow form-control font-opensans md:pt-[18px] md:pb-[19px] md:pl-[36px] py-[11px] pl-[18px]'
                  placeholder='Last name' />
              </div>
              <div className="md:flex md:mb-5 mb-[10px]">
                <input
                  type="text"
                  name='customer-company'
                  className='md:mr-5 w-full md:w-auto flex-grow
                  form-control font-opensans md:pt-[19px] md:pb-[18px] md:pl-[41px]
                  mb-[10px] md:mb-0 py-[11px] pl-[18px]'
                  placeholder='Company' />
                <input
                  type="text"
                  name='customer-position'
                  className='w-full md:w-auto flex-grow form-control font-opensans md:pt-[18px] md:pb-[19px] md:pl-[36px]
                  py-[11px] pl-[18px]'
                  placeholder='Position' />
              </div>
              <div className='md:mb-5 mb-[10px]'>
                <input
                  type="text"
                  name='customer-subject'
                  className='form-control w-full md:pt-[19px] md:pb-[18px] md:pl-[41px] font-opensans
                  py-[11px] pl-[18px]'
                  placeholder='Subject' />
              </div>
              <div className="md:mb-[30px] mb-[24px]">
                <textarea
                  name='customer-message'
                  className='form-control w-full md:pt-[19px] md:pb-[18px] md:pl-[41px] font-opensans
                  py-[11px] pl-[18px]'
                  placeholder='Message'
                  id=""
                  cols="30"
                  rows="10">
                </textarea>
              </div>
              <div className="md:mb-[30px] mb-[24px] flex justify-center">
                <ReCAPTCHA
                  sitekey="6Lc0xcYoAAAAANHFYwl84WGf7MVwJUycYJ0P8QGH"
                  onChange={handleCaptchaChange}
                />
              </div>
              <div className="flex justify-center"> 
                <input type="submit" value="Submit" className='md:py-[27px] py-[14px] md:px-[60px] px-[30px]
                border border-[#2E4E4C] md:text-[26px] text-[14px] text-[#2E4E4C] font-semibold
                md:leading-[20px] leading-normal font-opensans hover:bg-[#2E4E4C] hover:text-white' />
              </div>
            </form>
          )
        }
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
    const { banner, smBanner} = response.data;

    return {
      props: {
        banner, smBanner
      },
    };
  } catch (error) {
    console.error("Error fetching home page content:", error);
    return {
      props: {
        banner, smBanner
      },
    };
  }
}

