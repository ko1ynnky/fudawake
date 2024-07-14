import dynamic from 'next/dynamic';

const KarutaApp = dynamic(() => import('../components/KarutaApp'), {
  ssr: false,
});

export default function Home() {
  return <KarutaApp />;
}
