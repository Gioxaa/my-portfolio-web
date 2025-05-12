const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Directory containing the images
const imageDir = path.join(process.cwd(), 'public/images/poster');

// Get all image files from the directory
const imageFiles = fs.readdirSync(imageDir)
  .filter(file => /\.(png|jpe?g)$/i.test(file));

console.log(`Found ${imageFiles.length} images to process`);

// Process each image
async function generateImageSizes() {
  for (const file of imageFiles) {
    const inputPath = path.join(imageDir, file);
    
    // Skip if it's a directory or already processed (-small or -medium suffix)
    if (fs.statSync(inputPath).isDirectory() || 
        file.includes('-small') || 
        file.includes('-medium')) {
      continue;
    }

    console.log(`Processing: ${file}`);
    
    const fileNameWithoutExt = file.substring(0, file.lastIndexOf('.'));
    const extension = file.substring(file.lastIndexOf('.'));
    
    try {
      // Create small version (400px)
      await sharp(inputPath)
        .resize({ width: 400 })
        .jpeg({ quality: 75 })
        .toFile(path.join(imageDir, `${fileNameWithoutExt}-small${extension}`));
      
      // Create medium version (800px)
      await sharp(inputPath)
        .resize({ width: 800 })
        .jpeg({ quality: 80 })
        .toFile(path.join(imageDir, `${fileNameWithoutExt}-medium${extension}`));
      
      console.log(`✅ Generated size variations for ${file}`);
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error);
    }
  }
}

generateImageSizes().then(() => {
  console.log('All images processed successfully!');
}); 