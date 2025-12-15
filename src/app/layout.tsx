import { Metadata } from 'next';
import { ChakraProvider } from '@chakra-ui/react';
import { Analytics } from "@vercel/analytics/react"
import './globals.css';

export const metadata: Metadata = {
  title: '札分けアプリ 競技かるた',
  description: '競技かるたの練習で札分けを行うときの番号をランダムに生成します。',
  keywords: '競技かるた, 札分け, アプリ, 百人一首',
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="canonical" href="https://fudawake.vercel.app/" />
        <meta name="google-site-verification" content="3w5Pf4GL9rAPnUVPfN8cgTKnSNAmIHcd4G0JYEeJiyk" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Noto+Serif+JP:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ChakraProvider>{children}</ChakraProvider>
        <Analytics />
      </body>
    </html>
  );
}
