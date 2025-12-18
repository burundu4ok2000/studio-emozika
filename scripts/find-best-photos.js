import fs from 'fs';

const PHOTOS_PATH = '.bd/photos.json';

try {
    const raw = fs.readFileSync(PHOTOS_PATH, 'utf-8');
    const data = JSON.parse(raw);
    const photos = data.items || [];

    console.log(`Analyzing ${photos.length} photos...`);

    // Filter for high-res landscape
    const candidates = photos.map(item => {
        // Find largest size
        if (!item.sizes) return null;
        const largest = item.sizes.reduce((prev, current) => {
            return (prev.width > current.width) ? prev : current;
        });

        return {
            id: item.id,
            text: item.text,
            width: largest.width,
            height: largest.height,
            url: largest.url,
            likes: item.likes ? item.likes.count : 0,
            date: new Date(item.date * 1000).toISOString().split('T')[0]
        };
    })
        .filter(p => p && p.width >= 1000) // High res, any aspect
        .sort((a, b) => b.likes - a.likes) // Sort by popularity
        .slice(0, 20); // Top 20

    console.log("Top 20 Popular Photos (Any Aspect):");
    candidates.forEach((c, i) => {
        console.log(`#${i + 1} [ID: ${c.id}] Likes: ${c.likes}, Size: ${c.width}x${c.height}, Date: ${c.date}`);
        console.log(`Text: ${c.text.substring(0, 100).replace(/\n/g, ' ')}`);
        console.log(`URL: ${c.url}\n`);
    });

} catch (err) {
    console.error("Error:", err);
}
