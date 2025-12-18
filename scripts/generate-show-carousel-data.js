import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PHOTOS_PATH = path.resolve(__dirname, '../.bd/photos.json');
const PLAYS_PATH = path.resolve(__dirname, '../public/assets/data/plays.json');
const OUT_PATH = path.resolve(__dirname, '../public/assets/data/show-carousel.json');

try {
    // Read source files
    const photosRaw = fs.readFileSync(PHOTOS_PATH, 'utf-8');
    const playsRaw = fs.readFileSync(PLAYS_PATH, 'utf-8');

    const photosData = JSON.parse(photosRaw);
    const playsData = JSON.parse(playsRaw);

    // Group photos by show title (text field)
    const photosByShow = {};

    photosData.items.forEach(item => {
        const showTitle = item.text || 'Unknown';
        if (!photosByShow[showTitle]) {
            photosByShow[showTitle] = [];
        }

        // Get the largest size URL
        const largestSize = item.sizes.reduce((prev, curr) =>
            (prev.width > curr.width) ? prev : curr
        );

        photosByShow[showTitle].push(largestSize.url);
    });

    // Match with plays data and create output structure
    const shows = playsData.plays
        .filter(play => play.showInAfisha && play.status === 'current')
        .map(play => {
            // Try to find matching photos by title
            const matchingPhotos = photosByShow[play.title] || [];

            // If no direct match, try to find by partial match
            if (matchingPhotos.length === 0) {
                const possibleMatch = Object.keys(photosByShow).find(key =>
                    key.toLowerCase().includes(play.title.toLowerCase()) ||
                    play.title.toLowerCase().includes(key.toLowerCase())
                );

                if (possibleMatch) {
                    matchingPhotos.push(...photosByShow[possibleMatch]);
                }
            }

            return {
                id: play.id,
                title: play.title,
                photos: matchingPhotos.slice(0, 10) // Limit to 10 photos per show
            };
        })
        .filter(show => show.photos.length > 0); // Only include shows with photos

    // Add a fallback "All Shows" option with mixed photos
    const allPhotos = [];
    Object.values(photosByShow).forEach(photos => {
        allPhotos.push(...photos);
    });

    // Shuffle and take 10 random photos for "all shows"
    const shuffled = allPhotos.sort(() => 0.5 - Math.random());
    const randomSelection = shuffled.slice(0, 10);

    shows.unshift({
        id: 'all',
        title: 'Наши спектакли',
        photos: randomSelection
    });

    const output = { shows };

    // Write output
    fs.writeFileSync(OUT_PATH, JSON.stringify(output, null, 2), 'utf-8');

    console.log('✅ Show carousel data generated successfully!');
    console.log(`📊 Total shows: ${shows.length}`);
    shows.forEach(show => {
        console.log(`   - ${show.title}: ${show.photos.length} photos`);
    });

} catch (err) {
    console.error('❌ Error generating show carousel data:', err);
    process.exit(1);
}
