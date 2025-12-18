import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, '../public/assets/img/hero'); // Using public/assets/img/hero

if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
}

const images = [
    {
        name: 'hero-main.jpg',
        url: 'https://sun9-12.userapi.com/s/v1/ig2/f9G-SazO3ubX_X0E6s1qdsZ2miL3ZF4JSDBAQAQ8MX0CqCA4MDWtbKd2O_ySgf5AL4pXOZRm1zjr0m5WXnppLOIs.jpg?quality=95&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,1080x810,1280x960,1440x1080,2560x1920&from=bu'
    },
    { // Vertical 1
        name: 'hero-v1.jpg',
        url: 'https://sun9-23.userapi.com/s/v1/ig2/HpNHUOUXwCQ5_neRkKeZCuQ_-uH1nURrUxSw_UDFhvXbc4OrKn8YxAIcH5XSSV_uWfYEHOsljfXiGXruWap3whHW.jpg?quality=95&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,720x960,1080x1440,1280x1707,1440x1920,1920x2560&from=bu'
    },
    { // Vertical 2
        name: 'hero-v2.jpg',
        url: 'https://sun9-54.userapi.com/s/v1/ig2/lteNUq2X_-93dyUe8MJ_8oDXSoPKRw4XUzJFrWFodTi8N7XsTdM9O6FFsvNq9TPVe-8IV81EKT7NrFwWJa9Rljsp.jpg?quality=95&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,720x960,1080x1440,1280x1707,1440x1920,1920x2560&from=bu'
    }
];

async function download() {
    console.log(`Downloading ${images.length} images to ${OUT_DIR}...`);
    for (const img of images) {
        try {
            const res = await fetch(img.url);
            const buffer = Buffer.from(await res.arrayBuffer());
            fs.writeFileSync(path.join(OUT_DIR, img.name), buffer);
            console.log(`✅ Saved ${img.name}`);
        } catch (err) {
            console.error(`❌ Error downloading ${img.name}:`, err);
        }
    }
}

download();
