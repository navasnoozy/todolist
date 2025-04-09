import { defineConfig } from 'vite'

export default defineConfig({
    base: process.env.GITHUB_ACTIONS ? '/todolist/' : '/',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
    }
})