# Blog Feature Plan

> **Project Type:** WEB (static portfolio enhancement)  
> **Primary Agent:** `frontend-specialist`

---

## Overview

Enhance the portfolio website with a proper blog system:
1. **Blog Section on Home Page** - Latest 2-3 posts preview
2. **Dedicated Blogs Page** - All posts, latest first, scrollable

---

## Success Criteria

- [ ] Home page shows latest 2-3 blog post cards
- [ ] Blogs page lists all posts (newest → oldest)
- [ ] Each post card links to full article
- [ ] Consistent design with existing portfolio aesthetic
- [ ] Responsive on mobile

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML/CSS | Page structure & styling |
| Vanilla JS | Blog card rendering |
| Existing Vite setup | Build tooling |

---

## File Structure

```
web-anti/
├── index.html          [MODIFY] Add blog section before Contact
├── blogs.html          [NEW] Dedicated blogs listing page
├── blog.html           [KEEP] Individual blog post (RIVO)
├── style.css           [MODIFY] Add blog card & grid styles
└── main.js             [MODIFY] Blog card interactions (optional)
```

---

## Task Breakdown

### Phase 1: Home Page Blog Section

#### Task 1.1: Add Blog Section HTML
- **Agent:** `frontend-specialist`
- **INPUT:** Current `index.html` (Projects section ends at line ~253)
- **OUTPUT:** New `<section id="blog">` with 2-3 blog cards before Contact
- **VERIFY:** Section visible, cards display correctly

#### Task 1.2: Style Blog Cards
- **Agent:** `frontend-specialist`  
- **INPUT:** `style.css`
- **OUTPUT:** `.blog-section`, `.blog-card`, `.blog-card-grid` styles
- **VERIFY:** Cards match portfolio aesthetic (glassmorphism, accent colors)

---

### Phase 2: Blogs Listing Page

#### Task 2.1: Create blogs.html
- **Agent:** `frontend-specialist`
- **INPUT:** Existing `blog.html` as template
- **OUTPUT:** New `blogs.html` with all posts listed
- **VERIFY:** Page loads, shows posts newest first

#### Task 2.2: Update Navigation
- **Agent:** `frontend-specialist`
- **INPUT:** Both `index.html` and `blog.html` navbars
- **OUTPUT:** "Blog" link points to `blogs.html`, add NeoFlap Game to blog.html nav
- **VERIFY:** Navigation consistent across all pages

---

### Phase 3: Polish & Verify

#### Task 3.1: Mobile Responsiveness
- **Agent:** `frontend-specialist`
- **INPUT:** All CSS blog styles
- **OUTPUT:** Media queries for mobile blog cards
- **VERIFY:** Cards stack properly on mobile

#### Task 3.2: Final Verification
- **VERIFY:** 
  - [ ] Home blog section shows latest posts
  - [ ] Blogs page lists all posts (scrollable)
  - [ ] Links work correctly
  - [ ] Responsive on mobile
  - [ ] Theme toggle works on new pages

---

## Phase X: Verification Checklist

```bash
# Run after implementation
npm run build
npm run dev
# Manual: Check home page blog section
# Manual: Check blogs.html page
# Manual: Test on mobile viewport
```

- [ ] No console errors
- [ ] All links functional
- [ ] Responsive design verified
- [ ] Theme (dark/light) works

---

## Notes

- Existing `blog.html` contains RIVO bot article - keep as individual post
- New `blogs.html` will be the listing page (all posts)
- Future: Can add more individual blog post HTML files as content grows
