import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = path.join(__dirname, 'assets/img');

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(dirPath, "/", file));
        }
    });

    return arrayOfFiles;
}

async function convertImages() {
    const files = getAllFiles(ASSETS_DIR);
    const images = files.filter(file => /\.(png|jpe?g)$/i.test(file));

    console.log(`Found ${images.length} images to process.`);

    for (const imagePath of images) {
        const dir = path.dirname(imagePath);
        const ext = path.extname(imagePath);
        const name = path.basename(imagePath, ext);
        const webpPath = path.join(dir, `${name}.webp`);

        if (fs.existsSync(webpPath)) {
            console.log(`Skipping ${name}.webp (already exists)`);
            continue;
        }

        try {
            console.log(`Converting ${path.basename(imagePath)}...`);
            await sharp(imagePath)
                .webp({ quality: 80 })
                .toFile(webpPath);
        } catch (err) {
            console.error(`Error processing ${imagePath}:`, err);
        }
    }

    console.log('Done!');
}

convertImages();
