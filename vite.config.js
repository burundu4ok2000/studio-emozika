import { defineConfig } from 'vite';

export default defineConfig({
    root: './',
    base: '/studio-emozika/',
    build: {
        outDir: 'dist',
    },
    server: {
        open: true
    }
});
