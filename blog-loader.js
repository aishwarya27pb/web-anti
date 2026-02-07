/**
 * Blog Loader Module
 * Dynamically loads and renders blog posts from markdown files
 */

import { marked } from 'marked';

// Configure marked for security
marked.setOptions({
    gfm: true,
    breaks: true
});

// Blog post metadata registry - add new posts here
const BLOG_POSTS = [
    {
        slug: 'neoflap-ai-journey',
        file: '/posts/neoflap-ai-journey.md'
    },
    {
        slug: 'rivo-telegram-bot',
        file: '/posts/rivo-telegram-bot.md'
    }
];

/**
 * Parse YAML frontmatter from markdown content
 */
function parseFrontmatter(content) {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);
    
    if (!match) {
        return { metadata: {}, content };
    }

    const frontmatterLines = match[1].split('\n');
    const metadata = {};
    
    frontmatterLines.forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
            const key = line.slice(0, colonIndex).trim();
            let value = line.slice(colonIndex + 1).trim();
            
            // Parse arrays like ["tag1", "tag2"]
            if (value.startsWith('[') && value.endsWith(']')) {
                try {
                    value = JSON.parse(value.replace(/'/g, '"'));
                } catch (e) {
                    // Keep as string if parsing fails
                }
            }
            // Remove quotes from strings
            else if ((value.startsWith('"') && value.endsWith('"')) || 
                     (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }
            
            metadata[key] = value;
        }
    });

    return { metadata, content: match[2] };
}

/**
 * Fetch and parse a single blog post
 */
async function fetchPost(postInfo) {
    try {
        const response = await fetch(postInfo.file);
        if (!response.ok) throw new Error(`Failed to fetch ${postInfo.file}`);
        
        const rawContent = await response.text();
        const { metadata, content } = parseFrontmatter(rawContent);
        
        return {
            ...metadata,
            slug: postInfo.slug,
            htmlContent: marked(content)
        };
    } catch (error) {
        console.error(`Error loading post ${postInfo.slug}:`, error);
        return null;
    }
}

/**
 * Load all blog posts and sort by date (newest first)
 */
export async function loadAllPosts() {
    const posts = await Promise.all(BLOG_POSTS.map(fetchPost));
    return posts
        .filter(post => post !== null)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * Load a single post by slug
 */
export async function loadPostBySlug(slug) {
    const postInfo = BLOG_POSTS.find(p => p.slug === slug);
    if (!postInfo) return null;
    return fetchPost(postInfo);
}

/**
 * Render blog cards for home page (latest N posts)
 */
export async function renderBlogCards(containerId, count = 2) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const posts = await loadAllPosts();
    const latestPosts = posts.slice(0, count);

    container.innerHTML = latestPosts.map(post => `
        <article class="blog-card">
            <div class="blog-card-meta">
                <span class="blog-card-date">${formatDate(post.date)}</span>
                <span class="blog-card-tag">${Array.isArray(post.tags) ? post.tags[0] : post.tags}</span>
            </div>
            <h3 class="blog-card-title">${post.title}</h3>
            <p class="blog-card-excerpt">${post.excerpt}</p>
            <a href="/blog-post.html?post=${post.slug}" class="blog-card-link">Read More →</a>
        </article>
    `).join('');
}

/**
 * Render blog list for blogs page (all posts)
 */
export async function renderBlogList(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const posts = await loadAllPosts();

    container.innerHTML = posts.map(post => `
        <article class="blog-list-card">
            <div class="blog-list-date">
                <div class="month">${getMonth(post.date)}</div>
                <div class="year">${getYear(post.date)}</div>
            </div>
            <div class="blog-list-content">
                <h3><a href="/blog-post.html?post=${post.slug}">${post.title}</a></h3>
                <p>${post.excerpt}</p>
                <div class="blog-list-tags">
                    ${(Array.isArray(post.tags) ? post.tags : [post.tags]).map(tag => `<span>${tag}</span>`).join('')}
                </div>
            </div>
        </article>
    `).join('');
}

/**
 * Render single blog post
 */
export async function renderSinglePost(slug, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const post = await loadPostBySlug(slug);
    if (!post) {
        container.innerHTML = '<p>Post not found.</p>';
        return;
    }

    // Update page title
    document.title = `${post.title} | Aishwarya P B`;

    container.innerHTML = `
        <article class="blog-post-full">
            <div class="blog-header">
                <div class="tech-badge-row">
                    ${(Array.isArray(post.tags) ? post.tags : [post.tags]).map(tag => 
                        `<span class="badge">${tag}</span>`
                    ).join('')}
                </div>
                <h1>${post.title}</h1>
                <p class="blog-meta">By Aishwarya P B | ${formatDate(post.date)}</p>
            </div>
            <div class="blog-body">
                ${post.htmlContent}
            </div>
        </article>
    `;
}

// Helper functions
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function getMonth(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short' });
}

function getYear(dateStr) {
    return new Date(dateStr).getFullYear();
}
