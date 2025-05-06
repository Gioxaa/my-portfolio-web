import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Navbar, Container, Nav } from 'react-bootstrap';

const Header = () => {
  const router = useRouter();
  
  const isActive = (path: string) => {
    return router.pathname === path ? 'active' : '';
  };

  return (
    <Navbar expand="lg" variant="dark" className="py-3" sticky="top">
      <Container>
        <Link href="/" passHref legacyBehavior>
          <Navbar.Brand className="fw-bold">
            Muhammad Reyhan
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link href="/" passHref legacyBehavior>
              <Nav.Link className={isActive('/')}>Beranda</Nav.Link>
            </Link>
            <Link href="/#about" passHref legacyBehavior>
              <Nav.Link className={isActive('/#about')}>Tentang Saya</Nav.Link>
            </Link>
            <Link href="/#skills" passHref legacyBehavior>
              <Nav.Link className={isActive('/#skills')}>Keahlian</Nav.Link>
            </Link>
            <Link href="/#projects" passHref legacyBehavior>
              <Nav.Link className={isActive('/#projects')}>Karya & Proyek</Nav.Link>
            </Link>
            <Link href="/#certificates" passHref legacyBehavior>
              <Nav.Link className={isActive('/#certificates')}>Sertifikat</Nav.Link>
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