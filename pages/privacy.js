import { useState, useEffect } from 'react';
import { HeaderPageElement } from '../components/HeaderPage';
import Image from 'next/image';
import axios from "axios";
import { FooterElement } from '../components/Footer';

export default function OverView({ initialContent }) {
  const [content, setContent] = useState(null);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  return (
    <div>
      <HeaderPageElement></HeaderPageElement>
      <div className='mx-auto max-w-[327px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1230px] 2xl:max-w-[1230px] py-[100px]'>
        {content && <p dangerouslySetInnerHTML={{ __html: content }} />}
      </div>
      <FooterElement></FooterElement>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/wp-json/custom/v1/privacy`
    );

    const { content } = response.data;

    return {
      props: {
        initialContent: content,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching home page content:", error);
    return {
      props: {
        initialContent: "", // Provide a default value in case of error
      },
    };
  }
}


const fetchHomePageContent = async () => {
  console.log(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/wp-json/custom/v1/privacy`);
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/wp-json/custom/v1/privacy`
    );

    console.log("data", response);

    // 解构响应中的数据
    // const { title, content } = response.data;

    // 更新标题和内容的状态
  } catch (error) {
    console.error("Error fetching home page content:", error);
  }
};

fetchHomePageContent();