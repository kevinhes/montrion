import { HeaderPageElement } from '../components/HeaderPage'
import Image from 'next/image'
import axios from "axios";
import { FooterElement } from '../components/Footer';
import ReCAPTCHA from "react-google-recaptcha";
import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';


export default function OverView({ banner, smBanner }) {
  const hasErrors = (errors) => {
    return Object.keys(errors).length > 0;
  };
  // react-hook-form
  const { register, handleSubmit, formState:{ errors } } = useForm();

  // const onSubmit = (data) => {
  //   console.log(data);
  // }
  
  // captcha
  const [captchaValue, setCaptchaValue] = useState(null);
  const [isFormSubmitted, setFormSubmitted] = useState(false);

  // const handleSubmitC = async (e) => {
  //   e.preventDefault();
  //   console.log(formData);
  //   const formData = new FormData(e.target);
  //   formData.append('g-recaptcha-response', captchaValue);
  
  //   try {
  //     console.log(formData);
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}wp-json/contact-form-7/v1/contact-forms/108/feedback`, {
  //       method: 'POST',
  //       body: formData
  //     });
  
  //     const data = await response.json();
  
  //     if (data.status === "mail_sent") {
  //       setFormSubmitted(true);
  //     } else {
  //       alert('發生錯誤，請稍後再試');
  //     }
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //   }
  // };

  const onSubmit = async (data) => {
    
    // 添加 reCAPTCHA 值
    // formData['g-recaptcha-response'] = captchaValue;
  
    // 創建一個 FormData 物件以用於 POST 請求
    const submitData = new FormData();
    Object.keys(data).forEach(key => {
      submitData.append(key, data[key]);
    });
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}wp-json/contact-form-7/v1/contact-forms/108/feedback`, {
        method: 'POST',
        body: submitData
      });
  
      const resData = await response.json();
      console.log(resData);
  
      if (resData.status === "mail_sent") {
        setFormSubmitted(true);
        // 可以在這裡添加重置表單的邏輯，如果需要
      } else {
        alert('There was a network error. Please go back and resubmit.');
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
    <div className='page-ani'>
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
      <div className='hidden md:block md:h-[300px] h-[250px] overflow-hidden'>
        <Image src={banner.url} alt='banner' width={1512} height={300} className='scale-animation w-full h-full object-cover'/>
      </div>
      <div className='md:hidden h-[250px] overflow-hidden'>
        <Image src={smBanner.url} alt='banner' width={375} height={250} className='scale-animation w-full h-full object-cover'/>
      </div>
      <div className={`md:pt-[100px] pt-[30px] md:pb-[101px] pb-[67px] ${isFormSubmitted ? 'bg-[#3A3A3A]' : ''}`}>
        <h1 className={`hidden md:block text-center text-[36px] font-crimson leading-[42px] font-bold text-[#723C3F] mb-[51px] ${isFormSubmitted ? 'text-white' : ''}`}>Stay connected</h1>
        {
          isFormSubmitted ? (
            <div className="mx-auto max-w-[327px] md:max-w-[845px] md:h-[540px]">
              <p className='text-center text-[15px] md:text-[24px] leading-[33px] font-normal text-white opacity-70 font-opensans mb-[30px]'>
                We value your response. Thank you.<br />
                We will get back to you promptly
              </p>
              <div className="flex justify-center">
                <Link href="/" class="py-5 px-[45px] bg-[#723C3F] text-white text-[18px] leading-[20px] font-opensans block">
                  Home
                </Link>
              </div>
            </div>
          ) : (
            <form action="" className='mx-auto max-w-[327px] md:max-w-[720px] lg:max-w-[845px] font-opensans' onSubmit={handleSubmit(onSubmit)}>
              <div className="md:flex md:mb-5 mb-[10px]">
                <div className="relative md:w-1/2 md:mr-5">
                  <input
                    type="text"
                    {...register( 'customerFirstname', { required:true } ) }
                    className={`w-full flex-grow form-control h-[55px]
                    outline-none
                    md:h-[50px] flex items-center mb-[10px] md:mb-0 pl-[18px] md:pl-[41px]
                    ${errors.customerFirstname ? 'border border-[#FF0000]' : ''}`}
                    placeholder='First name'/>
                  <div className={`mt-5 errormessage ${errors.customerFirstname ? 'active' : ''}`}>
                    <p className='text-[#ff0000]'>Please complete this mandatory field</p>
                  </div>
                </div>
                <div className="md:w-1/2 relative">
                  <input
                    type="text"
                    {...register( 'customerLastname', { required:true } )}
                    className={`w-full flex-grow form-control h-[55px] md:h-[50px]
                    flex items-center pl-[18px] md:pl-[41px] ${errors.customerLastname ? 'border border-[#FF0000]' : ''}`}
                    placeholder='Last name' />
                  <div className={`mt-5 errormessage ${errors.customerLastname ? 'active' : ''}`}>
                    <p className='text-[#ff0000]'>Please complete this mandatory field</p>
                  </div>
                </div>
              </div>
              <div className="md:flex md:mb-5 mb-[10px]">
                <div className="md:w-1/2 relative md:mr-5">
                  <input
                    type="text"
                    {...register( 'customerCompany', { required:true } )}
                    className={`w-full flex-grow form-control h-[55px] md:h-[50px]
                    flex items-center pl-[18px] md:pl-[41px] ${errors.customerCompany ? 'border border-[#FF0000]' : ''}`}
                    placeholder='Company' />
                    <div className={`mt-5 errormessage ${errors.customerCompany ? 'active' : ''}`}>
                      <p className='text-[#ff0000]'>Please complete this mandatory field</p>
                    </div>
                </div>
                <div className="md:w-1/2 relative">
                  <input
                    type="text"
                    {...register( 'customerPosition', { required:true } )}
                    className={`w-full flex-grow form-control h-[55px] md:h-[50px]
                    flex items-center pl-[18px] md:pl-[41px] ${errors.customerPosition ? 'border border-[#FF0000]' : ''}`}
                    placeholder='Position' />
                    <div className={`mt-5 errormessage ${errors.customerPosition ? 'active' : ''}`}>
                      <p className='text-[#ff0000]'>Please complete this mandatory field</p>
                    </div>
                </div>
              </div>
              <div className='md:mb-5 mb-[10px]'>
                <div className=''>
                  <input
                    type="email"
                    {...register('customerEmail', { 
                      required: 'Please complete this mandatory field',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Please provide a valid email address'
                      }
                    })}
                    className={`form-control w-full md:pl-[41px] h-[55px] md:h-[50px]
                    flex items-center pl-[18px] ${errors.customerEmail ? 'border border-[#FF0000]' : ''} `}
                    placeholder='Email' />
                  <div className={`mt-5 errormessage ${errors.customerEmail ? 'active' : ''}`}>
                    <p className='text-[#ff0000]'>{errors.customerEmail?.message}</p>
                  </div>
                </div>
              </div>
              <div className='md:mb-5 mb-[10px] relative'>
                <input
                  type="text"
                  {...register( 'customerSubject', { required:true } )}
                  className={`form-control w-full md:pl-[41px] h-[55px] md:h-[50px] flex items-center pl-[18px] ${errors.customerSubject ? 'border border-[#FF0000]' : ''}`}
                  placeholder='Subject' />
                <div className={`mt-5 errormessage ${errors.customerSubject ? 'active' : ''}`}>
                  <p className='text-[#ff0000]'>Please complete this mandatory field</p>
                </div>
              </div>
              <div className="md:mb-[30px] mb-[24px]">
                <div>
                  <textarea
                    {...register( 'customerMessage', { required:true } )}
                    className={`form-control w-full md:pt-[8px] md:pb-[18px]
                    md:px-[41px] font-opensans md:h-[200px] py-[11px] pl-[18px] ${errors.customerMessage ? 'border border-[#FF0000]' : ''}`}
                    placeholder='Message'
                    id=""
                    cols="30"
                    rows="10">
                  </textarea>
                  <div className={`mt-5 errormessage ${errors.customerMessage ? 'active' : ''}`}>
                    <p className='text-[#ff0000]'>Please enter your message</p>
                  </div>
                </div>
              </div>
              <div className="md:mb-[30px] mb-[24px] flex justify-center">
                {/* <ReCAPTCHA
                  sitekey="6Lc0xcYoAAAAANHFYwl84WGf7MVwJUycYJ0P8QGH"
                  onChange={handleCaptchaChange}
                /> */}
              </div>
              <div className="flex flex-col justify-center items-center">
                <input type="submit" value="Submit" className='md:py-[20px] py-[14px] md:px-[45px] px-[30px]
                border border-[#2E4E4C] md:text-[18px] text-[14px] text-[#2E4E4C] font-semibold
                md:leading-[20px] leading-normal font-opensans hover:bg-[#2E4E4C] hover:text-white' />
                {hasErrors(errors) && (
                    <div className="mt-5 errormessage active">
                        <p className='text-[#ff0000]'>Some fields require your attention.</p>
                    </div>
                )}
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
      revalidate: 60,
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

