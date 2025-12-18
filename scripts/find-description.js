import fs from 'fs';
import path from 'path';

const WALL_PATH = '.bd/wall.json';

try {
    const raw = fs.readFileSync(WALL_PATH, 'utf-8');
    const data = JSON.parse(raw);
    const posts = data.items || [];

    const keywords = [
        'о нас', 'кто мы', 'миссия', 'история', 'создатели',
        'педагог', 'студия', 'театр', 'приглашаем', 'открыт'
    ];

    console.log(`Scanning ${posts.length} posts for keywords: ${keywords.join(', ')}\n`);

    posts.forEach((post, index) => {
        const text = post.text || '';
        const lowerText = text.toLowerCase();

        // Check if interesting
        const matches = keywords.filter(k => lowerText.includes(k));

        if (matches.length > 0) {
            console.log(`--- Post #${index + 1} (Matches: ${matches.join(', ')}) ---`);
            // Print first 300 chars
            console.log(text.substring(0, 300) + (text.length > 300 ? '...' : ''));
            console.log('\n');
        }
    });

} catch (err) {
    console.error("Error reading/parsing wall.json:", err);
}
