const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Directory containing the images
const imageDir = path.join(process.cwd(), 'public/images/poster');
// Output directory for compressed images
const outputDir = path.join(process.cwd(), 'public/images/poster/compressed');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Get all image files from the directory
const imageFiles = fs.readdirSync(imageDir)
  .filter(file => /\.(png|jpe?g)$/i.test(file));

console.log(`Found ${imageFiles.length} images to compress`);

// Process each image
async function compressImages() {
  for (const file of imageFiles) {
    const inputPath = path.join(imageDir, file);
    const outputPath = path.join(outputDir, file);
    
    // Skip if it's a directory or already in the compressed folder
    if (fs.statSync(inputPath).isDirectory() || inputPath.includes('compressed')) {
      continue;
    }

    console.log(`Compressing: ${file}`);
    
    try {
      await sharp(inputPath)
        .resize({ width: 800 }) // Resize to max width of 800px (adjust as needed)
        .jpeg({ quality: 80 }) // Use 80% quality (adjust as needed)
        .toFile(outputPath);
        
      const originalSize = fs.statSync(inputPath).size;
      const compressedSize = fs.statSync(outputPath).size;
      const savings = ((1 - compressedSize / originalSize) * 100).toFixed(2);
      
      console.log(`✅ Compressed ${file}: ${savings}% smaller`);
    } catch (error) {
      console.error(`❌ Error compressing ${file}:`, error);
    }
  }
}

compressImages().then(() => {
  console.log('Compression complete! Check the compressed folder.');
}); 