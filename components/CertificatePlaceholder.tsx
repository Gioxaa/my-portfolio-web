import React from 'react';

interface CertificatePlaceholderProps {
  title: string;
  organization: string;
  date: string;
  isAlt?: boolean;
}

const CertificatePlaceholder: React.FC<CertificatePlaceholderProps> = ({
  title,
  organization,
  date,
  isAlt = false
}) => {
  return (
    <div className={`certificate-placeholder ${isAlt ? 'alt' : ''}`}>
      <div className="certificate-placeholder-content">
        <div className="certificate-placeholder-title">{title}</div>
        <div className="certificate-placeholder-org">{organization}</div>
        <div className="certificate-placeholder-date">{date}</div>
        <div className="certificate-placeholder-verified">VERIFIED</div>
      </div>
    </div>
  );
};

export default CertificatePlaceholder; 