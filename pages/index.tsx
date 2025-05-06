import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import { Container, Row, Col, Button, Card, ProgressBar, Carousel } from 'react-bootstrap';
import { FaEnvelope, FaWhatsapp, FaCode, FaLaptopCode, FaShieldAlt, FaGithub, FaBrain, FaArrowRight, FaEye, FaCamera } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import CertificatePlaceholder from '@/components/CertificatePlaceholder';

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
                Self-taught high school graduate building a career in technology. 
                I develop skills in programming, AI prompt engineering, 
                and cybersecurity bug bounty. Ready to contribute to dynamic teams and real projects.
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
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">My journey from self-taught learning to becoming a developer with a passion for continuous growth</p>
          
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
                        <h3 className="h4 mb-0">Education</h3>
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
                        <h3 className="h4 mb-0">Organization Experience</h3>
                      </div>
                      <div className="mb-4">
                        <Row>
                          <Col md={6} className="mb-3">
                            <div className="border-subtle rounded-sm p-3">
                              <h4 className="h6 fw-bold mb-2">Secretary OSIS</h4>
                              <p className="small text-secondary mb-0">OSIS SMA Negeri 2 Rambah Hilir (October 2023 - November 2024)</p>
                            </div>
                          </Col>
                          <Col md={6} className="mb-3">
                            <div className="border-subtle rounded-sm p-3">
                              <h4 className="h6 fw-bold mb-2">Head of Computer Journalism</h4>
                              <p className="small text-secondary mb-0">Computer Journalism Club (October 2022 - November 2024)</p>
                            </div>
                          </Col>
                          <Col md={6} className="mb-3">
                            <div className="border-subtle rounded-sm p-3">
                              <h4 className="h6 fw-bold mb-2">Member</h4>
                              <p className="small text-secondary mb-0">SMANung Intelligence Team (October 2022 - November 2023)</p>
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
                      <h3 className="h4 mb-0">Achievements</h3>
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
                            <h5 className="h6 mb-0 fw-bold">3rd Place in Journalism Competition</h5>
                          </div>
                          <p className="small text-secondary mb-0 ms-5 ps-2">Rokan Hulu Regency Level (May 2023)</p>
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
                            <h5 className="h6 mb-0 fw-bold">3rd Place in Short Film Competition</h5>
                          </div>
                          <p className="small text-secondary mb-0 ms-5 ps-2">Rokan Hulu Regency Level (May 2024)</p>
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
                            <h5 className="h6 mb-0 fw-bold">3rd Place in OSN Informatics</h5>
                          </div>
                          <p className="small text-secondary mb-0 ms-5 ps-2">Rokan Hulu Regency Level (May 2024)</p>
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
                            <h5 className="h6 mb-0 fw-bold">Finalist in Indonesian Debate Competition</h5>
                          </div>
                          <p className="small text-secondary mb-0 ms-5 ps-2">Riau Provincial Level (September 2024)</p>
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
          <h2 className="section-title">Skills</h2>
          <p className="section-subtitle">Technical abilities I've developed and continue to improve</p>
          
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
                      {['SQL Injection', 'IDOR', 'File Upload Bypass', 'CSRF Token Reuse', 'SSRF', 'Predictive Hash', 'Error Disclosure'].map((skill) => (
                        <span key={skill} className="skill-badge">
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-4">
                      <p className="small text-secondary">I focus on web application security and ethical penetration testing. Following responsible disclosure principles when finding security vulnerabilities.</p>
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
                      <p className="text-secondary mb-0">Designing structured AI prompts to get optimal output from language models like ChatGPT and Gemini</p>
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
                        <p className="text-secondary small mt-1">Complex prompt structures, context window optimization</p>
                      </div>
                      
                      <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="fw-medium">AI Output Optimization</span>
                          <span className="badge bg-dark">80%</span>
                        </div>
                        <ProgressBar now={80} className="mb-1" style={{ height: '6px' }} />
                        <p className="text-secondary small mt-1">Creating prompts that generate structured and consistent responses</p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="fw-medium">Complex Prompt Systems</span>
                          <span className="badge bg-dark">75%</span>
                        </div>
                        <ProgressBar now={75} className="mb-1" style={{ height: '6px' }} />
                        <p className="text-secondary small mt-1">Designing prompt systems with multi-level instructions</p>
                      </div>
                      
                      <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="fw-medium">AI Task Automation</span>
                          <span className="badge bg-dark">70%</span>
                        </div>
                        <ProgressBar now={70} className="mb-1" style={{ height: '6px' }} />
                        <p className="text-secondary small mt-1">Integrating AI into automated workflows</p>
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
          <h2 className="section-title">Works & Projects</h2>
          <p className="section-subtitle">Portfolio of projects and experiments I've created</p>
          
          <Row>
            {[
              {
                title: 'Personal Portfolio',
                desc: 'Personal portfolio website built with Next.js and Bootstrap, showcasing skills and projects.',
                img: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
                tech: ['Next.js', 'Bootstrap', 'React']
              },
              {
                title: 'Todo App',
                desc: 'Todo task management app with React and localStorage for storing task data.',
                img: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                tech: ['React', 'CSS', 'localStorage']
              },
              {
                title: 'Text Analysis Bot',
                desc: 'Python bot for analyzing sentiment from Twitter data using NLP.',
                img: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)',
                tech: ['Python', 'NLTK', 'Twitter API']
              },
              {
                title: 'Bug Documentation',
                desc: 'Documentation of the bug hunting process and security solutions from various findings.',
                img: 'linear-gradient(135deg, #0f766e, #0d9488)',
                tech: ['Markdown', 'GitHub', 'Security']
              }
            ].map((item, index) => (
              <Col lg={3} md={6} className="mb-4" key={index}>
                <Card className="h-100 shadow-sm border-subtle">
                  <div className="project-img" style={{ background: item.img }}>
                    <div className="p-3 text-white position-relative" style={{ zIndex: 2 }}>
                      <span className="badge bg-dark">Project {index + 1}</span>
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
              View more projects on GitHub <FaArrowRight className="ms-1" size={12} />
            </Link>
          </div>
        </Container>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="section-fade">
        <Container>
          <h2 className="section-title">Certificates</h2>
          <p className="section-subtitle">Official achievements and recognitions I have obtained</p>
          
          <Carousel 
            indicators={true} 
            className="certificate-carousel py-3"
            interval={5000}
            controls={true}
            pause="hover"
          >
            {[
              {
                title: '3rd Place in Journalism Competition',
                org: 'PUSPRESNAS',
                date: 'May 2023',
                desc: '3rd place in the Journalism Competition at Rokan Hulu Regency level.',
                bgColor: 'var(--accent)',
                badgeColor: 'var(--accent-hover)',
                icon: <FaCode className="cert-icon" />,
                skills: ['Journalism', 'Writing', 'Communication'],
                image: '/images/certificates/cert1.jpg'
              },
              {
                title: '3rd Place in Short Film Competition',
                org: 'PUSPRESNAS',
                date: 'May 2024',
                desc: '3rd place in the Short Film Competition at Rokan Hulu Regency level.',
                bgColor: 'var(--secondary-accent)',
                badgeColor: 'var(--secondary-accent)',
                icon: <FaShieldAlt className="cert-icon" />,
                skills: ['Film Making', 'Storytelling', 'Editing'],
                image: '/images/certificates/cert2.jpg'
              },
              {
                title: '3rd Place in OSN Informatics',
                org: 'PUSPRESNAS',
                date: 'May 2024',
                desc: '3rd place in the National Science Olympiad (Informatics) at Rokan Hulu Regency level.',
                bgColor: 'var(--accent)',
                badgeColor: 'var(--accent-hover)',
                icon: <FaBrain className="cert-icon" />,
                skills: ['Programming', 'Algorithms', 'Problem Solving'],
                image: '/images/certificates/cert3.jpg'
              },
              {
                title: 'Finalist in Indonesian Debate Competition',
                org: 'PUSPRESNAS',
                date: 'September 2024',
                desc: 'Finalist in the Indonesian Debate Competition at Riau Provincial level.',
                bgColor: 'var(--secondary-accent)',
                badgeColor: 'var(--secondary-accent)',
                icon: <FaShieldAlt className="cert-icon" />,
                skills: ['Public Speaking', 'Argumentation', 'Critical Thinking'],
                image: '/images/certificates/cert4.jpg'
              },
              {
                title: 'Zero to Hero Security Engineer',
                org: 'Siber Corner',
                date: 'October 13, 2023',
                desc: 'Comprehensive training on the basics of cyber security and Security Engineering techniques.',
                bgColor: 'var(--accent)',
                badgeColor: 'var(--accent-hover)',
                icon: <FaShieldAlt className="cert-icon" />,
                skills: ['Network Security', 'Penetration Testing', 'Vulnerability Analysis'],
                image: '/images/certificates/cert5.jpg'
              },
              {
                title: 'Geospatial Competition',
                org: 'Badan Informasi Geospasial (BIG)',
                date: 'October 19, 2023',
                desc: 'National Geospatial Competition for high school students. Participated in mapping exercises, geographic information systems (GIS), and spatial data analysis.',
                bgColor: 'var(--secondary-accent)',
                badgeColor: 'var(--secondary-accent)',
                icon: <FaLaptopCode className="cert-icon" />,
                skills: ['Mapping', 'GIS', 'Spatial Analysis'],
                image: '/images/certificates/cert6.jpg'
              }
            ].map((cert, index) => (
              <Carousel.Item key={index}>
                <Row className="justify-content-center">
                  <Col lg={10} md={10}>
                    <Card className="shadow-sm border-subtle overflow-hidden certificate-card">
                      <Card.Body className="p-0">
                        <Row className="g-0">
                          <Col md={5} className="cert-thumbnail-col position-relative">
                            <div className="cert-thumbnail-wrapper position-relative h-100">
                              {/* Certificate thumbnail background */}
                              <div className="cert-thumbnail-bg h-100" 
                                style={{
                                  background: `var(--card-bg)`,
                                  position: 'absolute',
                                  width: '100%',
                                  zIndex: 1
                                }}>
                              </div>
                              
                              {/* Certificate thumbnail image */}
                              <div className="cert-thumbnail-image h-100 w-100 position-relative" style={{ zIndex: 2 }}>
                                <div className="position-relative h-100 w-100 d-flex align-items-center justify-content-center">
                                  {/* Clean, simple certificate display - fullsize without padding */}
                                  <div className="cert-image-container" 
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      position: 'relative',
                                      overflow: 'hidden',
                                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                      cursor: 'pointer'
                                    }}
                                    onClick={() => window.open(cert.image, '_blank')}
                                    onMouseOver={(e) => {
                                      e.currentTarget.style.transform = 'translateY(-5px)';
                                      e.currentTarget.style.boxShadow = '0 12px 20px rgba(0,0,0,0.15)';
                                    }}
                                    onMouseOut={(e) => {
                                      e.currentTarget.style.transform = 'translateY(0)';
                                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                                    }}
                                  >
                                    
                                    {/* Certificate number badge */}
                                    <div style={{
                                      position: 'absolute',
                                      top: '5px',
                                      right: '5px',
                                      background: '#1f2937',
                                      color: 'white',
                                      padding: '2px 6px',
                                      borderRadius: '3px',
                                      fontSize: '10px',
                                      fontWeight: 'bold',
                                      zIndex: 3,
                                      opacity: 0.8
                                    }}>
                                      #{index + 1}
                                    </div>
                                    
                                    {/* Certificate image - full size, cover mode */}
                                    <div style={{
                                      width: '100%',
                                      height: '100%',
                                      backgroundImage: `url(${cert.image})`,
                                      backgroundSize: 'cover',
                                      backgroundPosition: 'center',
                                      backgroundRepeat: 'no-repeat'
                                    }}>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Certificate number badge */}
                              <div className="position-absolute cert-number-badge" 
                                style={{
                                  top: '10px',
                                  right: '10px',
                                  background: cert.bgColor,
                                  color: 'var(--text-bright)',
                                  padding: '4px 8px',
                                  borderRadius: '4px',
                                  fontSize: '12px',
                                  fontWeight: 'bold',
                                  zIndex: 3
                                }}>
                                #{index + 1}
                              </div>
                              
                              {/* Hover overlay with view text - make the overlay itself clickable */}
                              <div 
                                className="cert-hover-overlay" 
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  width: '100%',
                                  height: '100%',
                                  background: 'rgba(0,0,0,0.4)',
                                  opacity: 0,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  transition: 'opacity 0.3s ease',
                                  zIndex: 2,
                                  cursor: 'pointer'
                                }}
                                onClick={(e) => {
                                  e.stopPropagation(); // Prevent triggering parent click event twice
                                  window.open(cert.image, '_blank');
                                }}
                                onMouseOver={(e) => {
                                  e.currentTarget.style.opacity = '1';
                                }}
                                onMouseOut={(e) => {
                                  e.currentTarget.style.opacity = '0';
                                }}
                              >
                                <div style={{
                                  color: 'white',
                                  fontSize: '0.9rem',
                                  fontWeight: '500',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '5px'
                                }}>
                                  <FaEye size={14} /> View Full Certificate
                                </div>
                              </div>
                            </div>
                          </Col>
                          
                          <Col md={7} className="py-4 px-4">
                            {/* Organization and date */}
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <span className="fw-medium" style={{ color: cert.bgColor }}>{cert.org}</span>
                              <span className="cert-date badge" style={{ 
                                background: 'var(--bg-card-hover)', 
                                color: 'var(--text-light)' 
                              }}>
                                {cert.date}
                              </span>
                            </div>
                            
                            {/* Certificate title */}
                            <h3 className="fs-4 fw-bold mb-3">{cert.title}</h3>
                            
                            {/* Certificate description - simplified without label */}
                            <p className="mb-4">{cert.desc}</p>
                            
                            {/* Simple divider */}
                            <div style={{ height: '1px', background: `var(--border-subtle)`, marginBottom: '16px' }}></div>
                            
                            {/* Skills list - simplified without label */}
                            <div className="d-flex flex-wrap gap-2">
                              {cert.skills.map((skill, i) => (
                                <span key={i} className="badge border-0" 
                                  style={{ 
                                    fontWeight: '400',
                                    background: 'var(--bg-card-hover)',
                                    color: 'var(--text-light)'
                                  }}>
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </Col>
                        </Row>
                      </Card.Body>
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
                <h2 className="h3 mb-3">Interested in Collaboration?</h2>
                <p className="text-secondary mb-4">I'm open to internship opportunities, part-time work, and project collaborations</p>
                <div className="d-flex justify-content-center gap-3">
                  <Button variant="primary" size="lg" href="mailto:reyhan@example.com">
                    <FaEnvelope className="me-2" />
                    Contact Me
                  </Button>
                  <Button variant="outline-light" size="lg" href="/jurnal">
                    View Bug Hunting Journal
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