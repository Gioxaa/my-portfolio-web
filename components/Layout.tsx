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
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <Header />
      <main className="container pt-5 pb-5">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout; 