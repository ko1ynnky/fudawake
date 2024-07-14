'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '札分けアプリ',
  description: '競技かるたの練習で、札分け番号を自動で決めてくれます',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider>{children}</ChakraProvider>
      </body>
    </html>
  );
}
