import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const ENV_PATH = path.join(PROJECT_ROOT, '.env');
const OUT_DIR = path.join(PROJECT_ROOT, '.bd');

// 1. Load Environment Variables manually (no deps)
function loadEnv() {
    if (!fs.existsSync(ENV_PATH)) return {};
    const content = fs.readFileSync(ENV_PATH, 'utf-8');
    const env = {};
    content.split('\n').forEach(line => {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
            env[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, '');
        }
    });
    return env;
}

const env = loadEnv();
const TOKEN = env.VK_SERVICE_TOKEN; // Service token is best for public data
const OWNER_ID = env.VK_GROUP_ID; // Should be negative for groups in some calls, checking API
// Note: VK_GROUP_ID might be positive in .env, but API expects negative for owner_id usually.
// The user provided "-232221941", which is already negative.

if (!TOKEN || !OWNER_ID) {
    console.error('❌ Missing VK_SERVICE_TOKEN or VK_GROUP_ID in .env');
    process.exit(1);
}

if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR);
}

const API_VERSION = '5.131';

async function vkRequest(method, params) {
    const url = new URL(`https://api.vk.com/method/${method}`);
    url.searchParams.append('access_token', TOKEN);
    url.searchParams.append('v', API_VERSION);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    try {
        const res = await fetch(url.toString());
        const json = await res.json();
        if (json.error) {
            throw new Error(`VK API Error ${json.error.error_code}: ${json.error.error_msg}`);
        }
        return json.response;
    } catch (err) {
        console.error(`Error fetching ${method}:`, err);
        return null;
    }
}

async function scrapeAll() {
    console.log(`🚀 Starting scrape for Group ID: ${OWNER_ID}`);

    // 1. WALL POSTS
    console.log('📄 Fetching Wall Posts...');
    const wall = await vkRequest('wall.get', {
        owner_id: OWNER_ID,
        count: 100, // Max per request
        extended: 1
    });
    if (wall) {
        fs.writeFileSync(path.join(OUT_DIR, 'wall.json'), JSON.stringify(wall, null, 2));
        console.log(`✅ Saved ${wall.count} posts to .bd/wall.json`);
    }

    // 2. PHOTOS
    console.log('📸 Fetching Photos...');
    const photos = await vkRequest('photos.getAll', {
        owner_id: OWNER_ID,
        count: 200,
        extended: 1
    });
    if (photos) {
        fs.writeFileSync(path.join(OUT_DIR, 'photos.json'), JSON.stringify(photos, null, 2));
        console.log(`✅ Saved ${photos.count} photos to .bd/photos.json`);
    }

    // 3. VIDEOS
    console.log('🎥 Fetching Videos...');
    const videos = await vkRequest('video.get', {
        owner_id: OWNER_ID,
        count: 200
    });
    if (videos) {
        fs.writeFileSync(path.join(OUT_DIR, 'videos.json'), JSON.stringify(videos, null, 2));
        console.log(`✅ Saved ${videos.count} videos to .bd/videos.json`);
    }

    // 4. BOARD TOPICS (Discussions)
    console.log('💬 Fetching Board Topics...');
    // owner_id for board.getTopics is just the group ID (positive usually? No, API says group_id)
    // Actually board.getTopics takes `group_id` (positive).
    const groupIdPositive = Math.abs(parseInt(OWNER_ID));

    const topics = await vkRequest('board.getTopics', {
        group_id: groupIdPositive,
        count: 100,
        preview: 2,
        preview_length: 0
    });

    if (topics && topics.items) {
        console.log(`Found ${topics.items.length} topics. Fetching comments for each...`);
        const fullTopics = [];

        for (const topic of topics.items) {
            const comments = await vkRequest('board.getComments', {
                group_id: groupIdPositive,
                topic_id: topic.id,
                count: 100
            });
            fullTopics.push({
                ...topic,
                comments: comments ? comments.items : []
            });
        }

        fs.writeFileSync(path.join(OUT_DIR, 'discussions.json'), JSON.stringify({ count: topics.count, items: fullTopics }, null, 2));
        console.log(`✅ Saved discussions to .bd/discussions.json`);
    }

    console.log('🎉 Scraping completed!');
}

scrapeAll();
