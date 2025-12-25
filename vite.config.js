import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    root: './',
    base: '/studio-emozika/',
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                loveTank: resolve(__dirname, 'plays/love-tank.html'),
                snowQueen: resolve(__dirname, 'plays/snow-queen.html'),
            },
        },
    },
    server: {
        open: true
    }
});
