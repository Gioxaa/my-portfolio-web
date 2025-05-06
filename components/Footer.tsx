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
    { name: 'Beranda', url: '/' },
    { name: 'Tentang Saya', url: '/#about' },
    { name: 'Keahlian', url: '/#skills' },
    { name: 'Karya & Proyek', url: '/#projects' },
    { name: 'Sertifikat', url: '/#certificates' },
    { name: 'Jurnal Bug Hunting', url: '/jurnal' }
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
              Lulusan SMA yang membangun karier teknologi secara mandiri
              dengan kemampuan di bidang pemrograman, AI prompt engineering,
              dan cybersecurity bug bounty.
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
                  <Link href={link.url} passHref legacyBehavior>
                    <a>{link.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
          
          <Col lg={4} md={12}>
            <h4 className="h5 mb-4">Tentang Website</h4>
            <p className="text-secondary">
              Website portofolio ini dibuat menggunakan Next.js dan Bootstrap 5
              dengan tujuan untuk menampilkan karya dan keahlian saya di bidang teknologi.
            </p>
          </Col>
        </Row>
        
        <hr className="my-4 bg-secondary opacity-25" />
        
        <Row className="text-center">
          <Col>
            <p className="text-secondary mb-2">
              &copy; {currentYear} Muhammad Reyhan. Semua hak cipta dilindungi.
            </p>
            <p className="small text-secondary">
              Dibuat dengan <FaHeart className="text-danger mx-1" /> di Rokan Hulu, Riau
            </p>
          </Col>
        </Row>
      </Container>
      
      <style jsx>{`
        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--card-bg);
          color: var(--text-light);
          font-size: 1.2rem;
          transition: all 0.3s ease;
        }
        
        .social-link:hover {
          transform: translateY(-3px);
          background: var(--accent-gradient);
          color: white;
        }
        
        .footer-links a {
          display: inline-block;
          color: var(--text-secondary);
          transition: all 0.2s ease;
          position: relative;
          padding-left: 15px;
        }
        
        .footer-links a:before {
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          opacity: 0.6;
          transition: all 0.2s ease;
        }
        
        .footer-links a:hover {
          color: var(--accent);
          transform: translateX(3px);
        }
        
        .footer-links a:hover:before {
          opacity: 1;
          background: var(--accent-gradient);
        }
      `}</style>
    </footer>
  );
};

export default Footer; 