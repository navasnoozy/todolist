import { defineConfig } from 'vite'

export default defineConfig({
    base: '/todolist/',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
    }
})