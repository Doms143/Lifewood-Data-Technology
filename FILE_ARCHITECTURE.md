# Lifewood Project - File Architecture Guide

## Project Overview

This is a React-based landing page built with Vite, Tailwind CSS, and Framer Motion.

---

## 📁 Complete Directory Tree

```
lifewood-project/
│
├── src/                          [React source code]
│   ├── components/
│   │   ├── Hero.jsx              [Main hero section with headline & CTA]
│   │   ├── Services.jsx          [6 service cards - Computer Vision, NLP, etc]
│   │   ├── Stats.jsx             [Global statistics section]
│   │   └── Footer.jsx            [Corporate footer with links]
│   │
│   ├── App.jsx                   [Main component - imports all sections]
│   ├── main.jsx                  [React entry point]
│   └── index.css                 [Tailwind CSS imports & base styles]
│
├── public/                       [Static assets (empty, for future use)]
│
├── dist/                         [Production build (auto-generated)]
│   ├── index.html
│   └── assets/
│       ├── index-[hash].js
│       └── index-[hash].css
│
├── index.html                    [HTML template]
├── index.php                     [PHP server - serves dist/ folder]
│
├── Configuration Files:
│   ├── vite.config.js            [Vite bundler config]
│   ├── tailwind.config.js        [Tailwind CSS customization]
│   ├── postcss.config.js         [PostCSS plugins]
│   ├── package.json              [Dependencies & scripts]
│   └── .gitignore                [Git ignore rules]
│
└── Documentation:
    ├── README.md                 [Project overview & quick start]
    ├── SETUP_GUIDE.md            [Detailed setup instructions]
    └── QUICK_COMMANDS.md         [Handy command reference]
```

---

## 📄 Component Breakdown

### Hero.jsx - Main Hero Section
**Purpose**: Eye-catching welcome section with call-to-action  
**Features**:
- Animated headline with gradient text
- "Get Started" and "Learn More" buttons
- 3 quick stats (30+ Countries, 10K+ Professionals, 500M+ Data Points)
- Animated AI robot illustration
- Staggered animation entrance

**Key Elements**:
```jsx
<h1> "Powering AI with <teal>Human Intelligence</teal>"
<button> "Get Started" → Links to action
<button> "Learn More" → Information link
Stats: {30+, 10K+, 500M+}
```

---

### Services.jsx - Service Cards Section
**Purpose**: Showcase the 6 main service offerings  
**Features**:
- 6 service cards in responsive grid
- Icons from Lucide React (Eye, MessageCircle, Shield, Zap, BarChart3, Code)
- Hover animations (lift on hover)
- Descriptions for each service:
  1. Computer Vision
  2. Natural Language Processing
  3. Content Moderation
  4. Data Labeling
  5. Analytics & Insights
  6. Custom AI Solutions

**Layout**:
- 1 column on mobile
- 2 columns on tablet
- 3 columns on desktop

---

### Stats.jsx - Global Impact Section
**Purpose**: Emphasize company scale and global presence  
**Features**:
- 3 main statistics with icons
- Each stat has animated icon circle
- Trust statement at bottom
- Gradient background (corporate blue)
- Information about global operations

**Stats Displayed**:
- 30+ Countries worldwide
- 10,000+ Data Professionals
- 500M+ Data Points processed

---

### Footer.jsx - Corporate Footer
**Purpose**: Provide company info, links, and contact  
**Features**:
- Company description
- Social media links (LinkedIn, Twitter, Facebook)
- Service links
- Company links
- Contact information (Email, Phone, Address)
- Legal links (Privacy, Terms, Cookie Policy)
- Copyright notice

**Layout**:
- 4 columns on desktop
- Stacked on mobile
- Social icons with hover animations

---

### App.jsx - Root Component
**Purpose**: Combines all sections into one page  
**Structure**:
```jsx
export default App() {
  return (
    <div>
      <Hero />         ← Hero section
      <Services />     ← Services cards
      <Stats />        ← Global impact stats
      <Footer />       ← Footer
    </div>
  )
}
```

This is the simplest file - it's just an orchestrator.

---

## 🎨 Color System

Defined in `tailwind.config.js`:

| Variable | Hex Code | Usage |
|----------|----------|-------|
| corporate-blue | #0D47A1 | Primary background |
| dark-blue | #1A237E | Section backgrounds |
| teal-accent | #00897B | Button accents |
| light-teal | #4DB6AC | Text highlights |
| white | #FFFFFF | Text on dark |
| gray | #F5F5F5 | Light backgrounds |

### Usage in Components:
```jsx
className="bg-corporate-blue"          // Dark blue background
className="text-light-teal"            // Teal text
className="hover:bg-teal-accent"       // Hover state
className="border-light-teal"          // Border color
```

---

## 🎬 Animation Types Used

### Framer Motion Features Implemented:

1. **Staggered Entry Animations**
   - Children animate one after another
   - Smooth, cascading effect

2. **Hover Animations**
   - Cards lift up on hover
   - Icons rotate and scale
   - Buttons scale slightly larger

3. **Scroll-triggered Animations**
   - Sections animate into view as user scrolls
   - Uses `whileInView` prop

4. **Continuous Animations**
   - Animated gradient circles in Hero
   - Floating emoji animation
   - Infinite loops for visual interest

### Motion Examples:
```jsx
// Fade in and move down
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}

// Hover lift effect
whileHover={{ y: -10 }}

// Continuous rotation
animate={{ rotate: 360 }}
transition={{ duration: 2, repeat: Infinity }}
```

---

## 🔧 Configuration Files Explained

### package.json
Contains project metadata and dependencies:
```json
{
  "scripts": {
    "dev": "vite",              // Start dev server
    "build": "vite build",      // Create production build
    "preview": "vite preview"   // Preview production build
  },
  "dependencies": {
    "react": "^18.2.0",
    "framer-motion": "^10.16.4",
    "lucide-react": "^0.263.1"
  }
}
```

### vite.config.js
Tells Vite how to bundle the project:
```javascript
export default defineConfig({
  plugins: [react()],           // Enable React
  build: {
    outDir: 'dist',             // Output folder
    assetsDir: 'assets',        // Assets subfolder
  },
})
```

### tailwind.config.js
Customizes Tailwind CSS:
```javascript
theme: {
  extend: {
    colors: { /* custom colors */ },
    fontFamily: { /* custom fonts */ }
  }
}
```

### postcss.config.js
Processes CSS (Tailwind and autoprefixer):
```javascript
{
  tailwindcss: {},    // Tailwind plugin
  autoprefixer: {},   // Browser prefixes
}
```

### index.html
Main HTML template (Vite uses this):
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Google Fonts -->
    <link href="...fonts.googleapis.com...Inter...">
  </head>
  <body>
    <div id="root"></div>  ← React mounts here
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### index.php
Serves the built React app and handles routing:
```php
// Serves files from dist/ folder
// Routes all requests to index.html (SPA routing)
// Sets appropriate MIME types for assets
// Enables caching for static files
```

---

## 📱 Responsive Breakpoints (Tailwind)

Used throughout components:

```javascript
// Mobile First Approach
sm:  640px    // Small devices
md:  768px    // Medium (tablets)
lg:  1024px   // Large (desktops)
xl:  1280px   // Extra large
2xl: 1536px   // Huge screens
```

### Example Usage:
```jsx
<div className="block md:grid grid-cols-3 gap-8">
  {/* Block on mobile, 3-column grid on tablets+ */}
</div>
```

---

## 🔄 Data Flow

```
Browser Request
    ↓
index.php (PHP Server)
    ↓
dist/index.html (React HTML)
    ↓
React Loads (src/main.jsx)
    ↓
App.jsx Mounts
    ├→ Hero Component
    ├→ Services Component
    ├→ Stats Component
    └→ Footer Component
    ↓
Framer Motion Animations
    ↓
Tailwind CSS Styling
    ↓
Interactive Page
```

---

## 🎯 How to Modify

### Add a New Service Card
Edit `src/components/Services.jsx`:
```jsx
const services = [
  // ... existing services
  {
    icon: YourIcon,              // Import from lucide-react
    title: 'New Service',
    description: 'Your description here.',
  },
]
```

### Change Hero Headline
Edit `src/components/Hero.jsx` line 31:
```jsx
<h1>Your new headline</h1>
```

### Add New Section
1. Create `src/components/NewSection.jsx`
2. Import in `src/App.jsx`
3. Add to JSX: `<NewSection />`

### Customize Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  'corporate-blue': '#YOUR_COLOR',
  // Use in components with: className="bg-corporate-blue"
}
```

---

## 📦 Dependencies Explained

| Package | Purpose | Version |
|---------|---------|---------|
| react | UI library | 18.2.0 |
| react-dom | React rendering | 18.2.0 |
| vite | Build tool | 4.3.9 |
| tailwindcss | CSS framework | 3.3.0 |
| framer-motion | Animations | 10.16.4 |
| lucide-react | Icons | 0.263.1 |
| postcss | CSS processing | 8.4.24 |
| autoprefixer | CSS prefixes | 10.4.14 |

---

## 🚀 Build Output Structure

After `npm run build`, the `dist/` folder contains:

```
dist/
├── index.html              (Bundled HTML with inline CSS)
├── assets/
│   ├── index-[hash].js     (Bundled React + dependencies)
│   ├── index-[hash].css    (Bundled Tailwind styles)
│   └── [font files]        (If using custom fonts)
```

**Why the hashes?** 
- `[hash]` = content hash
- Changed files get new hash
- Helps with browser caching
- Example: `index-a3f2c1.js`

---

## 🔒 Security Features

- **XSS Protection**: React escapes output by default
- **CSRF**: Not needed for static site
- **Headers** (in index.php):
  - `X-Content-Type-Options: nosniff` - Prevents MIME type sniffing
  - `X-Frame-Options: DENY` - Prevents clickjacking
  - `X-XSS-Protection: 1` - Enable XSS filter

---

## 🌐 Deployment Paths

### PHP Server Path
```
Domain: https://example.com/
Project: /var/www/html/lifewood-project/
Access: https://example.com/lifewood-project/index.php
```

### XAMPP Path (Windows Development)
```
Location: C:\xampp\htdocs\lifewood-project\
Access: http://localhost/lifewood-project/index.php
```

### Direct Domain (Recommended)
```
Copy dist/ contents to root
Copy index.php to root
Access: https://yourdomain.com/
```

---

## 📊 Performance Optimization

- **Minified**: All code is minified (Vite)
- **Tree-shaken**: Unused code removed (Vite)
- **Lazy Loading**: Components load on demand (optional)
- **CSS Purging**: Only used styles included (Tailwind)
- **Image Optimization**: Use WebP format when possible
- **Caching**: Static assets cached via PHP headers

---

## ✅ Testing Checklist

- [ ] `npm run dev` starts without errors
- [ ] Page loads at `http://localhost:5173`
- [ ] Hero section animates on load
- [ ] Service cards lift on hover
- [ ] Stats section animates on scroll
- [ ] Footer links are clickable
- [ ] Mobile responsive (tested at 320px width)
- [ ] Tablet view works (tested at 768px)
- [ ] Desktop view works (tested at 1024px+)
- [ ] `npm run build` completes successfully
- [ ] `dist/` folder has files
- [ ] PHP server serves the app
- [ ] No console errors (F12 > Console)

---

## 🆘 File Reference Quick Links

| Need | File | Action |
|------|------|--------|
| Change headline | Hero.jsx | Edit line ~31 |
| Add service | Services.jsx | Add to services array |
| Update stats | Stats.jsx | Edit stats object |
| Change colors | tailwind.config.js | Edit colors object |
| Add font | index.html | Add Google Fonts link |
| Deploy | index.php | Upload to server |

---

**Document Version**: 1.0  
**Last Updated**: February 18, 2026
