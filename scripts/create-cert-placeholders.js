/**
 * This script creates certificate placeholder images in the public/images/certificates folder
 * Run with: node scripts/create-cert-placeholders.js
 */

const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Create directory if it doesn't exist
const certificatesDir = path.join(__dirname, '../public/images/certificates');
if (!fs.existsSync(certificatesDir)) {
  fs.mkdirSync(certificatesDir, { recursive: true });
}

// Certificate data
const certificates = [
  {
    id: 1,
    title: '3rd Place in Journalism Competition',
    organization: 'PUSPRESNAS',
    date: 'May 2023',
    color: '#0ea5e9' // Blue
  },
  {
    id: 2,
    title: '3rd Place in Short Film Competition',
    organization: 'PUSPRESNAS',
    date: 'May 2024',
    color: '#8b5cf6' // Purple
  },
  {
    id: 3,
    title: '3rd Place in OSN Informatics',
    organization: 'PUSPRESNAS',
    date: 'May 2024',
    color: '#0ea5e9' // Blue
  },
  {
    id: 4,
    title: 'Finalist in Indonesian Debate Competition',
    organization: 'PUSPRESNAS',
    date: 'September 2024',
    color: '#8b5cf6' // Purple
  },
  {
    id: 5,
    title: 'Zero to Hero Security Engineer',
    organization: 'Siber Corner',
    date: 'October 13, 2023',
    color: '#0ea5e9' // Blue
  },
  {
    id: 6,
    title: 'Learning Photography from Zero',
    organization: 'Rokan Hulu Photography Community',
    date: 'August 2023',
    color: '#8b5cf6' // Purple
  }
];

// Create each certificate image
certificates.forEach(cert => {
  const width = 600;
  const height = 400;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, width, height);
  
  // Header gradient
  const gradient = ctx.createLinearGradient(0, 0, width, 0);
  if (cert.color === '#0ea5e9') {
    gradient.addColorStop(0, '#0ea5e9');
    gradient.addColorStop(1, '#0284c7');
  } else {
    gradient.addColorStop(0, '#8b5cf6');
    gradient.addColorStop(1, '#6366f1');
  }
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, 80);
  
  // Text
  ctx.textAlign = 'center';
  
  // Title
  ctx.font = 'bold 28px Arial';
  ctx.fillStyle = '#333';
  wrapText(ctx, cert.title, width/2, 150, width - 60, 35);
  
  // Organization
  ctx.font = '22px Arial';
  ctx.fillStyle = cert.color;
  ctx.fillText(cert.organization, width/2, 220);
  
  // Date
  ctx.font = '18px Arial';
  ctx.fillStyle = '#666';
  ctx.fillText(cert.date, width/2, 260);
  
  // Verified badge
  ctx.fillStyle = '#10b981';
  ctx.fillRect(width/2 - 60, 290, 120, 30);
  ctx.font = 'bold 16px Arial';
  ctx.fillStyle = 'white';
  ctx.fillText('VERIFIED', width/2, 310);
  
  // Border
  ctx.strokeStyle = '#e5e7eb';
  ctx.lineWidth = 2;
  ctx.strokeRect(5, 5, width - 10, height - 10);
  
  // Save image
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(path.join(certificatesDir, `cert-${cert.id}.jpg`), buffer);
  
  console.log(`Created certificate image for: ${cert.title}`);
});

// Helper function to wrap text
function wrapText(context, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  let lineCount = 0;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = context.measureText(testLine);
    const testWidth = metrics.width;
    
    if (testWidth > maxWidth && n > 0) {
      context.fillText(line, x, y + (lineCount * lineHeight));
      line = words[n] + ' ';
      lineCount++;
    } else {
      line = testLine;
    }
  }
  
  context.fillText(line, x, y + (lineCount * lineHeight));
}

console.log('All certificate placeholder images created successfully!');
console.log('Install canvas package if needed: npm install canvas'); 