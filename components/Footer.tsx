import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaEnvelope, FaWhatsapp, FaGithub, FaLinkedin, FaCodeBranch, FaHeart } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <FaEnvelope />, url: 'mailto:reyhan@example.com', label: 'Email' },
    { icon: <FaWhatsapp />, url: 'https://wa.me/6281234567890', label: 'WhatsApp' },
    { icon: <FaGithub />, url: 'https://github.com/yourusername', label: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' }
  ];
  
  const menuLinks = [
    { name: 'Home', url: '/' },
    { name: 'About Me', url: '/#about' },
    { name: 'Skills', url: '/#skills' },
    { name: 'Works & Projects', url: '/#projects' },
    { name: 'Certificates', url: '/#certificates' },
    { name: 'Bug Hunting Journal', url: '/jurnal' }
  ];
  
  return (
    <footer className="py-5 mt-5 position-relative overflow-hidden">
      {/* Background gradient decorations */}
      <div className="position-absolute" style={{ 
        top: 0, 
        left: '-10%', 
        width: '500px', 
        height: '500px', 
        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.05) 0%, rgba(0, 0, 0, 0) 70%)',
        zIndex: 0,
        borderRadius: '50%'
      }}></div>
      
      <div className="position-absolute" style={{ 
        bottom: 0, 
        right: '-10%', 
        width: '500px', 
        height: '500px', 
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, rgba(0, 0, 0, 0) 70%)',
        zIndex: 0,
        borderRadius: '50%'
      }}></div>
      
      <Container className="position-relative" style={{ zIndex: 1 }}>
        <Row className="mb-5">
          <Col lg={5} md={6} className="mb-4 mb-md-0">
            <h3 className="h4 mb-4">Muhammad Reyhan</h3>
            <p className="text-secondary mb-4">
              Self-taught high school graduate building a career in technology
              with skills in programming, AI prompt engineering,
              and cybersecurity bug bounty.
            </p>
            <div className="d-flex social-links gap-3 mb-4">
              {socialLinks.map((link, index) => (
                <a key={index} href={link.url} className="social-link" target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                  <div className="social-icon">
                    {link.icon}
                  </div>
                </a>
              ))}
            </div>
          </Col>
          
          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <h4 className="h5 mb-4">Menu</h4>
            <ul className="list-unstyled footer-links">
              {menuLinks.map((link, index) => (
                <li key={index} className="mb-2">
                  <Link href={link.url} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
          
          <Col lg={4} md={12}>
            <h4 className="h5 mb-4">About Website</h4>
            <p className="text-secondary">
              This portfolio website was created using Next.js and Bootstrap 5
              to showcase my skills and projects in technology.
            </p>
          </Col>
        </Row>
        
        <hr className="my-4 bg-secondary opacity-25" />
        
        <Row className="text-center">
          <Col>
            <p className="text-secondary mb-2">
              &copy; {currentYear} Muhammad Reyhan. All rights reserved.
            </p>
            <p className="small text-secondary">
              Made with <FaHeart className="text-danger mx-1" /> in Rokan Hulu, Riau
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer; 