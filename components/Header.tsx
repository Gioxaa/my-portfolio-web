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
      className={`py-3 transition-all ${scrolled ? 'scrolled shadow-sm' : ''}`} 
      fixed="top"
    >
      <Container>
        <Link href="/" passHref legacyBehavior>
          <Navbar.Brand className="fw-bold d-flex align-items-center">
            <FaCode className="me-2" />
            <span>Muhammad Reyhan</span>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link href="/" passHref legacyBehavior>
              <Nav.Link className={isActive('/')}>Beranda</Nav.Link>
            </Link>
            <Link href="/#about" passHref legacyBehavior>
              <Nav.Link className={isActiveWithHash('/#about')}>Tentang Saya</Nav.Link>
            </Link>
            <Link href="/#skills" passHref legacyBehavior>
              <Nav.Link className={isActiveWithHash('/#skills')}>Keahlian</Nav.Link>
            </Link>
            <Link href="/#projects" passHref legacyBehavior>
              <Nav.Link className={isActiveWithHash('/#projects')}>Karya & Proyek</Nav.Link>
            </Link>
            <Link href="/#certificates" passHref legacyBehavior>
              <Nav.Link className={isActiveWithHash('/#certificates')}>Sertifikat</Nav.Link>
            </Link>
            <Link href="/jurnal" passHref legacyBehavior>
              <Nav.Link className={isActive('/jurnal')}>Jurnal Bug Hunting</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header; 