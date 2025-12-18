import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper to read JSON
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PHOTOS_PATH = path.resolve(__dirname, '../.bd/photos.json');
const OUT_DIR = path.resolve(__dirname, '../public/assets/img/hero/carousel');

if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
}

try {
    const raw = fs.readFileSync(PHOTOS_PATH, 'utf-8');
    const data = JSON.parse(raw);
    const photos = data.items || [];

    // Filter high-quality, vertical or square preferred for "cards", or landscape.
    // Let's mix.
    const candidates = photos.map(item => {
        if (!item.sizes) return null;
        const largest = item.sizes.reduce((prev, current) => (prev.width > current.width) ? prev : current);
        return {
            id: item.id,
            width: largest.width,
            height: largest.height,
            url: largest.url,
            likes: item.likes ? item.likes.count : 0
        };
    })
        .filter(p => p && p.width >= 800) // Decent quality
        .sort((a, b) => b.likes - a.likes)
        // Dedup by URL just in case (though unlikely with IDs)
        .slice(0, 10);

    console.log(`Found ${candidates.length} images. Downloading...`);

    async function download() {
        for (let i = 0; i < candidates.length; i++) {
            const img = candidates[i];
            const ext = 'jpg';
            const filename = `c-${i + 1}.${ext}`;
            const dest = path.join(OUT_DIR, filename);

            if (fs.existsSync(dest)) {
                console.log(`Skipping ${filename} (exists)`);
                continue;
            }

            try {
                const res = await fetch(img.url);
                const buffer = Buffer.from(await res.arrayBuffer());
                fs.writeFileSync(dest, buffer);
                console.log(`✅ Saved ${filename}`);
            } catch (err) {
                console.error(`❌ Error downloading ${filename}:`, err);
            }
        }
    }

    download();

} catch (err) {
    console.error("Error:", err);
}
