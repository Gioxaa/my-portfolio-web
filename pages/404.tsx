import React from 'react';
import Layout from '@/components/Layout';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Link from 'next/link';
import { FaHome, FaSearch } from 'react-icons/fa';

export default function Custom404() {
  return (
    <Layout title="404 - Halaman Tidak Ditemukan | Muhammad Reyhan">
      <Container className="py-5 text-center">
        <Row className="justify-content-center">
          <Col md={10} lg={8} className="py-5">
            <div className="mb-5">
              {/* 404 with gradient effect */}
              <h1 className="display-1 fw-bold mb-4" style={{ 
                fontSize: '8rem', 
                background: 'var(--accent-gradient)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 10px 30px rgba(6, 182, 212, 0.3)'
              }}>404</h1>
              
              <h2 className="mb-4 h3">Halaman Tidak Ditemukan</h2>
              <p className="lead mb-5 text-secondary mx-auto" style={{ maxWidth: '500px' }}>
                Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan. 
                Silahkan kembali ke halaman beranda.
              </p>
              
              <div className="d-flex justify-content-center gap-3">
                <Link href="/" passHref legacyBehavior>
                  <Button variant="primary" size="lg" className="px-4 py-2">
                    <FaHome className="me-2" /> Kembali ke Beranda
                  </Button>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      
      {/* Background elements */}
      <div className="position-fixed" style={{ 
        top: '10%', 
        right: '10%', 
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, rgba(0, 0, 0, 0) 70%)',
        zIndex: -1,
        borderRadius: '50%'
      }}></div>
      <div className="position-fixed" style={{ 
        bottom: '10%', 
        left: '10%', 
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, rgba(0, 0, 0, 0) 70%)',
        zIndex: -1,
        borderRadius: '50%'
      }}></div>
    </Layout>
  );
} 