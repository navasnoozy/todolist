import { defineConfig } from 'vite'

export default defineConfig({
    base: '/todolist/',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        assetsInlineLimit: 0, // Don't inline CSS assets
    },
    publicDir: 'public', // Make sure this points to your public directory
})