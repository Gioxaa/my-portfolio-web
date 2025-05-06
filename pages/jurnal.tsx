import React from 'react';
import Layout from '@/components/Layout';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';

const JournalItem = ({ 
  title, 
  description, 
  method, 
  target, 
  date 
}: { 
  title: string, 
  description: string, 
  method: string, 
  target: string, 
  date: string 
}) => (
  <Card className="mb-4 shadow-sm">
    <Card.Body>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="h5 mb-0">{title}</h3>
        <Badge bg="secondary">{date}</Badge>
      </div>
      <p className="mb-2"><strong>Target:</strong> {target}</p>
      <p className="mb-3">{description}</p>
      <div>
        <Badge bg="info" className="me-2">Metode: {method}</Badge>
      </div>
    </Card.Body>
  </Card>
);

export default function BugHuntingJournal() {
  const journalEntries = [
    {
      id: 1,
      title: 'SQL Injection – registrasiulang.unri.ac.id',
      description: 'Menggunakan query "\'or 1=1 -- -" untuk menguji kerentanan injection, kemudian melanjutkan dengan pengujian menggunakan sqlmap untuk mengonfirmasi kerentanan.',
      method: 'SQL Injection',
      target: 'registrasiulang.unri.ac.id',
      date: 'Januari 2024'
    },
    {
      id: 2,
      title: 'Hash Prediktif',
      description: 'Mencoba memprediksi hash yang digunakan pada URL reset password, dengan menganalisa pola pembentukan hash dari beberapa sampel URL.',
      method: 'Hash Analysis',
      target: 'Aplikasi web institusi',
      date: 'Februari 2024'
    },
    {
      id: 3,
      title: 'CSRF Token Reuse',
      description: 'Mengidentifikasi bahwa token CSRF tidak diregenerasi pada setiap request, memungkinkan penggunaan kembali token yang sama untuk beberapa operasi.',
      method: 'CSRF Token Reuse',
      target: 'Portal mahasiswa',
      date: 'Februari 2024'
    },
    {
      id: 4,
      title: 'IDOR (Insecure Direct Object Reference)',
      description: 'Memanipulasi parameter NIM atau ID pada URL untuk mengakses data yang seharusnya tidak dapat diakses oleh pengguna.',
      method: 'IDOR',
      target: 'Sistem akademik kampus',
      date: 'Maret 2024'
    },
    {
      id: 5,
      title: 'File Upload Bypass',
      description: 'Menguji kerentanan upload file dengan teknik seperti memodifikasi ekstensi file menjadi ".pdf.php" dan melakukan MIME spoofing.',
      method: 'File Upload Bypass',
      target: 'Sistem upload dokumen',
      date: 'Maret 2024'
    },
    {
      id: 6,
      title: 'Error Disclosure',
      description: 'Berhasil menangkap error dan informasi debug dari server yang memberikan petunjuk mengenai struktur database dan konfigurasi server.',
      method: 'Error Disclosure',
      target: 'Berbagai aplikasi web',
      date: 'April 2024'
    },
  ];

  return (
    <Layout title="Jurnal Bug Hunting | Muhammad Reyhan" description="Dokumentasi uji coba keamanan dan bug hunting sebagai pembelajaran etis">
      <section className="py-5">
        <Container>
          <Row>
            <Col lg={12} className="mb-5">
              <h1 className="section-title">Jurnal Bug Hunting</h1>
              <div className="alert alert-info">
                <p className="mb-0">
                  <strong>Catatan:</strong> Semua eksplorasi ini untuk <strong>pembelajaran etis</strong> dan 
                  bagian dari proses belajar menjadi bug bounty hunter pemula. Pengujian hanya dilakukan pada 
                  sistem yang memiliki program bug bounty atau dengan izin pemilik sistem.
                </p>
              </div>
            </Col>
          </Row>
          
          <Row>
            <Col lg={12}>
              {journalEntries.map((entry) => (
                <JournalItem 
                  key={entry.id}
                  title={entry.title}
                  description={entry.description}
                  method={entry.method}
                  target={entry.target}
                  date={entry.date}
                />
              ))}
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  );
} 