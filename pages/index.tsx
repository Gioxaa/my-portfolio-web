import React from 'react';
import Layout from '@/components/Layout';
import { Container, Row, Col, Button, Card, ProgressBar, Carousel } from 'react-bootstrap';
import { FaEnvelope, FaWhatsapp, FaCode, FaLaptopCode, FaShieldAlt } from 'react-icons/fa';
import Image from 'next/image';

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="text-center text-lg-start fade-in">
              <h1 className="display-4 fw-bold mb-4">Muhammad Reyhan</h1>
              <h2 className="h4 text-secondary mb-4">Rokan Hulu, Riau</h2>
              <p className="lead mb-4">
                Lulusan SMA yang membangun karier teknologi secara mandiri. 
                Saya mengembangkan kemampuan di pemrograman, AI prompt engineering, 
                dan cybersecurity bug bounty. Siap berkontribusi dalam tim dinamis dan proyek nyata.
              </p>
              <div className="d-flex gap-3 justify-content-center justify-content-lg-start">
                <Button variant="primary" href="mailto:reyhan@example.com">
                  <FaEnvelope className="me-2" />
                  Email
                </Button>
                <Button variant="outline-light" href="https://wa.me/6281234567890">
                  <FaWhatsapp className="me-2" />
                  WhatsApp
                </Button>
              </div>
            </Col>
            <Col lg={6} className="text-center mt-5 mt-lg-0">
              <div className="hero-image-container">
                {/* Placeholder for profile image */}
                <div className="bg-accent rounded-circle" style={{ width: '300px', height: '300px', margin: '0 auto' }}>
                  {/* If you have an image, uncomment this:
                  <Image
                    src="/profile.jpg"
                    alt="Muhammad Reyhan"
                    width={300}
                    height={300}
                    className="rounded-circle"
                  />
                  */}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* About Section */}
      <section id="about" className="py-5">
        <Container>
          <h2 className="section-title">Tentang Saya</h2>
          <Row>
            <Col lg={12}>
              <Card className="border-0 shadow-sm p-4 mb-4">
                <Card.Body>
                  <h3 className="h4 mb-3">Pendidikan</h3>
                  <p>SMA Negeri 2 Rambah Hilir</p>
                  
                  <h3 className="h4 mb-3 mt-4">Pengalaman Organisasi</h3>
                  <ul>
                    <li>Sekretaris OSIS</li>
                    <li>Ketua Jurnalistik Komputer</li>
                    <li>Anggota SMANung Intelegensia</li>
                  </ul>
                  
                  <h3 className="h4 mb-3 mt-4">Prestasi</h3>
                  <ul>
                    <li>Juara lomba film pendek</li>
                    <li>Finalis debat bahasa Indonesia</li>
                    <li>Juara jurnalistik sekolah & kabupaten</li>
                    <li>Peringkat 3 OSN Kabupaten</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-5">
        <Container>
          <h2 className="section-title">Keahlian</h2>
          <Row>
            <Col lg={4} md={6} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <div className="text-center mb-4">
                    <FaCode className="display-4 text-accent mb-3" />
                    <h3 className="h4">Programming</h3>
                  </div>
                  <div className="mb-3">
                    <p className="d-flex justify-content-between mb-1">
                      <span>Python</span>
                      <span>75%</span>
                    </p>
                    <ProgressBar now={75} className="mb-3" />
                    
                    <p className="d-flex justify-content-between mb-1">
                      <span>JavaScript</span>
                      <span>70%</span>
                    </p>
                    <ProgressBar now={70} className="mb-3" />
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={4} md={6} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <div className="text-center mb-4">
                    <FaLaptopCode className="display-4 text-accent mb-3" />
                    <h3 className="h4">Frameworks</h3>
                  </div>
                  <div className="mb-3">
                    <p className="d-flex justify-content-between mb-1">
                      <span>React.js</span>
                      <span>65%</span>
                    </p>
                    <ProgressBar now={65} className="mb-3" />
                    
                    <p className="d-flex justify-content-between mb-1">
                      <span>Next.js</span>
                      <span>60%</span>
                    </p>
                    <ProgressBar now={60} className="mb-3" />
                    
                    <p className="d-flex justify-content-between mb-1">
                      <span>Bootstrap</span>
                      <span>80%</span>
                    </p>
                    <ProgressBar now={80} className="mb-3" />
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={4} md={12} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <div className="text-center mb-4">
                    <FaShieldAlt className="display-4 text-accent mb-3" />
                    <h3 className="h4">Cybersecurity</h3>
                  </div>
                  <ul>
                    <li>SQL Injection (manual dan sqlmap)</li>
                    <li>IDOR</li>
                    <li>File Upload Bypass</li>
                    <li>CSRF Token Reuse</li>
                    <li>SSRF</li>
                    <li>Hash Prediktif</li>
                    <li>Error Disclosure</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={12} className="mb-4">
              <Card className="shadow-sm">
                <Card.Body>
                  <div className="text-center mb-4">
                    <h3 className="h4">Prompt Engineering</h3>
                  </div>
                  <ul>
                    <li>Merancang prompt AI untuk ChatGPT, Gemini</li>
                    <li>Otomatisasi ide, riset, dan eksplorasi use-case</li>
                    <li>Optimasi prompt untuk hasil maksimal</li>
                    <li>Sistem prompt untuk berbagai task profesional</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-5">
        <Container>
          <h2 className="section-title">Karya & Proyek</h2>
          <Row>
            {[1, 2, 3, 4].map((item) => (
              <Col lg={3} md={6} className="mb-4" key={item}>
                <Card className="h-100 shadow-sm">
                  <div className="bg-secondary" style={{ height: '160px' }}></div>
                  <Card.Body>
                    <Card.Title>Proyek {item}</Card.Title>
                    <Card.Text>
                      Deskripsi singkat tentang proyek ini. Teknologi yang digunakan dan apa yang dipelajari.
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="bg-transparent border-0">
                    <Button variant="outline-primary" size="sm" className="me-2">Demo</Button>
                    <Button variant="outline-secondary" size="sm">GitHub</Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="py-5">
        <Container>
          <h2 className="section-title">Sertifikat</h2>
          <Carousel indicators={false} className="certificate-carousel">
            {[1, 2, 3].map((item) => (
              <Carousel.Item key={item}>
                <Row className="justify-content-center">
                  <Col md={8} lg={6}>
                    <Card className="shadow-sm">
                      <div className="bg-secondary p-5 text-center">
                        <h3 className="text-white">Sertifikat {item}</h3>
                        <p className="text-light mb-0">Deskripsi sertifikat dan penyelenggara</p>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
        </Container>
      </section>
    </Layout>
  );
} 