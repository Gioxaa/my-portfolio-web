import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { FaCode, FaFileDownload } from 'react-icons/fa';

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
          <span> Reyhan Portfolio</span>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-lg-center">
            <Link href="/" className={`nav-link ${isActive('/')}`}>
              Home
            </Link>
            <Link href="/#about" className={`nav-link ${isActiveWithHash('/#about')}`}>
              About Me
            </Link>
            <Link href="/#skills" className={`nav-link ${isActiveWithHash('/#skills')}`}>
              Skills
            </Link>
            <Link href="/#projects" className={`nav-link ${isActiveWithHash('/#projects')}`}>
              Works & Projects
            </Link>
            <Link href="/#certificates" className={`nav-link ${isActiveWithHash('/#certificates')}`}>
              Certificates
            </Link>
            <Link href="/jurnal" className={`nav-link ${isActive('/jurnal')}`}>
              Bug Hunting Journal
            </Link>
            <a href="/files/cv-muhammad-reyhan.pdf" download className="ms-lg-3 mt-3 mt-lg-0 resume-download-link">
              <Button variant="outline-light" size="sm" className="resume-btn">
                <FaFileDownload className="me-2" />
                Resume
              </Button>
            </a>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header; 