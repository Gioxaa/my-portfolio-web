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
            <FaBug className="me-1" /> Method: {method}
          </Badge>
        </div>
        <p className="mb-3">{description}</p>
        <div className="d-flex justify-content-end">
          <span className="text-secondary small">
            <FaExclamationTriangle className="me-1" /> For ethical learning
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
      description: 'Using the query "\'or 1=1 -- -" to test for injection vulnerability, then proceeding with testing using sqlmap to confirm the vulnerability. Results indicated potential sensitive data extraction through improperly validated queries.',
      method: 'SQL Injection',
      target: 'registrasiulang.unri.ac.id',
      date: 'January 2024'
    },
    {
      id: 2,
      title: 'Predictive Hash on Password Reset URL',
      description: 'Attempting to predict the hash used in password reset URLs by analyzing hash formation patterns from several URL samples. The patterns found showed that the hash could be predicted with a certain level of accuracy due to the lack of random elements in its formation.',
      method: 'Hash Analysis',
      target: 'Institutional web application',
      date: 'February 2024'
    },
    {
      id: 3,
      title: 'CSRF Token Reuse on Student Portal',
      description: 'Identifying that CSRF tokens were not regenerated on each request, allowing the same token to be reused for multiple operations. This creates a security vulnerability where attackers can use the same token to perform actions on behalf of authenticated users.',
      method: 'CSRF Token Reuse',
      target: 'Student portal',
      date: 'February 2024'
    },
    {
      id: 4,
      title: 'IDOR on Academic System',
      description: 'Manipulating student ID or ID parameters in URLs to access data that should not be accessible to the user. The system did not verify whether the user accessing the data had the correct permissions, allowing access to other students\' data.',
      method: 'IDOR',
      target: 'Campus academic system',
      date: 'March 2024'
    },
    {
      id: 5,
      title: 'File Upload Bypass on Document System',
      description: 'Testing file upload vulnerabilities with techniques such as modifying file extensions to ".pdf.php" and performing MIME spoofing. Successfully uploaded PHP files that could be executed by the server through validation that only checked file extensions without in-depth content analysis.',
      method: 'File Upload Bypass',
      target: 'Document upload system',
      date: 'March 2024'
    },
    {
      id: 6,
      title: 'Error Disclosure and Information Leakage',
      description: 'Successfully capturing error and debug information from servers that provided clues about database structure and server configuration. This information could potentially be used to compose further attacks as it revealed file paths, software versions, and database structure.',
      method: 'Error Disclosure',
      target: 'Various web applications',
      date: 'April 2024'
    },
  ];

  return (
    <Layout title="Bug Hunting Journal | Muhammad Reyhan" description="Documentation of security testing and bug hunting for ethical learning">
      <section className="py-5 section-fade">
        <Container>
          <div className="mb-5 text-center">
            <h1 className="display-5 fw-bold mb-3 text-bright">Bug Hunting Journal</h1>
            <div className="w-75 mx-auto">
              <p className="lead text-secondary">
                Documentation of my journey in cybersecurity exploration and web application vulnerability discoveries
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
                      <h3 className="h5 mb-2 text-bright">Ethics Warning</h3>
                      <p className="mb-0 text-secondary">
                        All these explorations are for <span className="text-bright fw-bold">ethical learning</span> and 
                        part of the process of becoming a beginner bug bounty hunter. Testing is only done on 
                        systems that have a bug bounty program or with permission from the system owner. No illegal activities 
                        were carried out in this process.
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
              If you have a bug bounty program and would like to collaborate, <a href="mailto:reyhan@example.com" className="link-accent">contact me</a>.
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