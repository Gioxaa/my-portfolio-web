import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Import Bootstrap JS only on client side
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Muhammad Reyhan - Portfolio</title>
        <meta name="description" content="Portfolio Muhammad Reyhan - Web Developer, AI Prompt Engineer, dan Cybersecurity Enthusiast dari Rokan Hulu, Riau" />
        <meta property="og:title" content="Muhammad Reyhan - Portfolio" />
        <meta property="og:description" content="Portfolio Muhammad Reyhan - Web Developer, AI Prompt Engineer, dan Cybersecurity Enthusiast dari Rokan Hulu, Riau" />
        <meta property="og:type" content="website" />
      </Head>
      <Component {...pageProps} />
    </>
  );
} 