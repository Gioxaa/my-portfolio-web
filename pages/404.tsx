import React from 'react';
import Layout from '@/components/Layout';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Link from 'next/link';

export default function Custom404() {
  return (
    <Layout title="404 - Halaman Tidak Ditemukan | Muhammad Reyhan">
      <Container className="py-5 text-center">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <h1 className="display-1 fw-bold text-accent">404</h1>
            <h2 className="mb-4">Halaman Tidak Ditemukan</h2>
            <p className="lead mb-5">
              Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
            </p>
            <Link href="/" passHref legacyBehavior>
              <Button variant="primary" size="lg">Kembali ke Beranda</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
} 