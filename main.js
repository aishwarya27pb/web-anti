import './style.css'
import ParticleNetwork from './particles.js';
import VanillaTilt from 'vanilla-tilt';
import { renderBlogCards } from './blog-loader.js';

console.log('Portfolio initialized');

// Initialize dynamic blog cards on home page
if (document.getElementById('blog-cards')) {
    renderBlogCards('blog-cards', 2);
}

// Initialize Particles
new ParticleNetwork('particle-canvas');

// Initialize Tilt
VanillaTilt.init(document.querySelectorAll(".project-card"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
    scale: 1.05
});

// Initialize Mermaid only if container exists
const initMermaid = () => {
    if (document.querySelector('.mermaid')) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js';
        script.onload = () => {
            mermaid.initialize({
                startOnLoad: true,
                theme: 'dark',
                securityLevel: 'loose',
                themeVariables: {
                    primaryColor: '#22d3ee',
                    primaryTextColor: '#fff',
                    primaryBorderColor: '#22d3ee',
                    lineColor: '#22d3ee',
                    secondaryColor: '#1e293b',
                    tertiaryColor: '#0f172a'
                }
            });
        };
        document.head.appendChild(script);
    }
};
initMermaid();

// Scroll to Top Logic
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Custom Cursor Logic
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot follows cursor instantly
    cursorDot.style.transform = `translate3d(${posX}px, ${posY}px, 0) translate(-50%, -50%)`;

    // Outline follows with slight delay via CSS transition
    cursorOutline.style.transform = `translate3d(${posX}px, ${posY}px, 0) translate(-50%, -50%)`;
});

// Mobile Menu Toggle (can add later)
// Scroll Animations (can add later)

// Reveal animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Scroll Spy
const sections = document.querySelectorAll('section, header.hero');
const navLinks = document.querySelectorAll('.nav-links a');

const scrollSpyOptions = {
    threshold: 0.2, // Trigger when 20% of section is visible
    rootMargin: "-100px 0px -50% 0px" // Adjust for navbar height
};

const scrollSpyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id') || 'hero'; // fallback for hero if no id, but hero has class

            // If entry is hero (which is a header, not section with ID in my HTML potentially?), handle it
            // Actually my Hero html is <header class="hero">. It doesn't have an ID.
            // Let's verify index.html lines 34-44. <header class="hero">
            // Wait, nav link for hero... I don't have a "Home" link.
            // Lines 24-28: About, Skills, Experience, Projects, Contact.
            // So I only need to spy on those sections.
            // But user might want "About" to be active when in About.

            const activeId = entry.target.id;
            if (activeId) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    }
                });
            }
        }
    });
}, scrollSpyOptions);

// Only run scroll spy on pages with multiple sections (like index.html)
if (sections.length > 3) {
    sections.forEach(section => {
        if (section.id) scrollSpyObserver.observe(section);
    });
}

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('scroll-progress').style.width = scrolled + "%";
});

// Theme Switching
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check for saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Re-initialize particles if needed for light mode colors
        // For now, the existing particles work well enough on both
    });
}

// Social Sharing Logic
const shareLinkedIn = document.getElementById('share-linkedin');
const shareX = document.getElementById('share-x');

if (shareLinkedIn) {
    shareLinkedIn.addEventListener('click', (e) => {
        e.preventDefault();
        const url = window.location.href;
        const title = document.title;
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, 'share-linkedin', 'width=600,height=400');
    });
}

if (shareX) {
    shareX.addEventListener('click', (e) => {
        e.preventDefault();
        const url = window.location.href;
        const text = `Check out this post: ${document.title}`;
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, 'share-x', 'width=600,height=400');
    });
}
