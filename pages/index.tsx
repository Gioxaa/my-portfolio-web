import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import { Container, Row, Col, Button, Card, ProgressBar, Carousel } from 'react-bootstrap';
import { FaEnvelope, FaWhatsapp, FaCode, FaLaptopCode, FaShieldAlt, FaGithub, FaBrain, FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  useEffect(() => {
    // Animation for sections
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
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

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="hero-content text-center text-lg-start fade-in">
              <h1 className="display-4 fw-bold mb-3">Muhammad Reyhan</h1>
              <h2 className="h5 mb-3 text-secondary">Rokan Hulu, Riau</h2>
              <p className="lead mb-4">
                Lulusan SMA yang membangun karier teknologi secara mandiri. 
                Saya mengembangkan kemampuan di pemrograman, AI prompt engineering, 
                dan cybersecurity bug bounty. Siap berkontribusi dalam tim dinamis dan proyek nyata.
              </p>
              <div className="d-flex gap-3 justify-content-center justify-content-lg-start">
                <Button variant="primary" href="mailto:reyhan@example.com" className="btn-touch-effect">
                  <FaEnvelope className="me-2" />
                  Email
                </Button>
                <Button variant="outline-light" href="https://wa.me/6281234567890" className="btn-touch-effect">
                  <FaWhatsapp className="me-2" />
                  WhatsApp
                </Button>
                <Button variant="outline-light" href="https://github.com/yourusername" target="_blank" className="btn-touch-effect">
                  <FaGithub className="me-2" />
                  GitHub
                </Button>
              </div>
            </Col>
            <Col lg={6} className="text-center mt-5 mt-lg-0">
              <div className="hero-image">
                {/* Profile image with gradient circle border */}
                <div className="position-relative mx-auto" style={{ width: '280px', height: '280px' }}>
                  <div className="position-absolute w-100 h-100 rounded-circle hero-circle-border" 
                       style={{ 
                         background: 'var(--accent-gradient)',
                         animation: 'spin 15s linear infinite',
                         opacity: '0.7'
                       }}>
                  </div>
                  <div className="position-absolute hero-circle-inner" 
                       style={{ 
                         width: '260px', 
                         height: '260px', 
                         top: '10px', 
                         left: '10px',
                         backgroundColor: 'var(--bg-dark)',
                         borderRadius: '50%'
                       }}>
                    {/* If you have an image, uncomment this:
                    <Image
                      src="/images/profile.jpg"
                      alt="Muhammad Reyhan"
                      width={250}
                      height={250}
                      className="rounded-circle position-absolute"
                      style={{ top: '5px', left: '5px', objectFit: 'cover' }}
                    />
                    */}
                    <div className="d-flex justify-content-center align-items-center h-100">
                      <span className="display-2 fw-bold" style={{ 
                        background: 'var(--accent-gradient)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}>MR</span>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* About Section */}
      <section id="about" className="section-fade">
        <Container>
          <h2 className="section-title">Tentang Saya</h2>
          <p className="section-subtitle">Perjalanan saya dari belajar otodidak hingga menjadi developer dengan semangat untuk terus berkembang</p>
          
          <Row>
            <Col lg={12}>
              <Card className="border-subtle shadow p-3 p-md-4 mb-4">
                <Card.Body>
                  <Row>
                    <Col md={4} className="mb-4 mb-md-0">
                      <div className="d-flex align-items-center mb-3">
                        <div className="me-3" style={{ 
                          width: '10px', 
                          height: '10px', 
                          borderRadius: '50%', 
                          background: 'var(--accent)' 
                        }}></div>
                        <h3 className="h4 mb-0">Pendidikan</h3>
                      </div>
                      <p className="mb-4">SMA Negeri 2 Rambah Hilir</p>
                    </Col>
                    
                    <Col md={8}>
                      <div className="d-flex align-items-center mb-3">
                        <div className="me-3" style={{ 
                          width: '10px', 
                          height: '10px', 
                          borderRadius: '50%', 
                          background: 'var(--accent)' 
                        }}></div>
                        <h3 className="h4 mb-0">Pengalaman Organisasi</h3>
                      </div>
                      <div className="mb-4">
                        <Row>
                          <Col md={6} className="mb-3">
                            <div className="border-subtle rounded-sm p-3">
                              <h4 className="h6 fw-bold mb-2">Sekretaris OSIS</h4>
                              <p className="small text-secondary mb-0">Bertanggung jawab untuk dokumentasi dan komunikasi organisasi</p>
                            </div>
                          </Col>
                          <Col md={6} className="mb-3">
                            <div className="border-subtle rounded-sm p-3">
                              <h4 className="h6 fw-bold mb-2">Ketua Jurnalistik Komputer</h4>
                              <p className="small text-secondary mb-0">Memimpin tim dalam penulisan dan penyuntingan konten</p>
                            </div>
                          </Col>
                          <Col md={6} className="mb-3">
                            <div className="border-subtle rounded-sm p-3">
                              <h4 className="h6 fw-bold mb-2">Anggota SMANung Intelegensia</h4>
                              <p className="small text-secondary mb-0">Berpartisipasi dalam kegiatan pengembangan akademik</p>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                  
                  <div className="mt-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="me-3" style={{ 
                        width: '10px', 
                        height: '10px', 
                        borderRadius: '50%', 
                        background: 'var(--accent)' 
                      }}></div>
                      <h3 className="h4 mb-0">Prestasi</h3>
                    </div>
                    <Row>
                      <Col md={6} lg={3} className="mb-3">
                        <div className="achievement-card p-3 border-subtle rounded-sm">
                          <div className="d-flex mb-2">
                            <div className="me-3 text-center" style={{ 
                              minWidth: '36px',
                              width: '36px',
                              height: '36px',
                              borderRadius: '50%',
                              background: 'var(--accent)',
                              color: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '1rem',
                              fontWeight: 'bold'
                            }}>1</div>
                            <h5 className="h6 mb-0 fw-bold">Juara lomba film pendek</h5>
                          </div>
                          <p className="small text-secondary mb-0 ms-5 ps-2">Tingkat Sekolah</p>
                        </div>
                      </Col>
                      <Col md={6} lg={3} className="mb-3">
                        <div className="achievement-card p-3 border-subtle rounded-sm">
                          <div className="d-flex mb-2">
                            <div className="me-3 text-center" style={{ 
                              minWidth: '36px',
                              width: '36px',
                              height: '36px',
                              borderRadius: '50%',
                              background: 'var(--accent)',
                              color: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '1rem',
                              fontWeight: 'bold'
                            }}>2</div>
                            <h5 className="h6 mb-0 fw-bold">Finalis debat</h5>
                          </div>
                          <p className="small text-secondary mb-0 ms-5 ps-2">Tingkat Kabupaten</p>
                        </div>
                      </Col>
                      <Col md={6} lg={3} className="mb-3">
                        <div className="achievement-card p-3 border-subtle rounded-sm">
                          <div className="d-flex mb-2">
                            <div className="me-3 text-center" style={{ 
                              minWidth: '36px',
                              width: '36px',
                              height: '36px',
                              borderRadius: '50%',
                              background: 'var(--accent)',
                              color: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '1rem',
                              fontWeight: 'bold'
                            }}>3</div>
                            <h5 className="h6 mb-0 fw-bold">Juara jurnalistik</h5>
                          </div>
                          <p className="small text-secondary mb-0 ms-5 ps-2">Sekolah & Kabupaten</p>
                        </div>
                      </Col>
                      <Col md={6} lg={3} className="mb-3">
                        <div className="achievement-card p-3 border-subtle rounded-sm">
                          <div className="d-flex mb-2">
                            <div className="me-3 text-center" style={{ 
                              minWidth: '36px',
                              width: '36px',
                              height: '36px',
                              borderRadius: '50%',
                              background: 'var(--accent)',
                              color: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '1rem',
                              fontWeight: 'bold'
                            }}>4</div>
                            <h5 className="h6 mb-0 fw-bold">Peringkat 3 OSN</h5>
                          </div>
                          <p className="small text-secondary mb-0 ms-5 ps-2">Tingkat Kabupaten</p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-fade">
        <Container>
          <h2 className="section-title">Keahlian</h2>
          <p className="section-subtitle">Beberapa kemampuan teknis yang telah saya kembangkan dan terus diasah</p>
          
          <Row>
            <Col lg={4} md={6} className="mb-4">
              <Card className="h-100 shadow-sm border-subtle">
                <Card.Body className="d-flex flex-column">
                  <div className="text-center mb-3">
                    <FaCode className="skill-icon mb-2" />
                    <h3 className="h4">Programming</h3>
                  </div>
                  <div className="mb-3 flex-grow-1">
                    <div className="mb-4">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-medium">Python</span>
                        <span className="badge bg-dark">75%</span>
                      </div>
                      <ProgressBar now={75} className="mb-1" style={{ height: '6px' }} />
                      <p className="text-secondary small mt-1">Data analysis, automation, web scraping</p>
                    </div>
                    
                    <div className="mb-4">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-medium">JavaScript</span>
                        <span className="badge bg-dark">70%</span>
                      </div>
                      <ProgressBar now={70} className="mb-1" style={{ height: '6px' }} />
                      <p className="text-secondary small mt-1">Frontend development, React, Node.js</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={4} md={6} className="mb-4">
              <Card className="h-100 shadow-sm border-subtle">
                <Card.Body className="d-flex flex-column">
                  <div className="text-center mb-3">
                    <FaLaptopCode className="skill-icon mb-2" />
                    <h3 className="h4">Frameworks</h3>
                  </div>
                  <div className="mb-3 flex-grow-1">
                    <div className="mb-4">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-medium">React.js</span>
                        <span className="badge bg-dark">65%</span>
                      </div>
                      <ProgressBar now={65} className="mb-1" style={{ height: '6px' }} />
                      <p className="text-secondary small mt-1">Components, hooks, state management</p>
                    </div>
                    
                    <div className="mb-4">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-medium">Next.js</span>
                        <span className="badge bg-dark">60%</span>
                      </div>
                      <ProgressBar now={60} className="mb-1" style={{ height: '6px' }} />
                      <p className="text-secondary small mt-1">SSR, routing, API routes</p>
                    </div>
                    
                    <div className="mb-4">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-medium">Bootstrap</span>
                        <span className="badge bg-dark">80%</span>
                      </div>
                      <ProgressBar now={80} className="mb-1" style={{ height: '6px' }} />
                      <p className="text-secondary small mt-1">Responsive design, components, customization</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={4} md={12} className="mb-4">
              <Card className="h-100 shadow-sm border-subtle">
                <Card.Body className="d-flex flex-column">
                  <div className="text-center mb-3">
                    <FaShieldAlt className="skill-icon mb-2" />
                    <h3 className="h4">Cybersecurity</h3>
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex flex-wrap">
                      {['SQL Injection', 'IDOR', 'File Upload Bypass', 'CSRF Token Reuse', 'SSRF', 'Hash Prediktif', 'Error Disclosure'].map((skill) => (
                        <span key={skill} className="skill-badge">
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-4">
                      <p className="small text-secondary">Saya fokus pada keamanan aplikasi web dan etika pengujian penetrasi. Mengikuti prinsip responsible disclosure saat menemukan kerentanan keamanan.</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={12} className="mb-4">
              <Card className="shadow-sm border-subtle">
                <Card.Body>
                  <div className="d-flex flex-column flex-md-row align-items-md-center mb-3">
                    <div className="text-center text-md-start me-md-4 mb-3 mb-md-0">
                      <FaBrain className="skill-icon" style={{ fontSize: '3rem' }} />
                    </div>
                    <div>
                      <h3 className="h4 mb-2">Prompt Engineering</h3>
                      <p className="text-secondary mb-0">Merancang prompt AI terstruktur untuk mendapatkan output yang optimal dari model bahasa seperti ChatGPT dan Gemini</p>
                    </div>
                  </div>
                  
                  <Row>
                    <Col md={6}>
                      <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="fw-medium">ChatGPT Prompt Design</span>
                          <span className="badge bg-dark">85%</span>
                        </div>
                        <ProgressBar now={85} className="mb-1" style={{ height: '6px' }} />
                        <p className="text-secondary small mt-1">Struktur prompt kompleks, context window optimization</p>
                      </div>
                      
                      <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="fw-medium">Optimasi Output AI</span>
                          <span className="badge bg-dark">80%</span>
                        </div>
                        <ProgressBar now={80} className="mb-1" style={{ height: '6px' }} />
                        <p className="text-secondary small mt-1">Menciptakan prompt yang menghasilkan respon terstruktur dan konsisten</p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="fw-medium">Sistem Prompt Kompleks</span>
                          <span className="badge bg-dark">75%</span>
                        </div>
                        <ProgressBar now={75} className="mb-1" style={{ height: '6px' }} />
                        <p className="text-secondary small mt-1">Merancang sistem prompt dengan instruksi multi-level</p>
                      </div>
                      
                      <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="fw-medium">AI Task Automation</span>
                          <span className="badge bg-dark">70%</span>
                        </div>
                        <ProgressBar now={70} className="mb-1" style={{ height: '6px' }} />
                        <p className="text-secondary small mt-1">Mengintegrasikan AI ke dalam alur kerja otomatis</p>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-fade">
        <Container>
          <h2 className="section-title">Karya & Proyek</h2>
          <p className="section-subtitle">Portofolio proyek dan eksperimen yang telah saya buat</p>
          
          <Row>
            {[
              {
                title: 'Website Portofolio',
                desc: 'Website portofolio pribadi dengan Next.js dan Bootstrap, menampilkan keahlian dan proyek.',
                img: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
                tech: ['Next.js', 'Bootstrap', 'React']
              },
              {
                title: 'Aplikasi Todo',
                desc: 'Aplikasi manajemen tugas dengan React dan localStorage untuk menyimpan data tugas.',
                img: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                tech: ['React', 'CSS', 'localStorage']
              },
              {
                title: 'Bot Analisis Teks',
                desc: 'Bot Python untuk menganalisis sentimen dari data Twitter menggunakan NLP.',
                img: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)',
                tech: ['Python', 'NLTK', 'Twitter API']
              },
              {
                title: 'Dokumentasi Bug',
                desc: 'Dokumentasi proses bug hunting dan solusi keamanan dari berbagai temuan.',
                img: 'linear-gradient(135deg, #0f766e, #0d9488)',
                tech: ['Markdown', 'GitHub', 'Security']
              }
            ].map((item, index) => (
              <Col lg={3} md={6} className="mb-4" key={index}>
                <Card className="h-100 shadow-sm border-subtle">
                  <div className="project-img" style={{ background: item.img }}>
                    <div className="p-3 text-white position-relative" style={{ zIndex: 2 }}>
                      <span className="badge bg-dark">Proyek {index + 1}</span>
                    </div>
                  </div>
                  <Card.Body>
                    <Card.Title className="fw-bold h5 mb-2">{item.title}</Card.Title>
                    <Card.Text className="text-secondary mb-3 small">
                      {item.desc}
                    </Card.Text>
                    <div className="d-flex flex-wrap mb-3">
                      {item.tech.map((tech, i) => (
                        <span key={i} className="badge bg-dark me-1 mb-1">{tech}</span>
                      ))}
                    </div>
                  </Card.Body>
                  <Card.Footer className="bg-transparent border-0 pt-0">
                    <div className="d-flex justify-content-center mt-2">
                      <Button variant="outline-primary" size="sm" className="btn-touch-effect">
                        GitHub <FaGithub className="ms-1" size={12} />
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
          
          <div className="text-center mt-4">
            <Link href="https://github.com/yourusername" className="link-accent" target="_blank" rel="noopener noreferrer">
              Lihat lebih banyak proyek di GitHub <FaArrowRight className="ms-1" size={12} />
            </Link>
          </div>
        </Container>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="section-fade">
        <Container>
          <h2 className="section-title">Sertifikat</h2>
          <p className="section-subtitle">Pencapaian dan penghargaan resmi yang telah saya dapatkan</p>
          
          <Carousel indicators={true} className="certificate-carousel py-3">
            {[
              {
                title: 'Web Development Fundamentals',
                org: 'Dicoding Indonesia',
                date: 'Desember 2023',
                desc: 'Menguasai dasar-dasar pengembangan web modern, termasuk HTML, CSS, JavaScript, dan responsive design.',
                bgColor: 'var(--accent)',
                badgeColor: 'rgba(14, 165, 233, 0.8)'
              },
              {
                title: 'Cyber Security Essential',
                org: 'Siber Corner',
                date: 'Januari 2024',
                desc: 'Memahami dasar-dasar keamanan siber, termasuk metode serangan umum dan teknik pertahanan.',
                bgColor: 'var(--secondary-accent)',
                badgeColor: 'rgba(139, 92, 246, 0.8)'
              },
              {
                title: 'AI Prompt Engineering',
                org: 'DeepLearning.AI',
                date: 'Februari 2024',
                desc: 'Merancang prompt AI yang efektif untuk mengoptimalkan output dari model bahasa besar (LLM).',
                bgColor: '#0f766e',
                badgeColor: 'rgba(15, 118, 110, 0.8)'
              }
            ].map((cert, index) => (
              <Carousel.Item key={index}>
                <Row className="justify-content-center">
                  <Col lg={10} md={10}>
                    <Card className="shadow-sm border-subtle overflow-hidden">
                      <div className="p-4 p-md-5">
                        <Row className="align-items-center mb-4">
                          <Col md={4} className="text-center mb-4 mb-md-0">
                            <div className="p-3 mx-auto rounded-circle d-flex align-items-center justify-content-center" 
                              style={{ 
                                width: '100px', 
                                height: '100px', 
                                background: cert.bgColor
                              }}>
                              <span className="h1 text-white mb-0">{index + 1}</span>
                            </div>
                          </Col>
                          <Col md={8}>
                            <h3 className="h4 text-bright mb-2">{cert.title}</h3>
                            <p className="text-secondary small mb-2">{cert.org} • {cert.date}</p>
                            <p className="text-light mb-3">{cert.desc}</p>
                          </Col>
                        </Row>
                        <div className="certificate-image mt-4 rounded overflow-hidden">
                          <div 
                            className="d-flex justify-content-center align-items-center p-4 rounded certificate-preview" 
                            style={{ 
                              background: `linear-gradient(135deg, ${cert.bgColor}, ${cert.badgeColor})`,
                              height: '200px',
                              position: 'relative',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease'
                            }}
                            onClick={() => window.open('#', '_blank')}
                          >
                            <div className="position-absolute top-0 end-0 m-2">
                              <span className="badge" style={{backgroundColor: cert.badgeColor}}>Sertifikat</span>
                            </div>
                            <div className="text-center">
                              <div className="mb-2">
                                <FaShieldAlt size={40} className="text-white opacity-75" />
                              </div>
                              <h4 className="text-white mb-0">{cert.title}</h4>
                              <p className="text-white opacity-75 small mb-0">Klik untuk melihat sertifikat lengkap</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
        </Container>
      </section>

      {/* Contact CTA */}
      <section className="section-fade py-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <Card className="border-0 shadow p-5" style={{ 
                background: 'var(--subtle-gradient)',
                backdropFilter: 'blur(10px)',
                borderRadius: 'var(--border-radius-lg)'
              }}>
                <h2 className="h3 mb-3">Tertarik untuk Berkolaborasi?</h2>
                <p className="text-secondary mb-4">Saya terbuka untuk kesempatan magang, kerja paruh waktu, dan kolaborasi proyek</p>
                <div className="d-flex justify-content-center gap-3">
                  <Button variant="primary" size="lg" href="mailto:reyhan@example.com">
                    <FaEnvelope className="me-2" />
                    Hubungi Saya
                  </Button>
                  <Button variant="outline-light" size="lg" href="/jurnal">
                    Lihat Jurnal Bug Hunting
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Add animated floating dots background */}
      <style jsx global>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .achievement-card {
          transition: var(--transition-normal);
        }
        
        .achievement-card:hover {
          transform: translateY(-3px);
          background-color: rgba(255, 255, 255, 0.03);
        }
      `}</style>
    </Layout>
  );
} 