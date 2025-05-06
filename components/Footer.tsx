import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaEnvelope, FaWhatsapp, FaGithub } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark py-4 mt-5">
      <Container>
        <Row className="justify-content-center text-center">
          <Col md={8}>
            <h5 className="mb-3">Muhammad Reyhan</h5>
            <p className="text-muted">Web Developer | AI Prompt Engineer | Cybersecurity Enthusiast</p>
            
            <div className="d-flex justify-content-center mb-4">
              <a href="mailto:reyhan@example.com" className="mx-2 text-light fs-5">
                <FaEnvelope />
              </a>
              <a href="https://wa.me/6281234567890" className="mx-2 text-light fs-5">
                <FaWhatsapp />
              </a>
              <a href="https://github.com/yourusername" className="mx-2 text-light fs-5">
                <FaGithub />
              </a>
            </div>
            
            <p className="text-muted mb-0">
              &copy; {currentYear} Muhammad Reyhan. Semua hak cipta dilindungi.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer; 