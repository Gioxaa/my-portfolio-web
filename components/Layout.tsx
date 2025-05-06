import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import Head from 'next/head';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const Layout = ({ 
  children, 
  title = 'Muhammad Reyhan - Portfolio', 
  description = 'Portfolio Muhammad Reyhan - Web Developer, AI Prompt Engineer, dan Cybersecurity Enthusiast dari Rokan Hulu, Riau' 
}: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
      </Head>
      <Header />
      <main className="container-fluid px-md-5 pt-5 pb-5">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout; 