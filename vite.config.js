import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    // Make posts folder available as static assets
    publicDir: 'public',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                blog: resolve(__dirname, 'blog.html'),
                blogs: resolve(__dirname, 'blogs.html'),
                'blog-post': resolve(__dirname, 'blog-post.html'),
                'blog-neoflap': resolve(__dirname, 'blog-neoflap.html'),
            },
        },
        // Copy posts folder to dist
        copyPublicDir: true,
    },
});
