import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { FaCode, FaFileDownload, FaHome, FaUser, FaLaptopCode, FaProjectDiagram, FaCertificate, FaBug } from 'react-icons/fa';

const Header = () => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  // Handle scroll effect for navbar and section detection with Intersection Observer
  useEffect(() => {
    // Handle navbar background change on scroll
    const handleScrollEffect = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Use Intersection Observer for better section detection
    const setupSectionObserver = () => {
      // Set home as active when at the top
      if (window.scrollY < 100) {
        setActiveSection('');
      }
      
      // Options for the observer
      const options = {
        root: null,
        rootMargin: '-90px 0px -70% 0px', // Adjust rootMargin to detect when section is near the top
        threshold: 0
      };
      
      // Create observer with different options for mobile
      const isMobile = window.innerWidth <= 768;
      const observerOptions = {
        root: null,
        rootMargin: isMobile ? '-70px 0px -70% 0px' : '-90px 0px -70% 0px',
        threshold: 0
      };
      
      // Create observer
      observerRef.current = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          // When a section enters the viewport
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            if (id) {
              setActiveSection(id);
            }
          }
        });
        
        // If no section is intersecting and we're at the top, set home as active
        if (entries.every(entry => !entry.isIntersecting) && window.scrollY < 100) {
          setActiveSection('');
        }
      }, observerOptions);
      
      // Observe all sections
      const sections = document.querySelectorAll('#about, #skills, #projects, #certificates');
      sections.forEach(section => {
        if (observerRef.current) {
          observerRef.current.observe(section);
        }
      });
    };
    
    // Add scroll listener for navbar background
    window.addEventListener('scroll', handleScrollEffect);
    
    // Setup section observer after a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setupSectionObserver();
    }, 100);
    
    // Run once on mount to set initial state
    handleScrollEffect();
    
    return () => {
      window.removeEventListener('scroll', handleScrollEffect);
      clearTimeout(timer);
      
      // Cleanup observer
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);
  
  // Function to determine if a nav link is active
  const isActive = (path: string) => {
    return router.pathname === path ? 'active' : '';
  };

  // Check if section is active
  const isSectionActive = (section: string) => {
    if (section === '') {
      // Home is active when no other section is active or we're at the top
      return activeSection === '' ? 'active' : '';
    }
    return activeSection === section ? 'active' : '';
  };

  // Handle navigation click with smooth scrolling for hash links
  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    // Prevent default navigation
    e.preventDefault();
    
    // Get current expanded state for reference
    const wasExpanded = expanded;
    
    // Close mobile menu
    if (expanded) {
      setExpanded(false);
    }
    
    // Handle hash navigation with smooth scrolling
    if (path.includes('#') && router.pathname === '/') {
      const targetId = path.split('#')[1];
      setActiveSection(targetId); // Set active section immediately for better UX
      
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // If the menu was expanded (on mobile), wait for it to collapse before scrolling
        // This ensures we get the correct header height after the mobile menu is closed
        setTimeout(() => {
          // Get header height AFTER the menu has collapsed
          const headerHeight = document.querySelector('.navbar')?.clientHeight || 0;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
          
          // Add more offset for mobile devices
          const isMobile = window.innerWidth <= 768;
          const mobileOffset = isMobile ? 40 : 0;
          
          // Scroll with offset for header
          window.scrollTo({
            top: targetPosition - headerHeight - 16 - mobileOffset, // Additional offset for mobile
            behavior: 'smooth'
          });
          
          // Update URL without triggering navigation
          window.history.pushState(null, '', path);
        }, wasExpanded ? 300 : 0); // Wait for menu animation to complete if it was expanded
      }
    }
    // Add smooth scroll to top for home link
    else if (path === '/' && router.pathname === '/') {
      setActiveSection(''); // Set active section to home immediately
      
      // If the menu was expanded (on mobile), wait for it to collapse before scrolling
      setTimeout(() => {
        // Smooth scroll to top
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        
        // Update URL without triggering navigation
        window.history.pushState(null, '', path);
      }, wasExpanded ? 300 : 0); // Wait for menu animation to complete if it was expanded
    } else {
      // For non-hash links, just navigate normally
      router.push(path);
    }
  };

  // Get icon based on path
  const getNavIcon = (path: string) => {
    if (path === '/') return <FaHome className="nav-icon" />;
    if (path === '/#about') return <FaUser className="nav-icon" />;
    if (path === '/#skills') return <FaLaptopCode className="nav-icon" />;
    if (path === '/#projects') return <FaProjectDiagram className="nav-icon" />;
    if (path === '/#certificates') return <FaCertificate className="nav-icon" />;
    if (path === '/jurnal') return <FaBug className="nav-icon" />;
    return null;
  };

  return (
    <Navbar 
      expand="lg" 
      variant="dark" 
      className={`py-2 ${scrolled ? 'scrolled shadow-sm' : ''}`} 
      fixed="top"
      expanded={expanded}
      onToggle={(expanded) => setExpanded(expanded)}
    >
      <Container>
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <span className="logo-icon me-2 d-flex justify-content-center align-items-center">
            <FaCode />
          </span>
          <span>Reyhan Portfolio</span>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-lg-center">
            <Link 
              href="/" 
              className={`nav-link d-flex align-items-center ${isSectionActive('')}`}
              onClick={(e) => handleNavLinkClick(e, '/')}
              aria-current={isSectionActive('') ? 'page' : undefined}
            >
              <div className="nav-link-icon-wrapper">
                <FaHome className="nav-icon d-lg-none" />
              </div>
              <span>Home</span>
            </Link>
            <Link 
              href="/#about" 
              className={`nav-link d-flex align-items-center ${isSectionActive('about')}`}
              onClick={(e) => handleNavLinkClick(e, '/#about')}
              aria-current={isSectionActive('about') ? 'page' : undefined}
            >
              <div className="nav-link-icon-wrapper">
                <FaUser className="nav-icon d-lg-none" />
              </div>
              <span>About Me</span>
            </Link>
            <Link 
              href="/#skills" 
              className={`nav-link d-flex align-items-center ${isSectionActive('skills')}`}
              onClick={(e) => handleNavLinkClick(e, '/#skills')}
              aria-current={isSectionActive('skills') ? 'page' : undefined}
            >
              <div className="nav-link-icon-wrapper">
                <FaLaptopCode className="nav-icon d-lg-none" />
              </div>
              <span>Skills</span>
            </Link>
            <Link 
              href="/#projects" 
              className={`nav-link d-flex align-items-center ${isSectionActive('projects')}`}
              onClick={(e) => handleNavLinkClick(e, '/#projects')}
              aria-current={isSectionActive('projects') ? 'page' : undefined}
            >
              <div className="nav-link-icon-wrapper">
                <FaProjectDiagram className="nav-icon d-lg-none" />
              </div>
              <span>Works & Projects</span>
            </Link>
            <Link 
              href="/#certificates" 
              className={`nav-link d-flex align-items-center ${isSectionActive('certificates')}`}
              onClick={(e) => handleNavLinkClick(e, '/#certificates')}
              aria-current={isSectionActive('certificates') ? 'page' : undefined}
            >
              <div className="nav-link-icon-wrapper">
                <FaCertificate className="nav-icon d-lg-none" />
              </div>
              <span>Certificates</span>
            </Link>
            <Link 
              href="/jurnal" 
              className={`nav-link d-flex align-items-center ${isActive('/jurnal')}`}
              onClick={(e) => handleNavLinkClick(e, '/jurnal')}
              aria-current={isActive('/jurnal') ? 'page' : undefined}
            >
              <div className="nav-link-icon-wrapper">
                <FaBug className="nav-icon d-lg-none" />
              </div>
              <span>Bug Hunting Journal</span>
            </Link>
            <a 
              href="https://drive.google.com/file/d/1wJcYdh4XGr5qXLN6ElT0JIR0HtkV_ZrX/view?usp=sharing" 
              target="_blank"
              rel="noopener noreferrer"
              className="ms-lg-3 mt-3 mt-lg-0 resume-download-link" 
              onClick={() => {if (expanded) setExpanded(false)}}
              role="button"
              aria-label="Download Resume"
            >
              <Button variant="outline-light" size="sm" className="resume-btn">
                <FaFileDownload className="me-2" />
                Resume
              </Button>
            </a>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <style jsx>{`
        .nav-icon {
          font-size: 1rem;
          opacity: 0.9;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .nav-link-icon-wrapper {
          min-width: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 10px;
        }
        
        @media (min-width: 992px) {
          .nav-link-icon-wrapper {
            display: none;
          }
        }
      `}</style>
    </Navbar>
  );
};

export default Header; 