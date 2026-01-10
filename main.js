import './style.css'

console.log('Portfolio initialized');

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

sections.forEach(section => {
    if (section.id) scrollSpyObserver.observe(section);
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('scroll-progress').style.width = scrolled + "%";
});
