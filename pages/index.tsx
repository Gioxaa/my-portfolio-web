import React, { useEffect, useState, useRef, useCallback } from 'react';
import Layout from '@/components/Layout';
import { Container, Row, Col, Button, Card, ProgressBar, Carousel } from 'react-bootstrap';
import { FaEnvelope, FaWhatsapp, FaCode, FaLaptopCode, FaShieldAlt, FaGithub, FaBrain, FaArrowRight, FaEye, FaCamera, FaChevronLeft, FaChevronRight, FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaNpm, FaDatabase, FaAws, FaPython, FaUbuntu, FaServer, FaFileDownload } from 'react-icons/fa';
import { SiMysql, SiMongodb, SiPostgresql } from 'react-icons/si';
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
                <Button variant="outline-light" href="https://github.com/yourusername" target="_blank" className="btn-touch-effect">
                  <FaGithub className="me-2" />
                  GitHub
                </Button>
                <a href="/files/cv-muhammad-reyhan.pdf" download className="btn btn-outline-primary btn-touch-effect">
                  <FaFileDownload className="me-2" />
                  Resume
                </a>
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

      {/* About Section - Simplified and Improved */}
      <section id="about" className="section-fade">
        <Container fluid className="px-lg-5">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">My journey from self-taught learning to becoming a developer</p>
          
          <Row className="justify-content-center">
            <Col lg={12}>
              <Card className="border-subtle shadow-lg about-card">
                <Card.Body className="p-4 p-md-5">
                  {/* Education and Organizations in Grid Layout */}
                  <Row className="mb-4 gy-4">
                    {/* Education Column */}
                    <Col md={4} lg={3}>
                      <div className="about-category-card-static">
                        <div className="about-category-header">
                          <div className="about-category-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 1L3 5V9C3 14.55 6.84 19.74 12 21C17.16 19.74 21 14.55 21 9V5L12 1ZM12 7C13.1 7 14 7.9 14 9C14 10.1 13.1 11 12 11C10.9 11 10 10.1 10 9C10 7.9 10.9 7 12 7ZM17 16H7V15C7 13.34 10.33 12.5 12 12.5C13.67 12.5 17 13.34 17 15V16Z" fill="currentColor"/>
                            </svg>
                          </div>
                          <h3 className="about-category-title">Education</h3>
                        </div>
                        <div className="about-category-content">
                          <p className="mb-2 fw-bold">SMA Negeri 2 Rambah Hilir</p>
                          <p className="text-bright small">High School Graduate</p>
                        </div>
                      </div>
                    </Col>

                    {/* Organizations Column */}
                    <Col md={8} lg={9}>
                      <div className="about-category-card-static h-100">
                        <div className="about-category-header">
                          <div className="about-category-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 12.75C13.63 12.75 15.07 13.14 16.24 13.65C17.32 14.13 18 15.21 18 16.38V18H6V16.39C6 15.21 6.68 14.13 7.76 13.66C8.93 13.14 10.37 12.75 12 12.75ZM4 13C5.1 13 6 12.1 6 11C6 9.9 5.1 9 4 9C2.9 9 2 9.9 2 11C2 12.1 2.9 13 4 13ZM5.13 14.1C4.76 14.04 4.39 14 4 14C3.01 14 2.07 14.21 1.22 14.58C0.48 14.9 0 15.62 0 16.43V18H4.5V16.39C4.5 15.56 4.73 14.78 5.13 14.1ZM20 13C21.1 13 22 12.1 22 11C22 9.9 21.1 9 20 9C18.9 9 18 9.9 18 11C18 12.1 18.9 13 20 13ZM24 16.43C24 15.62 23.52 14.9 22.78 14.58C21.93 14.21 20.99 14 20 14C19.61 14 19.24 14.04 18.87 14.1C19.27 14.78 19.5 15.56 19.5 16.39V18H24V16.43ZM12 6C13.66 6 15 7.34 15 9C15 10.66 13.66 12 12 12C10.34 12 9 10.66 9 9C9 7.34 10.34 6 12 6Z" fill="currentColor"/>
                            </svg>
                          </div>
                          <h3 className="about-category-title">Organization Experience</h3>
                        </div>
                        <div className="about-category-content">
                          <Row className="g-3">
                            <Col md={4}>
                              <div className="org-card-static">
                                <h4 className="h6 fw-bold mb-1">Secretary OSIS</h4>
                                <p className="small mb-0">OSIS SMA Negeri 2 Rambah Hilir<br/>(Oct '23 - Nov '24)</p>
                              </div>
                            </Col>
                            <Col md={4}>
                              <div className="org-card-static">
                                <h4 className="h6 fw-bold mb-1">Head of Computer Journalism</h4>
                                <p className="small mb-0">Computer Journalism Club<br/>(Oct '22 - Nov '24)</p>
                              </div>
                            </Col>
                            <Col md={4}>
                              <div className="org-card-static">
                                <h4 className="h6 fw-bold mb-1">Member</h4>
                                <p className="small mb-0">SMANung Intelligence Team<br/>(Oct '22 - Nov '23)</p>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  
                  {/* Achievements Section */}
                  <div className="mt-4">
                    <div className="about-category-header mb-4">
                      <div className="about-category-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15 9H9V11H15V9ZM15 6H9V8H15V6ZM18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L14.91 16.07C15.14 15.44 15.14 14.75 14.91 14.12L16.11 13.21C16.62 13.68 17.29 13.97 18.03 13.97C19.66 13.97 21 12.63 21 11C21 9.37 19.66 8.03 18.03 8.03C16.97 8.03 16.06 8.56 15.5 9.39L14.87 9.05C14.92 8.7 14.92 8.34 14.87 8L15.55 7.6C16.1 8.35 16.97 8.83 17.97 8.83C19.38 8.83 20.54 7.67 20.54 6.26C20.54 4.85 19.38 3.69 17.97 3.69C16.56 3.69 15.4 4.85 15.4 6.26C15.4 6.71 15.5 7.14 15.68 7.52L15.01 7.9C14.68 7.75 14.35 7.64 14 7.56V6.21C15.16 5.88 16 4.81 16 3.54C16 2.13 14.87 1 13.46 1C12.05 1 10.92 2.13 10.92 3.54C10.92 4.82 11.77 5.89 12.93 6.21V7.58C12.58 7.66 12.24 7.78 11.92 7.94L11.3 7.58C11.5 7.16 11.61 6.7 11.61 6.21C11.61 4.69 10.37 3.45 8.85 3.45C7.33 3.45 6.09 4.69 6.09 6.21C6.09 7.73 7.33 8.97 8.85 8.97C9.74 8.97 10.54 8.58 11.08 7.93L11.73 8.3C11.63 8.66 11.6 9.04 11.6 9.42C11.6 9.8 11.63 10.18 11.72 10.54L9.38 12.04C8.82 11.43 8 11.05 7.08 11.05C5.46 11.05 4.15 12.36 4.15 13.98C4.15 15.6 5.47 16.91 7.09 16.91C8.53 16.91 9.74 15.85 9.95 14.46L12.4 12.84C12.6 13.02 12.81 13.19 13.04 13.34L11.9 14.13C11.39 13.66 10.73 13.38 10 13.38C8.34 13.38 7 14.72 7 16.38C7 18.04 8.34 19.38 10 19.38C11.66 19.38 13 18.04 13 16.38C13 16.1 12.97 15.83 12.91 15.57L14.08 14.76C14.62 15.16 15.3 15.38 16 15.38C16.7 15.38 17.38 15.16 17.92 14.76L19.09 15.57C19.03 15.83 19 16.1 19 16.38C19 18.04 20.34 19.38 22 19.38C23.66 19.38 25 18.04 25 16.38C25 14.72 23.66 13.38 22 13.38C21.27 13.38 20.61 13.66 20.09 14.13L18.96 13.34C19.19 13.19 19.4 13.02 19.59 12.84L22.04 14.46C22.26 15.85 23.47 16.91 24.91 16.91C26.53 16.91 27.85 15.6 27.85 13.98C27.85 12.36 26.54 11.05 24.92 11.05C24 11.05 23.17 11.43 22.62 12.04L20.28 10.54C20.37 10.18 20.4 9.8 20.4 9.42C20.4 9.04 20.37 8.66 20.27 8.3L20.92 7.93C21.46 8.58 22.26 8.97 23.15 8.97C24.67 8.97 25.91 7.73 25.91 6.21C25.91 4.69 24.67 3.45 23.15 3.45C21.63 3.45 20.39 4.69 20.39 6.21C20.39 6.7 20.5 7.16 20.7 7.58L20.08 7.94C19.76 7.78 19.41 7.66 19.07 7.58V6.21C20.23 5.89 21.08 4.82 21.08 3.54C21.08 2.13 19.95 1 18.54 1C17.13 1 16 2.13 16 3.54C16 4.81 16.84 5.88 18 6.21V7.56C17.66 7.64 17.32 7.75 17 7.9L16.32 7.52C16.5 7.14 16.6 6.71 16.6 6.26C16.6 4.85 15.44 3.69 14.03 3.69C12.62 3.69 11.46 4.85 11.46 6.26C11.46 7.67 12.62 8.83 14.03 8.83C15.03 8.83 15.9 8.35 16.45 7.6L17.13 8C17.09 8.34 17.09 8.7 17.13 9.05L16.5 9.39C15.94 8.56 15.03 8.03 13.97 8.03C12.34 8.03 11 9.37 11 11C11 12.63 12.34 13.97 13.97 13.97C14.7 13.97 15.38 13.68 15.89 13.21L17.09 14.12C16.86 14.75 16.86 15.44 17.09 16.07L15.96 16.85C15.44 16.38 14.76 16.08 14 16.08C11.24 16.08 9 18.32 9 21.08V23H23V21.08C23 18.32 20.76 16.08 18 16.08Z" fill="currentColor"/>
                        </svg>
                      </div>
                      <h3 className="about-category-title">Key Achievements</h3>
                    </div>
                    
                    <div className="achievements-container">
                      <Row className="g-3">
                        {[
                          { 
                            number: 1, 
                            title: "3rd Place in Journalism Competition", 
                            details: "Rokan Hulu Regency Level (May 2023)" 
                          },
                          { 
                            number: 2, 
                            title: "3rd Place in Short Film Competition", 
                            details: "Rokan Hulu Regency Level (May 2024)" 
                          },
                          { 
                            number: 3, 
                            title: "3rd Place in OSN Informatics", 
                            details: "Rokan Hulu Regency Level (May 2024)" 
                          },
                          { 
                            number: 4, 
                            title: "Finalist in Indonesian Debate Competition", 
                            details: "Riau Provincial Level (September 2024)" 
                          }
                        ].map((achievement, index) => (
                          <Col sm={6} md={3} key={index}>
                            <div className="achievement-card-static">
                              <div className="achievement-number">{achievement.number}</div>
                              <div className="achievement-content">
                                <h4 className="achievement-title">{achievement.title}</h4>
                                <p className="achievement-details">{achievement.details}</p>
                              </div>
                            </div>
                          </Col>
                        ))}
                      </Row>
                    </div>
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
            <Col lg={5} md={6} className="mb-4">
              <Card className="h-100 shadow-sm border-subtle">
                <Card.Body className="d-flex flex-column">
                  <div className="text-center mb-3">
                    <FaCode className="skill-icon mb-2" />
                    <h3 className="h4">Programming</h3>
                  </div>
                  <div className="mb-3 flex-grow-1">
                    <div className="tech-skills-container">
                      <div className="tech-skills-grid">
                        <div className="tech-skill-item">
                          <div className="tech-skill-icon">
                            <FaHtml5 />
                          </div>
                          <div className="tech-skill-name">HTML5</div>
                        </div>
                        <div className="tech-skill-item">
                          <div className="tech-skill-icon">
                            <FaCss3Alt />
                          </div>
                          <div className="tech-skill-name">CSS3</div>
                        </div>
                        <div className="tech-skill-item">
                          <div className="tech-skill-icon">
                            <FaJs />
                          </div>
                          <div className="tech-skill-name">JavaScript</div>
                        </div>
                        <div className="tech-skill-item">
                          <div className="tech-skill-icon">
                            <FaReact />
                          </div>
                          <div className="tech-skill-name">React</div>
                        </div>
                        <div className="tech-skill-item">
                          <div className="tech-skill-icon">
                            <FaNodeJs />
                          </div>
                          <div className="tech-skill-name">Node.js</div>
                        </div>
                        <div className="tech-skill-item">
                          <div className="tech-skill-icon">
                            <FaNpm />
                          </div>
                          <div className="tech-skill-name">npm</div>
                        </div>
                        <div className="tech-skill-item">
                          <div className="tech-skill-icon">
                            <SiMysql />
                          </div>
                          <div className="tech-skill-name">MySQL</div>
                        </div>
                        <div className="tech-skill-item">
                          <div className="tech-skill-icon">
                            <SiMongodb />
                          </div>
                          <div className="tech-skill-name">MongoDB</div>
                        </div>
                        <div className="tech-skill-item">
                          <div className="tech-skill-icon">
                            <FaAws />
                          </div>
                          <div className="tech-skill-name">AWS</div>
                        </div>
                        <div className="tech-skill-item">
                          <div className="tech-skill-icon">
                            <FaPython />
                          </div>
                          <div className="tech-skill-name">Python</div>
                        </div>
                        <div className="tech-skill-item">
                          <div className="tech-skill-icon">
                            <FaUbuntu />
                          </div>
                          <div className="tech-skill-name">Ubuntu</div>
                        </div>
                        <div className="tech-skill-item">
                          <div className="tech-skill-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="24" height="24" fill="currentColor">
                              <path d="M640 264v-16c0-8.84-7.16-16-16-16H344v-40h72c17.67 0 32-14.33 32-32V32c0-17.67-14.33-32-32-32H224c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h72v40H16c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h104v40H64c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h160c17.67 0 32-14.33 32-32V352c0-17.67-14.33-32-32-32h-56v-40h304v40h-56c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h160c17.67 0 32-14.33 32-32V352c0-17.67-14.33-32-32-32h-56v-40h104c8.84 0 16-7.16 16-16zM256 128V64h128v64H256zm-64 320H96v-64h96v64zm352 0h-96v-64h96v64z"/>
                            </svg>
                          </div>
                          <div className="tech-skill-name">Network</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="small text-secondary">Proficient in multiple programming languages and frameworks with focus on web development. Experienced in both frontend and backend technologies with practical application in real projects.</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={7} md={6} className="mb-4">
              <Card className="h-100 shadow-sm border-subtle">
                <Card.Body className="d-flex flex-column">
                  <div className="text-center mb-3">
                    <FaShieldAlt className="skill-icon mb-2" />
                    <h3 className="h4">Cybersecurity</h3>
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex flex-wrap mb-3">
                      {['SQL Injection', 'IDOR', 'File Upload Bypass', 'CSRF Token Reuse', 'SSRF', 'Predictive Hash', 'Error Disclosure', 'XSS Attack', 'Security Headers'].map((skill) => (
                        <span key={skill} className="skill-badge">
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <div className="cybersec-skills-container">
                      <Row className="g-3">
                        <Col md={6}>
                          <div className="cybersec-skill-item">
                            <div className="d-flex align-items-center">
                              <div className="cybersec-skill-icon me-3">
                                <FaShieldAlt />
                              </div>
                              <div>
                                <h5 className="h6 mb-1">Vulnerability Assessment</h5>
                                <p className="small mb-0">Identifying and categorizing security vulnerabilities in web applications</p>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="cybersec-skill-item">
                            <div className="d-flex align-items-center">
                              <div className="cybersec-skill-icon me-3">
                                <FaCode />
                              </div>
                              <div>
                                <h5 className="h6 mb-1">Exploit Development</h5>
                                <p className="small mb-0">Creating proof-of-concept exploits for identified vulnerabilities</p>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="cybersec-skill-item">
                            <div className="d-flex align-items-center">
                              <div className="cybersec-skill-icon me-3">
                                <FaServer />
                              </div>
                              <div>
                                <h5 className="h6 mb-1">Server Protection</h5>
                                <p className="small mb-0">Implementing security measures to protect server infrastructure</p>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="cybersec-skill-item">
                            <div className="d-flex align-items-center">
                              <div className="cybersec-skill-icon me-3">
                                <SiMysql />
                              </div>
                              <div>
                                <h5 className="h6 mb-1">Database Security</h5>
                                <p className="small mb-0">Securing database systems against injection and unauthorized access</p>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="cybersec-skill-item">
                            <div className="d-flex align-items-center">
                              <div className="cybersec-skill-icon me-3">
                                <FaCode />
                              </div>
                              <div>
                                <h5 className="h6 mb-1">Exploit Prevention</h5>
                                <p className="small mb-0">Implementing protective measures against common exploit techniques</p>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="cybersec-skill-item">
                            <div className="d-flex align-items-center">
                              <div className="cybersec-skill-icon me-3">
                                <FaShieldAlt />
                              </div>
                              <div>
                                <h5 className="h6 mb-1">Security Auditing</h5>
                                <p className="small mb-0">Performing systematic evaluations of web application security controls</p>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    
                    <div className="mt-3">
                      <p className="small text-secondary">I focus on web application security and ethical penetration testing, following responsible disclosure principles when finding security vulnerabilities.</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={12} className="mb-4">
              <Card className="shadow-sm border-subtle">
                <Card.Body>
                  <div className="text-center mb-3">
                    <FaBrain className="skill-icon mb-2" />
                    <h3 className="h4">Prompt Engineering</h3>
                  </div>
                  
                  <div className="prompt-skills-container">
                    <Row className="g-3">
                      <Col md={6}>
                        <div className="prompt-skill-item">
                          <div className="d-flex align-items-center">
                            <div className="prompt-skill-icon me-3">
                              <FaBrain />
                            </div>
                            <div>
                              <h5 className="h6 mb-1">ChatGPT Prompt Design</h5>
                              <p className="small mb-0">Creating complex prompt structures and optimizing context window usage for better results</p>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="prompt-skill-item">
                          <div className="d-flex align-items-center">
                            <div className="prompt-skill-icon me-3">
                              <FaCode />
                            </div>
                            <div>
                              <h5 className="h6 mb-1">AI Output Optimization</h5>
                              <p className="small mb-0">Designing prompts that generate structured and consistent responses for specific tasks</p>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="prompt-skill-item">
                          <div className="d-flex align-items-center">
                            <div className="prompt-skill-icon me-3">
                              <FaServer />
                            </div>
                            <div>
                              <h5 className="h6 mb-1">Complex Prompt Systems</h5>
                              <p className="small mb-0">Building multi-level instruction systems for advanced AI interactions and workflows</p>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="prompt-skill-item">
                          <div className="d-flex align-items-center">
                            <div className="prompt-skill-icon me-3">
                              <FaLaptopCode />
                            </div>
                            <div>
                              <h5 className="h6 mb-1">AI Task Automation</h5>
                              <p className="small mb-0">Integrating AI models into automated workflows for efficient process execution</p>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  
                  <div className="mt-3">
                    <p className="small text-secondary">Specialized in designing structured AI prompts to extract optimal output from language models like ChatGPT and Gemini. Experienced in developing prompt systems for specific use cases and applications.</p>
                  </div>
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
                  paddingTop: 10, // Add padding to top to prevent cutoff
                  scrollbarWidth: 'none', // Hide scrollbar for Firefox
                  msOverflowStyle: 'none', // Hide scrollbar for IE/Edge
                  WebkitOverflowScrolling: 'touch', // Enable smooth scrolling on iOS
                }}
              >
                <div style={{ display: 'inline-flex', gap: 24, minWidth: '100%', padding: '8px 4px' }}> {/* Add padding around cards */}
                  {programmingProjects.map((item, index, arr) => (
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
                            <span className="badge project-number-badge">Project {index + 1}</span>
                          </div>
                        </div>
                        <Card.Body className="py-3">
                          <Card.Title className="fw-bold h5 mb-2 text-bright" style={{ wordBreak: 'break-word', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal' }}>{item.title}</Card.Title>
                          <Card.Text className="mb-3 small" style={{ wordBreak: 'break-word', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal', color: 'var(--text-light)', lineHeight: '1.4' }}>
                            {item.desc}
                          </Card.Text>
                          <div className="d-flex flex-wrap mb-3">
                            {item.tech.map((tech, i) => (
                              <span key={i} className="badge tech-badge me-1 mb-1">{tech}</span>
                            ))}
                          </div>
                        </Card.Body>
                        <Card.Footer className="bg-transparent border-0 pt-0 pb-3">
                          <div className="d-flex justify-content-center mt-1">
                            <Button variant="primary" size="sm" className="project-btn" as="a" href={item.link} target="_blank" rel="noopener noreferrer">
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
        
        /* Card hover styles - ONLY elevation, NO color change */
        .shadow-sm.card {
          transition: transform 0.3s ease, box-shadow 0.3s ease !important;
          background-color: var(--bg-card) !important;
        }
        
        .shadow-sm.card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15) !important;
          background-color: var(--bg-card) !important;
        }
        
        /* About card hover - only floating effect, no color change */
        .about-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease !important;
          background-color: var(--bg-card) !important;
        }
        
        .about-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2) !important;
          background-color: var(--bg-card) !important;
        }
        
        .achievement-card {
          transition: var(--transition-normal);
        }
        
        .achievement-card:hover {
          transform: translateY(-3px);
          background-color: rgba(255, 255, 255, 0.03);
        }
        
        /* Static card styles - no hover effects */
        .about-category-card-static {
          background-color: var(--bg-card-hover);
          border-radius: var(--border-radius);
          padding: 20px;
          height: 100%;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }
        
        .org-card-static {
          background: rgba(255, 255, 255, 0.05);
          border-radius: var(--border-radius-sm);
          padding: 14px;
          height: 100%;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        
        .achievement-card-static {
          position: relative;
          background: rgba(14, 165, 233, 0.1);
          border-radius: var(--border-radius);
          padding: 16px;
          padding-left: 58px;
          height: 100%;
          border: 1px solid rgba(14, 165, 233, 0.2);
        }
        
        /* Override main padding for hero section */
        main {
          padding-top: 64px !important; /* Reduce the top padding to move hero up */
        }
        
        /* Hero section tweaks */
        .hero {
          margin-top: -20px; /* Negative margin to move up */
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
        
        /* Project cards styling - updated for better hover effect */
        .project-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          z-index: 1;
        }
        
        .project-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2) !important;
          z-index: 2; /* Increase z-index on hover to prevent cutoff */
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

        /* Tech skills grid styling */
        .tech-skills-container {
          padding: 5px;
        }
        
        .tech-skills-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
        }
        
        .tech-skill-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: var(--bg-card-hover);
          border-radius: 10px;
          padding: 12px 8px;
          transition: none;
        }
        
        .tech-skill-item:hover {
          transform: none;
          box-shadow: none;
          background: var(--bg-card-hover);
        }
        
        .tech-skill-icon {
          font-size: 2rem;
          margin-bottom: 8px;
          color: var(--accent);
          transition: color 0.3s ease;
        }
        
        .tech-skill-item:hover .tech-skill-icon {
          color:rgb(65, 209, 46);
        }
        
        .tech-skill-name {
          font-size: 0.8rem;
          font-weight: 500;
          text-align: center;
        }
        
        @media (max-width: 576px) {
          .tech-skills-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Cybersecurity skills styling */
        .cyber-skills-container {
          padding: 5px;
        }
        
        .cyber-skills-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
        }
        
        .cyber-skill-item {
          background: var(--bg-card-hover);
          border-radius: var(--border-radius);
          padding: 12px 15px;
          height: 100%;
          transition: none;
        }
        
        .cyber-skill-item:hover {
          transform: none;
          box-shadow: none;
          background: var(--bg-card-hover);
        }
        
        .cyber-skill-icon {
          font-size: 1.5rem;
          color: var(--secondary-accent, #8B5CF6);
          transition: none;
          min-width: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .cyber-skill-item:hover .cyber-skill-icon {
          color: var(--secondary-accent, #8B5CF6);
        }
        
        .cyber-skill-name {
          font-size: 0.75rem;
          font-weight: 500;
          text-align: center;
        }
        
        /* Cybersecurity detailed skills */
        .cybersec-skills-container {
          margin-top: 1.5rem;
        }
        
        .cybersec-skill-item {
          background: var(--bg-card-hover);
          border-radius: var(--border-radius);
          padding: 12px 15px;
          height: 100%;
          transition: none;
        }
        
        .cybersec-skill-item:hover {
          transform: none;
          box-shadow: none;
          background: var(--bg-card-hover);
        }
        
        .cybersec-skill-icon {
          font-size: 1.5rem;
          color: var(--secondary-accent, #8B5CF6);
          transition: none;
          min-width: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .cybersec-skill-item:hover .cybersec-skill-icon {
          color: var(--secondary-accent, #8B5CF6);
        }
        
        .skill-badge {
          display: inline-block;
          padding: 6px 12px;
          margin-right: 8px;
          margin-bottom: 8px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
          background: var(--bg-card-hover);
          color: var(--text);
          transition: none;
        }
        
        .skill-badge:hover {
          background: var(--bg-card-hover);
          color: var(--text);
          transform: none;
        }
        
        @media (max-width: 992px) {
          .cyber-skills-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        @media (max-width: 576px) {
          .tech-skills-grid, .cyber-skills-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Prompt Engineering skills */
        .prompt-skills-container {
          margin-top: 1rem;
          margin-bottom: 1rem;
        }
        
        .prompt-skill-item {
          background: var(--bg-card-hover);
          border-radius: var(--border-radius);
          padding: 12px 15px;
          height: 100%;
          transition: none;
        }
        
        .prompt-skill-item:hover {
          transform: none;
          box-shadow: none;
          background: var(--bg-card-hover);
        }
        
        .prompt-skill-icon {
          font-size: 1.5rem;
          color: var(--accent);
          transition: none;
          min-width: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        /* About section styles - Improved version with better contrast */
        .about-card {
          background-color: var(--bg-card);
          border: none !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3) !important;
        }
        
        .about-category-card {
          background-color: var(--bg-card-hover);
          border-radius: var(--border-radius);
          padding: 20px;
          height: 100%;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          transition: transform 0.3s ease;
        }
        
        .about-category-card:hover {
          transform: translateY(-5px);
        }
        
        .about-category-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        
        .about-category-icon {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: linear-gradient(135deg, var(--accent), var(--secondary-accent));
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          padding: 10px;
          box-shadow: 0 4px 10px rgba(14, 165, 233, 0.3);
        }
        
        .about-category-title {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 600;
          color: white;
        }
        
        .about-category-content {
          color: var(--text-light);
        }
        
        .org-card {
          background: rgba(255, 255, 255, 0.05);
          border-radius: var(--border-radius-sm);
          padding: 14px;
          height: 100%;
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: transform 0.3s ease, background-color 0.3s ease;
        }
        
        .org-card:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-3px);
        }
        
        .org-card h4 {
          color: white;
          font-weight: 600;
          font-size: 0.9rem;
        }
        
        .org-card p {
          color: var(--text-light);
          opacity: 0.9;
        }
        
        .achievements-container {
          padding-top: 4px;
        }
        
        .achievement-card-new {
          position: relative;
          background: rgba(14, 165, 233, 0.1);
          border-radius: var(--border-radius);
          padding: 16px;
          padding-left: 58px;
          height: 100%;
          border: 1px solid rgba(14, 165, 233, 0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .achievement-card-new:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
          background: rgba(14, 165, 233, 0.15);
        }
        
        .achievement-number {
          position: absolute;
          left: 16px;
          top: 16px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--accent);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1rem;
          box-shadow: 0 4px 8px rgba(14, 165, 233, 0.4);
        }
        
        .achievement-content {
          display: flex;
          flex-direction: column;
        }
        
        .achievement-title {
          font-size: 0.9rem;
          font-weight: 600;
          color: white;
          margin-bottom: 6px;
          line-height: 1.3;
        }
        
        .achievement-details {
          font-size: 0.8rem;
          color: var(--text-light);
          margin: 0;
        }
        
        /* Improved contrast for text elements */
        .text-secondary {
          color: rgba(255, 255, 255, 0.8) !important;
        }
        
        .badge {
          font-weight: 500;
          letter-spacing: 0.3px;
          padding: 0.35em 0.65em;
        }
        
        .small {
          font-size: 0.875rem;
        }
        
        /* Responsive adjustments */
        @media (max-width: 992px) {
          .about-category-card {
            padding: 16px;
          }
          
          .about-category-icon {
            width: 38px;
            height: 38px;
          }
          
          .about-category-title {
            font-size: 1.1rem;
          }
        }
        
        @media (max-width: 768px) {
          .achievement-card-new {
            padding: 14px;
            padding-left: 54px;
          }
          
          .achievement-number {
            left: 14px;
            top: 14px;
            width: 28px;
            height: 28px;
            font-size: 0.9rem;
          }
        }
        
        /* Project section improvements for better contrast */
        .project-number-badge {
          background: rgba(14, 165, 233, 0.9) !important;
          color: white;
          font-weight: 500;
          padding: 0.35em 0.8em;
          border-radius: 20px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }
        
        .tech-badge {
          background: rgba(139, 92, 246, 0.3) !important;
          color: white !important;
          font-weight: 500;
          padding: 0.25em 0.6em !important; /* Smaller padding */
          border-radius: 20px;
          border: 1px solid rgba(139, 92, 246, 0.5);
          font-size: 0.75rem !important; /* Smaller font */
        }
        
        .project-btn {
          border-radius: 6px !important;
          padding: 0.25rem 0.75rem !important; /* Smaller padding */
          background: var(--accent) !important;
          border-color: var(--accent) !important;
          transition: all 0.3s ease !important;
        }
        
        .project-btn:hover {
          background: var(--accent-hover) !important;
          border-color: var(--accent-hover) !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
        }
        
        .project-card {
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15) !important;
          border: none !important;
        }
        
        .project-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2) !important;
        }
        
        .project-img {
          position: relative;
          height: 150px;
          overflow: hidden;
        }
        
        .project-img::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.3);
          z-index: 1;
        }
      `}</style>
    </Layout>
  );
} 