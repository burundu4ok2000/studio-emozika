#!/usr/bin/env node

/**
 * Script to select the best photos from VK photo database for hero carousel
 * Analyzes photos by resolution, aspect ratio, and diversity
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const PHOTOS_DB_PATH = path.join(__dirname, '../.bd/photos.json');
const OUTPUT_PATH = path.join(__dirname, '../public/assets/data/show-carousel.json');

// Selection criteria
const MIN_WIDTH = 1280;  // Minimum width for hero quality
const MIN_HEIGHT = 1280; // Minimum height for hero quality
const TARGET_ASPECT_RATIO = 3 / 4; // Prefer vertical/portrait photos (0.75)
const ASPECT_RATIO_TOLERANCE = 0.3; // Allow some variation

// Photo selection logic
function loadPhotosDatabase() {
    console.log('📂 Loading photos database...');
    const data = JSON.parse(fs.readFileSync(PHOTOS_DB_PATH, 'utf-8'));
    console.log(`✓ Found ${data.count} photos in database`);
    return data.items;
}

function getPhotoQualityScore(photo) {
    // Get the highest resolution version
    const origPhoto = photo.orig_photo || {};
    const width = origPhoto.width || 0;
    const height = origPhoto.height || 0;

    // Calculate aspect ratio
    const aspectRatio = width / height;

    // Quality score based on resolution
    const resolutionScore = Math.min(width * height / (1920 * 2560), 1) * 100;

    // Aspect ratio score (prefer vertical/portrait for hero)
    const aspectDiff = Math.abs(aspectRatio - TARGET_ASPECT_RATIO);
    const aspectScore = Math.max(0, 100 - (aspectDiff / ASPECT_RATIO_TOLERANCE * 100));

    // Like count as popularity indicator (normalized)
    const likesScore = Math.min((photo.likes?.count || 0) / 10, 1) * 20;

    // Total score
    const totalScore = resolutionScore * 0.6 + aspectScore * 0.3 + likesScore * 0.1;

    return {
        score: totalScore,
        width,
        height,
        aspectRatio,
        likes: photo.likes?.count || 0
    };
}

function selectBestPhotos(photos, count = 10) {
    console.log('\n🎯 Analyzing photos...');

    // Filter and score photos
    const scoredPhotos = photos
        .filter(photo => {
            const orig = photo.orig_photo || {};
            return orig.width >= MIN_WIDTH && orig.height >= MIN_HEIGHT;
        })
        .map(photo => {
            const quality = getPhotoQualityScore(photo);
            return {
                photo,
                quality,
                url: getHighQualityUrl(photo)
            };
        })
        .filter(item => item.url) // Ensure we have a valid URL
        .sort((a, b) => b.quality.score - a.quality.score);

    console.log(`✓ Found ${scoredPhotos.length} high-quality photos`);

    // Group by album for diversity
    const albumGroups = {};
    scoredPhotos.forEach(item => {
        const albumId = item.photo.album_id;
        if (!albumGroups[albumId]) {
            albumGroups[albumId] = [];
        }
        albumGroups[albumId].push(item);
    });

    console.log(`✓ Photos spread across ${Object.keys(albumGroups).length} albums`);

    // Select photos ensuring diversity across albums
    const selected = [];
    const albumKeys = Object.keys(albumGroups);
    let albumIndex = 0;

    while (selected.length < count && albumKeys.length > 0) {
        const albumId = albumKeys[albumIndex];
        const albumPhotos = albumGroups[albumId];

        if (albumPhotos.length > 0) {
            selected.push(albumPhotos.shift());
        }

        // Remove empty albums
        if (albumPhotos.length === 0) {
            delete albumGroups[albumId];
            albumKeys.splice(albumIndex, 1);
        } else {
            albumIndex = (albumIndex + 1) % albumKeys.length;
        }
    }

    return selected;
}

function getHighQualityUrl(photo) {
    // Try to get the highest quality image URL
    // Priority: w (1920x2560) > z (1280x1707) > y (1080x1440)
    const sizes = photo.sizes || [];
    const preferredTypes = ['w', 'z', 'y', 'base'];

    for (const type of preferredTypes) {
        const size = sizes.find(s => s.type === type);
        if (size) return size.url;
    }

    // Fallback to orig_photo
    return photo.orig_photo?.url || null;
}

function printPhotoInfo(item, index) {
    const { photo, quality, url } = item;
    console.log(`\n${index + 1}. Photo ID: ${photo.id}`);
    console.log(`   Album: ${photo.album_id}`);
    console.log(`   Text: ${photo.text || '(no text)'}`);
    console.log(`   Resolution: ${quality.width}x${quality.height}`);
    console.log(`   Aspect Ratio: ${quality.aspectRatio.toFixed(2)}`);
    console.log(`   Likes: ${quality.likes}`);
    console.log(`   Quality Score: ${quality.score.toFixed(1)}/100`);
    console.log(`   URL: ${url.substring(0, 80)}...`);
}

function generateCarouselJSON(selectedPhotos) {
    // Group photos by text/album for shows
    const showGroups = {};

    selectedPhotos.forEach(item => {
        const text = item.photo.text || 'Наши спектакли';
        if (!showGroups[text]) {
            showGroups[text] = [];
        }
        showGroups[text].push(item.url);
    });

    // Create shows array
    const shows = Object.entries(showGroups).map(([title, photos]) => ({
        id: title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        title: title,
        photos: photos
    }));

    // Ensure we have an "all" show with all photos
    const allPhotos = selectedPhotos.map(item => item.url);
    const allShowIndex = shows.findIndex(show => show.id === 'all' || show.id.includes('наши'));

    if (allShowIndex >= 0) {
        shows[allShowIndex].photos = allPhotos;
    } else {
        shows.unshift({
            id: 'all',
            title: 'Наши спектакли',
            photos: allPhotos
        });
    }

    return { shows };
}

function main() {
    console.log('🎨 Hero Photo Selector\n');
    console.log('='.repeat(50));

    try {
        // Load database
        const allPhotos = loadPhotosDatabase();

        // Select best photos
        const selectedPhotos = selectBestPhotos(allPhotos, 10);

        console.log('\n📋 Selected Photos:');
        console.log('='.repeat(50));
        selectedPhotos.forEach((item, index) => printPhotoInfo(item, index));

        // Generate JSON
        const carouselData = generateCarouselJSON(selectedPhotos);

        // Save to file
        console.log('\n💾 Saving to', OUTPUT_PATH);
        fs.writeFileSync(OUTPUT_PATH, JSON.stringify(carouselData, null, 2), 'utf-8');
        console.log('✓ Done!');

        // Print summary
        console.log('\n📊 Summary:');
        console.log('='.repeat(50));
        console.log(`Total shows: ${carouselData.shows.length}`);
        carouselData.shows.forEach(show => {
            console.log(`  - ${show.title}: ${show.photos.length} photos`);
        });

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

// Run the script
main();

