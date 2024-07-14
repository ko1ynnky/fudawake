import { Metadata } from 'next';
import { ChakraProvider } from '@chakra-ui/react';

export const metadata: Metadata = {
  title: '札分け - 競技かるたアプリ',
  description: '競技かるたの札分けをサポートするアプリケーション',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <ChakraProvider>{children}</ChakraProvider>
      </body>
    </html>
  );
}
