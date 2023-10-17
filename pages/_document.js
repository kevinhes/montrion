import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* 加入 Google Fonts 的 CDN 連結 */}
          <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=Crimson+Text:wght@400;600;700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
