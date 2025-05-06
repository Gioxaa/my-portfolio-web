import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { FaCode } from 'react-icons/fa';

const Header = () => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const isActive = (path: string) => {
    return router.pathname === path ? 'active' : '';
  };

  // Check if path starts with the given string
  const isActiveWithHash = (path: string) => {
    if (path.startsWith('/#') && typeof window !== 'undefined') {
      const hash = path.substring(1);
      return window.location.hash === hash ? 'active' : '';
    }
    return '';
  };

  return (
    <Navbar 
      expand="lg" 
      variant="dark" 
      className={`py-2 transition-all ${scrolled ? 'scrolled shadow-sm' : ''}`} 
      fixed="top"
    >
      <Container>
        <Link href="/" className="navbar-brand fw-bold d-flex align-items-center">
          <span className="logo-icon me-2 d-flex justify-content-center align-items-center">
            <FaCode />
          </span>
          <span>Muhammad Reyhan</span>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link href="/" className={`nav-link ${isActive('/')}`}>
              Beranda
            </Link>
            <Link href="/#about" className={`nav-link ${isActiveWithHash('/#about')}`}>
              Tentang Saya
            </Link>
            <Link href="/#skills" className={`nav-link ${isActiveWithHash('/#skills')}`}>
              Keahlian
            </Link>
            <Link href="/#projects" className={`nav-link ${isActiveWithHash('/#projects')}`}>
              Karya & Proyek
            </Link>
            <Link href="/#certificates" className={`nav-link ${isActiveWithHash('/#certificates')}`}>
              Sertifikat
            </Link>
            <Link href="/jurnal" className={`nav-link ${isActive('/jurnal')}`}>
              Jurnal Bug Hunting
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header; 