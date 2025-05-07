import React, { useEffect, useState, useRef, useCallback } from 'react';
import Layout from '@/components/Layout';
import { Container, Row, Col, Button, Card, ProgressBar, Carousel } from 'react-bootstrap';
import { FaEnvelope, FaWhatsapp, FaCode, FaLaptopCode, FaShieldAlt, FaGithub, FaBrain, FaArrowRight, FaEye, FaCamera, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import CertificatePlaceholder from '@/components/CertificatePlaceholder';

export default function Home() {
  const [projectTab, setProjectTab] = useState<'programming' | 'design'>('programming');
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Define programming projects
  const programmingProjects = [
    {
      title: 'DiscordBot Community v2',
      desc: 'A modular Discord bot for community servers, featuring command handling, event management, and utility functions. Built for easy customization and extension.',
      img: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
      tech: ['Node.js', 'discord.js'],
      link: 'https://github.com/Gioxaa/discordbot-community-v2'
    },
    {
      title: 'Discord SelfBot MessageScheduler',
      desc: 'A self-bot for Discord that automatically sends scheduled messages to specified channels with random delays. Supports multi-account management and webhook logging.',
      img: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
      tech: ['Node.js', 'discord.js-selfbot-v13', 'axios'],
      link: 'https://github.com/Gioxaa/Discord-SelfBot-MessageScheduler'
    },
    {
      title: 'Growtopia Online Checker Webhook',
      desc: 'A Python-based webhook tool to check the online status of Growtopia servers and send notifications. Useful for monitoring server uptime and automating alerts.',
      img: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)',
      tech: ['Python', 'Webhooks'],
      link: 'https://github.com/Gioxaa/growtopia-online-checker-webhook'
    },
    {
      title: 'Portfolio Website',
      desc: 'A modern portfolio website built with Next.js and React Bootstrap, featuring a responsive design and smooth animations.',
      img: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)',
      tech: ['Next.js', 'React', 'Bootstrap'],
      link: 'https://github.com/yourusername/portfolio'
    },
    {
      title: 'Bug Bounty Tools',
      desc: 'A collection of custom tools for bug bounty hunting and security testing, including automated scanners and report generators.',
      img: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)',
      tech: ['Python', 'Security'],
      link: 'https://github.com/yourusername/bug-bounty-tools'
    }
  ];
  
  // Number of projects to display at once
  const projectsToShow = 3;
  const maxProjectIndex = programmingProjects.length - projectsToShow;

  // Calculate if scroll arrows should be visible
  const updateScrollArrows = useCallback(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const isScrollable = container.scrollWidth > container.clientWidth;
      
      // Show left arrow only if not at the start and content is scrollable
      setShowLeftArrow(container.scrollLeft > 20 && isScrollable);
      
      // Show right arrow only if not at the end and content is scrollable
      const isAtEnd = Math.ceil(container.scrollLeft + container.clientWidth) >= container.scrollWidth - 20;
      setShowRightArrow(isScrollable && !isAtEnd);
    }
  }, []);

  // Handle scroll navigation with enhanced behavior
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const viewportWidth = container.clientWidth;
      const cardWidth = 320 + 24; // card width + gap
      
      // Calculate scroll amount - full card width or partial for smoother experience
      let scrollAmount;
      
      if (direction === 'left') {
        // Scroll left by one card, but if near the start, go to the very start
        scrollAmount = container.scrollLeft < cardWidth ? -container.scrollLeft : -cardWidth;
      } else {
        // Scroll right by one card, but if near the end, go to the very end
        const remainingScroll = container.scrollWidth - (container.scrollLeft + container.clientWidth);
        scrollAmount = remainingScroll < cardWidth ? remainingScroll : cardWidth;
      }
      
      // Smooth scroll to new position
      container.scrollTo({
        left: container.scrollLeft + (direction === 'left' ? scrollAmount : scrollAmount),
        behavior: 'smooth'
      });
      
      // Update scroll position for UI updates
      setTimeout(() => {
        setScrollPosition(container.scrollLeft);
        updateScrollArrows();
      }, 400); // After animation completes
    }
  };

  // Listen for scroll events
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const handleScrollEvent = () => {
        setScrollPosition(container.scrollLeft);
        updateScrollArrows();
      };
      
      // Handle mouse wheel scrolling
      const handleWheel = (e: WheelEvent) => {
        // Only scroll horizontally when Shift key is pressed
        if (e.shiftKey) {
          e.preventDefault();
          
          // Determine scroll direction and amount
          const scrollAmount = e.deltaY > 0 ? 100 : -100;
          
          // Scroll horizontally based on vertical mouse wheel
          container.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
          });
        }
        // Otherwise, normal vertical scrolling is allowed
      };
      
      // Initial update
      updateScrollArrows();
      
      // Add scroll event listener
      container.addEventListener('scroll', handleScrollEvent);
      
      // Add wheel event listener with passive: false to allow preventDefault
      container.addEventListener('wheel', handleWheel, { passive: false });
      
      // Add resize listener to update arrows on window resize
      window.addEventListener('resize', updateScrollArrows);
      
      return () => {
        container.removeEventListener('scroll', handleScrollEvent);
        container.removeEventListener('wheel', handleWheel);
        window.removeEventListener('resize', updateScrollArrows);
      };
    }
  }, [updateScrollArrows]);

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
              <div className="hero-illustration">
                {/* Modern illustration of developer */}
                <div className="illustration-container">
                  <div className="character-illustration">
                    <svg width="480" height="400" viewBox="0 0 580 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Background elements */}
                      <circle cx="240" cy="200" r="120" fill="rgba(79, 70, 229, 0.1)" />
                      <circle cx="240" cy="200" r="80" fill="rgba(14, 165, 233, 0.1)" />
                      
                      {/* Target/Circle */}
                      <circle cx="150" cy="220" r="50" fill="none" stroke="#000922" strokeWidth="2" />
                      <circle cx="150" cy="220" r="25" fill="none" stroke="#000922" strokeWidth="2" />
                      <line x1="150" y1="170" x2="150" y2="270" stroke="#000922" strokeWidth="2" />
                      <line x1="100" y1="220" x2="200" y2="220" stroke="#000922" strokeWidth="2" />
                      
                      {/* Cloud elements */}
                      <path d="M380 150 C380 130 400 120 420 130 C425 115 450 115 455 130 C470 125 485 135 485 150 C485 165 465 175 440 170 C435 180 410 180 405 170 C390 175 380 165 380 150Z" fill="#E4D7F9" />
                      <path d="M330 320 C330 305 345 298 360 305 C364 293 383 293 387 305 C398 301 410 308 410 320 C410 331 395 339 376 335 C372 343 353 343 349 335 C338 339 330 331 330 320Z" fill="#E4D7F9" />
                      
                      {/* Character */}
                      <path d="M240 180 C240 150 270 130 310 150 C330 120 380 130 380 180 L370 250 L250 260 L240 180Z" fill="#7C3AED" />
                      <rect x="250" y="200" width="100" height="140" rx="10" fill="#4338CA" />
                      <path d="M300 210 C320 210 330 230 330 270 C330 310 320 340 300 340 C280 340 270 310 270 270 C270 230 280 210 300 210Z" fill="#7C3AED" />
                      
                      {/* Face */}
                      <circle cx="300" cy="190" r="30" fill="#FFD580" />
                      <ellipse cx="290" cy="185" rx="3" ry="4" fill="#000" />
                      <ellipse cx="310" cy="185" rx="3" ry="4" fill="#000" />
                      <path d="M295 200 C300 205 305 205 310 200" stroke="#000" strokeWidth="2" strokeLinecap="round" />
                      
                      {/* Arms */}
                      <path d="M250 220 C230 230 220 250 230 280" stroke="#F1C27D" strokeWidth="10" strokeLinecap="round" />
                      <path d="M350 220 C370 220 380 270 370 300" stroke="#F1C27D" strokeWidth="10" strokeLinecap="round" />
                      
                      {/* Hands with coding/computer gestures */}
                      <rect x="220" y="280" width="20" height="30" rx="5" fill="#FFD580" />
                      <rect x="360" y="300" width="20" height="30" rx="5" fill="#FFD580" />
                      
                      {/* Computer */}
                      <rect x="250" y="310" width="100" height="70" rx="5" fill="#1E293B" />
                      <rect x="255" y="315" width="90" height="50" rx="2" fill="#38BDF8" />
                      <rect x="270" y="380" width="60" height="5" rx="2" fill="#1E293B" />
                      <rect x="295" y="375" width="10" height="5" rx="2" fill="#1E293B" />
                      
                      {/* Code symbols on screen */}
                      <path d="M270 330 L290 345 L270 360" stroke="#FFFFFF" strokeWidth="2" />
                      <path d="M330 330 L310 345 L330 360" stroke="#FFFFFF" strokeWidth="2" />
                      <line x1="305" y1="325" x2="295" y2="365" stroke="#FFFFFF" strokeWidth="2" />
                    </svg>
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

          {/* Tabs for Programming and Design */}
          <div className="d-flex mb-4" style={{ gap: '1rem' }}>
            <button
              className={`btn ${projectTab === 'programming' ? 'btn-primary' : 'btn-outline-light'}`}
              style={{ minWidth: 120 }}
              onClick={() => setProjectTab('programming')}
            >
              Programming
            </button>
            <button
              className={`btn ${projectTab === 'design' ? 'btn-primary' : 'btn-outline-light'}`}
              style={{ minWidth: 120 }}
              onClick={() => setProjectTab('design')}
            >
              Design
            </button>
          </div>

          {/* Programming Projects Carousel/Scroll */}
          {projectTab === 'programming' && (
            <div className="project-carousel-container position-relative">
              {/* Left Arrow - show only when scrolled */}
              <button 
                className={`project-scroll-arrow project-scroll-left ${showLeftArrow ? 'visible' : ''}`}
                onClick={() => handleScroll('left')}
                aria-label="Previous projects"
              >
                <FaChevronLeft />
              </button>
              
              {/* Right Arrow - hide when at end */}
              <button 
                className={`project-scroll-arrow project-scroll-right ${showRightArrow ? 'visible' : ''}`}
                onClick={() => handleScroll('right')}
                aria-label="Next projects"
              >
                <FaChevronRight />
              </button>
              
              {/* Projects container with horizontal scroll */}
              <div 
                ref={scrollContainerRef}
                className="projects-scroll-container"
                style={{ 
                  overflowX: 'auto',  // Change from 'hidden' to 'auto' to enable mouse/touch scroll
                  whiteSpace: 'nowrap',
                  paddingBottom: 16,
                  scrollbarWidth: 'none', // Hide scrollbar for Firefox
                  msOverflowStyle: 'none', // Hide scrollbar for IE/Edge
                  WebkitOverflowScrolling: 'touch', // Enable smooth scrolling on iOS
                }}
              >
                <div style={{ display: 'inline-flex', gap: 24, minWidth: '100%' }}>
                  {[
                    {
                      title: 'DiscordBot Community v2',
                      desc: 'A modular Discord bot for community servers, featuring command handling, event management, and utility functions. Built for easy customization and extension.',
                      img: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
                      tech: ['Node.js', 'discord.js'],
                      link: 'https://github.com/Gioxaa/discordbot-community-v2'
                    },
                    {
                      title: 'Discord SelfBot MessageScheduler',
                      desc: 'A self-bot for Discord that automatically sends scheduled messages to specified channels with random delays. Supports multi-account management and webhook logging.',
                      img: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                      tech: ['Node.js', 'discord.js-selfbot-v13', 'axios'],
                      link: 'https://github.com/Gioxaa/Discord-SelfBot-MessageScheduler'
                    },
                    {
                      title: 'Growtopia Online Checker Webhook',
                      desc: 'A Python-based webhook tool to check the online status of Growtopia servers and send notifications. Useful for monitoring server uptime and automating alerts.',
                      img: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)',
                      tech: ['Python', 'Webhooks'],
                      link: 'https://github.com/Gioxaa/growtopia-online-checker-webhook'
                    },
                    {
                      title: 'Portfolio Website',
                      desc: 'A modern portfolio website built with Next.js and React Bootstrap, featuring a responsive design and smooth animations.',
                      img: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)',
                      tech: ['Next.js', 'React', 'Bootstrap'],
                      link: 'https://github.com/yourusername/portfolio'
                    },
                    {
                      title: 'Bug Bounty Tools',
                      desc: 'A collection of custom tools for bug bounty hunting and security testing, including automated scanners and report generators.',
                      img: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)',
                      tech: ['Python', 'Security'],
                      link: 'https://github.com/yourusername/bug-bounty-tools'
                    }
                  ].map((item, index, arr) => (
                    <div
                      key={index}
                      style={{
                        minWidth: 280,
                        maxWidth: 320,
                        width: 320,
                        flex: arr.length > 4 ? '0 0 320px' : undefined
                      }}
                    >
                      <Card className="h-100 shadow-sm border-subtle project-card">
                        <div className="project-img" style={{ background: item.img }}>
                          <div className="p-3 text-white position-relative" style={{ zIndex: 2 }}>
                            <span className="badge bg-dark">Project {index + 1}</span>
                          </div>
                        </div>
                        <Card.Body>
                          <Card.Title className="fw-bold h5 mb-2" style={{ wordBreak: 'break-word', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal' }}>{item.title}</Card.Title>
                          <Card.Text className="text-secondary mb-3 small" style={{ wordBreak: 'break-word', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal' }}>
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
                            <Button variant="outline-primary" size="sm" className="btn-touch-effect" as="a" href={item.link} target="_blank" rel="noopener noreferrer">
                              GitHub <FaGithub className="ms-1" size={12} />
                            </Button>
                          </div>
                        </Card.Footer>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Scroll indicator dots */}
              <div className="scroll-indicator-dots">
                {Array.from({ length: programmingProjects.length }, (_, i) => (
                  <button 
                    key={i}
                    className={`scroll-dot ${scrollPosition > i * 320 * 0.7 ? 'active' : ''}`}
                    onClick={() => {
                      if (scrollContainerRef.current) {
                        scrollContainerRef.current.scrollTo({
                          left: i * 320,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    aria-label={`Scroll to project ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Design Projects Section (simplified) */}
          {projectTab === 'design' && (
            <div className="design-projects-container">
              <Row className="g-4 justify-content-center">
                {[
                  {
                    title: "School Magazine Cover",
                    desc: "Cover design for annual school magazine featuring dynamic composition and typography.",
                    category: "Print Design",
                    tools: ["Photoshop", "Illustrator"],
                    color: "linear-gradient(135deg, #4F46E5, #7C3AED)",
                    image: "/images/certificates/cert1.jpg"
                  },
                  {
                    title: "Photography Exhibition Poster",
                    desc: "Promotional poster for the Rokan Hulu Photography Community's annual exhibition.",
                    category: "Poster Design",
                    tools: ["Photoshop", "Canva"],
                    color: "linear-gradient(135deg, #0EA5E9, #3B82F6)",
                    image: "/images/certificates/cert.jpg"
                  },
                  {
                    title: "Climate Change Infographic",
                    desc: "Educational infographic about climate change impacts in Indonesia for school project.",
                    category: "Information Design",
                    tools: ["Illustrator", "Figma"],
                    color: "linear-gradient(135deg, #10B981, #059669)",
                    image: "/images/certificates/cert.jpg"
                  },
                  {
                    title: "OSIS Logo Redesign",
                    desc: "Modern refresh of the OSIS organization logo while maintaining its core identity.",
                    category: "Logo Design",
                    tools: ["Illustrator"],
                    color: "linear-gradient(135deg, #F59E0B, #D97706)",
                    image: "/images/certificates/cert.jpg"
                  },
                  {
                    title: "School Event Social Media Kit",
                    desc: "Comprehensive social media graphics package for school festival promotion.",
                    category: "Digital Design",
                    tools: ["Photoshop", "Canva"],
                    color: "linear-gradient(135deg, #EC4899, #DB2777)",
                    image: "/images/certificates/cert.jpg"
                  },
                  {
                    title: "Journalism Club Website UI",
                    desc: "Modern UI design concept for the school's journalism club website.",
                    category: "UI Design",
                    tools: ["Figma", "Photoshop"],
                    color: "linear-gradient(135deg, #8B5CF6, #6D28D9)",
                    image: "/images/certificates/cert.jpg"
                  }
                ].map((design, index) => (
                  <Col lg={4} md={6} key={index} className={index >= 3 ? "d-flex justify-content-center" : ""}>
                    <div className="design-card">
                      <div 
                        className="design-thumbnail" 
                        style={{ 
                          backgroundImage: `linear-gradient(to bottom, 
                            rgba(0,0,0,0.3) 0%, 
                            rgba(0,0,0,0.4) 30%,
                            rgba(0,0,0,0.7) 60%,
                            rgba(0,0,0,0.85) 100%), 
                            url(${design.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      >
                        {/* Design number badge */}
                        <div className="design-number">#{index + 1}</div>
                        
                        {/* Category badge */}
                        <div className="design-category">{design.category}</div>
                        
                        {/* Title and description in bottom */}
                        <div className="design-content">
                          <h3 className="design-title">{design.title}</h3>
                          <p className="design-desc">{design.desc}</p>
                          <div className="d-flex flex-wrap gap-1 mt-2">
                            {design.tools.map((tool, i) => (
                              <span key={i} className="design-tool-badge">{tool}</span>
                            ))}
                          </div>
                          <button className="design-view-btn mt-3">
                            View Details <FaArrowRight className="ms-1" size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          )}

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

      {/* Add styles for the illustration */}
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
        
        /* Projects carousel styling */
        .project-carousel-container {
          position: relative;
          padding: 10px 0 45px;
        }
        
        .project-scroll-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          background: var(--bg-card);
          border-radius: 50%;
          border: 1px solid var(--border-subtle);
          color: var(--text-light);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          cursor: pointer;
          opacity: 0;
          visibility: hidden;
        }
        
        .project-scroll-arrow.visible {
          opacity: 1;
          visibility: visible;
        }
        
        .project-scroll-arrow:hover {
          background: var(--accent);
          color: white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
          transform: translateY(-50%) scale(1.05);
        }
        
        .project-scroll-arrow:active {
          transform: translateY(-50%) scale(0.95);
        }
        
        .project-scroll-left {
          left: -20px;
        }
        
        .project-scroll-right {
          right: -20px;
        }
        
        .projects-scroll-container::-webkit-scrollbar {
          display: none; /* Hide scrollbar for Chrome/Safari/Opera */
        }
        
        .project-img {
          height: 150px;
          background-image: var(--subtle-gradient);
          position: relative;
          overflow: hidden;
        }
        
        .project-img::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.2);
        }
        
        .project-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .project-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2) !important;
        }
        
        /* Scroll indicator dots */
        .scroll-indicator-dots {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin-top: 15px;
        }
        
        .scroll-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--border-subtle);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .scroll-dot.active {
          background: var(--accent);
          transform: scale(1.2);
        }
        
        /* Design cards styling - simplified */
        .design-projects-container {
          padding: 1rem 0;
        }
        
        .design-card {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          height: 320px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .design-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
        
        .design-thumbnail {
          width: 100%;
          height: 100%;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
        
        .design-number {
          position: absolute;
          top: 15px;
          left: 15px;
          background: rgba(0, 0, 0, 0.6);
          color: white;
          font-size: 12px;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 4px;
          z-index: 2;
        }
        
        .design-category {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(255, 255, 255, 0.9);
          color: #111;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 4px 10px;
          border-radius: 20px;
          z-index: 2;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .design-content {
          padding: 20px;
          color: white;
        }
        
        .design-title {
          color: white;
          font-weight: 600;
          font-size: 18px;
          margin: 0 0 8px 0;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        }
        
        .design-desc {
          font-size: 13px;
          opacity: 0.9;
          margin-bottom: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .design-tool-badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 11px;
          backdrop-filter: blur(2px);
        }
        
        .design-view-btn {
          background: rgba(255, 255, 255, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.5);
          color: white;
          border-radius: 6px;
          padding: 6px 12px;
          font-size: 12px;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        
        .design-view-btn:hover {
          background: rgba(255, 255, 255, 0.35);
          transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
          .design-card {
            height: 280px;
          }
          
          .design-desc {
            -webkit-line-clamp: 1;
          }
        }

        /* Project cards touch scrolling */
        .projects-scroll-container {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
          -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
          scroll-behavior: smooth;
          cursor: grab;
        }

        .projects-scroll-container:active {
          cursor: grabbing;
        }

        .projects-scroll-container::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }

        /* Character illustration styles */
        .hero-illustration {
          position: relative;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: visible;
        }
        
        .illustration-container {
          position: relative;
          width: 100%;
          max-width: 500px;
          margin: 0 auto;
          overflow: visible;
        }
        
        .character-illustration {
          width: 100%;
          height: auto;
          transform-origin: center;
          animation: float 6s ease-in-out infinite;
          overflow: visible;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @media (max-width: 768px) {
          .character-illustration svg {
            width: 120%;
            height: auto;
            transform: translateX(-80px); /* Shift left by 30px on mobile */
          }
          
          .hero-illustration, 
          .illustration-container,
          .character-illustration {
            overflow: visible;
          }
        }
      `}</style>
    </Layout>
  );
} 