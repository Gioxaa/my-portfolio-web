import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import Head from 'next/head';
import { Analytics } from "@vercel/analytics/react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Import Bootstrap JS only on client side
    require('bootstrap/dist/js/bootstrap.bundle.min.js');

    // Prevent zoom
    const preventZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    // Prevent zoom with keyboard shortcuts
    const preventZoomKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '=')) {
        e.preventDefault();
      }
    };

    // Prevent zoom with mouse wheel
    const preventWheelZoom = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
    };

    // Add event listeners
    document.addEventListener('touchstart', preventZoom, { passive: false });
    document.addEventListener('keydown', preventZoomKey);
    document.addEventListener('wheel', preventWheelZoom, { passive: false });

    // Remove event listeners on cleanup
    return () => {
      document.removeEventListener('touchstart', preventZoom);
      document.removeEventListener('keydown', preventZoomKey);
      document.removeEventListener('wheel', preventWheelZoom);
    };
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <title>Muhammad Reyhan - Portfolio</title>
        <meta name="description" content="Portfolio Muhammad Reyhan - Web Developer, AI Prompt Engineer, dan Cybersecurity Enthusiast dari Rokan Hulu, Riau" />
        <meta property="og:title" content="Muhammad Reyhan - Portfolio" />
        <meta property="og:description" content="Portfolio Muhammad Reyhan - Web Developer, AI Prompt Engineer, dan Cybersecurity Enthusiast dari Rokan Hulu, Riau" />
        <meta property="og:type" content="website" />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
} 