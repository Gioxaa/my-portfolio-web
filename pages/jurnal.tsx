import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { FaCalendarAlt, FaExclamationTriangle, FaBug, FaServer } from 'react-icons/fa';
import Link from 'next/link';

const JournalItem = ({ 
  title, 
  description, 
  method, 
  target, 
  date,
  index
}: { 
  title: string, 
  description: string, 
  method: string, 
  target: string, 
  date: string,
  index: number
}) => (
  <div className="journal-item">
    <Card className="shadow-sm border-0 mb-4">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="h5 mb-0 fw-bold text-bright">{title}</h3>
          <Badge bg="secondary" className="px-3 py-2 rounded-pill">
            <FaCalendarAlt className="me-1" /> {date}
          </Badge>
        </div>
        <div className="mb-3">
          <Badge bg="danger" className="me-2 mb-2 px-3 py-2">
            <FaServer className="me-1" /> Target: {target}
          </Badge>
          <Badge bg="info" className="me-2 mb-2 px-3 py-2">
            <FaBug className="me-1" /> Metode: {method}
          </Badge>
        </div>
        <p className="mb-3">{description}</p>
        <div className="d-flex justify-content-end">
          <span className="text-secondary small">
            <FaExclamationTriangle className="me-1" /> Untuk pembelajaran etis
          </span>
        </div>
      </Card.Body>
    </Card>
  </div>
);

export default function BugHuntingJournal() {
  useEffect(() => {
    // Animation for sections
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('.section-fade');
    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  const journalEntries = [
    {
      id: 1,
      title: 'SQL Injection – registrasiulang.unri.ac.id',
      description: 'Menggunakan query "\'or 1=1 -- -" untuk menguji kerentanan injection, kemudian melanjutkan dengan pengujian menggunakan sqlmap untuk mengonfirmasi kerentanan. Hasil menunjukkan adanya potensi pengambilan data sensitif melalui kueri yang tidak divalidasi dengan benar.',
      method: 'SQL Injection',
      target: 'registrasiulang.unri.ac.id',
      date: 'Januari 2024'
    },
    {
      id: 2,
      title: 'Hash Prediktif pada URL Reset Password',
      description: 'Mencoba memprediksi hash yang digunakan pada URL reset password, dengan menganalisa pola pembentukan hash dari beberapa sampel URL. Pola yang ditemukan menunjukkan bahwa hash dapat diprediksi dengan tingkat akurasi tertentu karena kurangnya elemen acak dalam pembentukannya.',
      method: 'Hash Analysis',
      target: 'Aplikasi web institusi',
      date: 'Februari 2024'
    },
    {
      id: 3,
      title: 'CSRF Token Reuse pada Portal Mahasiswa',
      description: 'Mengidentifikasi bahwa token CSRF tidak diregenerasi pada setiap request, memungkinkan penggunaan kembali token yang sama untuk beberapa operasi. Hal ini membuka celah keamanan di mana penyerang dapat menggunakan token yang sama untuk melakukan tindakan atas nama pengguna yang terautentikasi.',
      method: 'CSRF Token Reuse',
      target: 'Portal mahasiswa',
      date: 'Februari 2024'
    },
    {
      id: 4,
      title: 'IDOR pada Sistem Akademik',
      description: 'Memanipulasi parameter NIM atau ID pada URL untuk mengakses data yang seharusnya tidak dapat diakses oleh pengguna. Sistem tidak melakukan verifikasi apakah pengguna yang mengakses data memiliki izin yang benar, sehingga memungkinkan akses data mahasiswa lain.',
      method: 'IDOR',
      target: 'Sistem akademik kampus',
      date: 'Maret 2024'
    },
    {
      id: 5,
      title: 'File Upload Bypass pada Sistem Dokumen',
      description: 'Menguji kerentanan upload file dengan teknik seperti memodifikasi ekstensi file menjadi ".pdf.php" dan melakukan MIME spoofing. Berhasil mengunggah file PHP yang dapat dieksekusi server melalui validasi yang hanya memeriksa ekstensi file tanpa analisis konten yang mendalam.',
      method: 'File Upload Bypass',
      target: 'Sistem upload dokumen',
      date: 'Maret 2024'
    },
    {
      id: 6,
      title: 'Error Disclosure dan Information Leakage',
      description: 'Berhasil menangkap error dan informasi debug dari server yang memberikan petunjuk mengenai struktur database dan konfigurasi server. Informasi ini potensial digunakan untuk menyusun serangan lebih lanjut karena mengungkapkan jalur file, versi software, dan struktur database.',
      method: 'Error Disclosure',
      target: 'Berbagai aplikasi web',
      date: 'April 2024'
    },
  ];

  return (
    <Layout title="Jurnal Bug Hunting | Muhammad Reyhan" description="Dokumentasi uji coba keamanan dan bug hunting sebagai pembelajaran etis">
      <section className="py-5 section-fade">
        <Container>
          <div className="mb-5 text-center">
            <h1 className="display-5 fw-bold mb-3 text-bright">Jurnal Bug Hunting</h1>
            <div className="w-75 mx-auto">
              <p className="lead text-secondary">
                Dokumentasi perjalanan saya dalam eksplorasi keamanan siber dan penemuan kerentanan aplikasi web
              </p>
            </div>
          </div>
          
          <Row className="justify-content-center mb-5">
            <Col lg={12}>
              <Card className="border-0 bg-dark bg-opacity-50 shadow-sm">
                <Card.Body className="p-4">
                  <div className="d-flex">
                    <div className="me-3">
                      <FaExclamationTriangle size={24} className="text-warning" />
                    </div>
                    <div>
                      <h3 className="h5 mb-2 text-bright">Peringatan Etika</h3>
                      <p className="mb-0 text-secondary">
                        Semua eksplorasi ini untuk <span className="text-bright fw-bold">pembelajaran etis</span> dan 
                        bagian dari proses belajar menjadi bug bounty hunter pemula. Pengujian hanya dilakukan pada 
                        sistem yang memiliki program bug bounty atau dengan izin pemilik sistem. Tidak ada aktivitas ilegal 
                        yang dilakukan dalam proses ini.
                      </p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          <Row className="justify-content-center">
            <Col lg={12}>
              {journalEntries.map((entry, index) => (
                <JournalItem 
                  key={entry.id}
                  title={entry.title}
                  description={entry.description}
                  method={entry.method}
                  target={entry.target}
                  date={entry.date}
                  index={index}
                />
              ))}
            </Col>
          </Row>
          
          <div className="text-center mt-5">
            <p className="text-secondary">
              Jika Anda memiliki program bug bounty dan ingin berkolaborasi, <Link href="mailto:reyhan@example.com" className="link-accent">hubungi saya</Link>.
            </p>
          </div>
        </Container>
        
        {/* Background decorations */}
        <div className="position-absolute" style={{ 
          top: '20%', 
          right: '5%', 
          width: '300px', 
          height: '300px', 
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, rgba(0, 0, 0, 0) 70%)',
          zIndex: -1,
          borderRadius: '50%'
        }}></div>
        <div className="position-absolute" style={{ 
          bottom: '10%', 
          left: '5%', 
          width: '250px', 
          height: '250px', 
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, rgba(0, 0, 0, 0) 70%)',
          zIndex: -1,
          borderRadius: '50%'
        }}></div>
      </section>
    </Layout>
  );
} 