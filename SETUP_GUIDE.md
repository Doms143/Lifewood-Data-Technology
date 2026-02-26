# Lifewood Data Technology - Setup Guide
## "Zero to Hero" Implementation Guide

Welcome! This guide will walk you through setting up the Lifewood Data Technology landing page from scratch.

---

## 📋 Overview

This project is a complete landing page for Lifewood Data Technology with:
- **Framework**: React.js with Vite (for ultra-fast development)
- **Styling**: Tailwind CSS (utility-first CSS framework)
- **Animations**: Framer Motion (smooth, professional animations)
- **Icons**: Lucide React (modern SVG icons)
- **Deployment**: PHP server for serving the built application

---

## 🎯 What You'll Have

✅ Responsive landing page with Hero, Services, Stats, and Footer  
✅ Professional animations and transitions  
✅ Mobile-optimized design  
✅ SEO-friendly structure  
✅ Production-ready build  
✅ Easy PHP deployment  

---

## 📦 Prerequisites

Before starting, ensure you have:

1. **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
2. **npm** (comes with Node.js) or **yarn**
3. **PHP** (v7.4 or higher) for serving - [Download](https://www.php.net/downloads)
4. **Git** (optional) - [Download](https://git-scm.com/)
5. A **code editor** (VS Code recommended) - [Download](https://code.visualstudio.com/)

### Verify Installation

```bash
node --version   # Should be v16+
npm --version    # Should be v7+
php --version    # Should be v7.4+
```

---

## 🚀 Step 1: Install Dependencies

Navigate to the project directory and install all required packages:

```bash
cd lifewood-project
npm install
```

This command will:
- Download React and React DOM
- Install Vite (build tool)
- Install Tailwind CSS and PostCSS
- Install Framer Motion and Lucide React
- Download all other dependencies listed in `package.json`

**Expected output**: Shows progress and completes with "added X packages"

---

## 💻 Step 2: Run Development Server

Start the development server to see your changes in real-time:

```bash
npm run dev
```

**What happens**:
- Compilation starts
- You'll see: `Local: http://localhost:5173/`
- Open your browser to that URL
- The page will auto-refresh when you make changes

**To stop**: Press `Ctrl + C` in the terminal

### Hot Module Replacement (HMR)
React Fast Refresh is enabled, meaning:
- Save a file → Changes appear instantly in browser
- Component state is preserved during edits
- Errors show up immediately

---

## 🎨 Step 3: Customize Content

Edit these files to customize the landing page:

### Hero Section
**File**: `src/components/Hero.jsx`
- Line 31: Change headline
- Line 37-40: Update description
- Update stats numbers (lines 57-65)

### Services Section
**File**: `src/components/Services.jsx`
- Lines 8-31: Edit service cards
- Add/remove services from the array
- Change icons (import from lucide-react)

### Stats Section
**File**: `src/components/Stats.jsx`
- Lines 5-20: Modify global statistics
- Update section title and description

### Footer Section
**File**: `src/components/Footer.jsx`
- Update company info (line 25)
- Add/remove footer links
- Update contact information

### Styling
**File**: `tailwind.config.js`
```javascript
colors: {
  'corporate-blue': '#0D47A1',    // Main blue
  'dark-blue': '#1A237E',         // Dark accent
  'teal-accent': '#00897B',       // Green accent
  'light-teal': '#4DB6AC',        // Light green
}
```

---

## 🔧 Step 4: Build for Production

When you're ready to deploy, create an optimized production build:

```bash
npm run build
```

**What happens**:
- React code is minified and optimized
- Tailwind CSS is purged (only used styles included)
- Assets are bundled and hashed for caching
- Output goes to `dist/` folder
- Process takes 10-30 seconds

**Expected directory structure after build**:
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [other assets]
```

### Build Verification

Check that `dist/` folder was created:
```bash
dir dist/     # Windows
ls -la dist/  # Mac/Linux
```

---

## 🌐 Step 5: Serve with PHP

The `index.php` file handles routing and serving the React app.

### Option A: Using PHP Built-in Server (Quick Testing)

```bash
php -S localhost:8000
```

Then open: `http://localhost:8000/index.php`

**Note**: This is for testing only, not production.

### Option B: Using a Web Server (Production)

#### Windows (IIS)
1. Copy project to `C:\inetpub\wwwroot\lifewood-project\`
2. Create IIS Website pointing to this folder
3. Access at `http://localhost/lifewood-project/index.php`

#### Windows (XAMPP - Recommended for Development)
1. Download [XAMPP](https://www.apachefriends.org/)
2. Extract project to `C:\xampp\htdocs\lifewood-project\`
3. Start Apache from XAMPP Control Panel
4. Access at `http://localhost/lifewood-project/index.php`

#### Linux/Mac (Apache)
1. Copy project to `/var/www/html/lifewood-project/`
2. Set permissions: `sudo chown -R www:www /var/www/html/lifewood-project/`
3. Start Apache: `sudo systemctl start apache2`
4. Access at `http://localhost/lifewood-project/index.php`

#### Linux/Mac (nginx)
Create `/etc/nginx/sites-available/lifewood`:
```nginx
server {
    listen 80;
    server_name localhost;
    root /var/www/html/lifewood-project;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
    }
}
```

### Testing the Build

```bash
# Terminal 1: Build the project
npm run build

# Terminal 2: Serve with PHP
php -S localhost:8000

# Then open browser: http://localhost:8000/index.php
```

---

## 📁 File Structure Explained

```
lifewood-project/
│
├── src/
│   ├── components/
│   │   ├── Hero.jsx           ← Hero section (headline, CTA, stats)
│   │   ├── Services.jsx       ← Services cards (6 service offerings)
│   │   ├── Stats.jsx          ← Global impact statistics
│   │   └── Footer.jsx         ← Corporate footer with links
│   │
│   ├── App.jsx                ← Main component (imports all sections)
│   ├── main.jsx               ← React entry point
│   └── index.css              ← Tailwind CSS imports
│
├── public/                    ← Static assets (unused in this setup)
│
├── dist/                      ← Generated build folder (after npm run build)
│   ├── index.html             ← Bundled HTML
│   └── assets/                ← Bundled JS/CSS
│
├── index.html                 ← HTML template (Vite uses this)
├── index.php                  ← PHP server (serves dist/ folder)
│
├── vite.config.js             ← Vite bundler configuration
├── tailwind.config.js         ← Tailwind CSS customization
├── postcss.config.js          ← PostCSS configuration
├── package.json               ← Project dependencies
└── .gitignore                 ← Git ignore rules
```

---

## 🔄 Development Workflow

### Daily Development

1. **Start dev server**:
```bash
npm run dev
```

2. **Edit files** in `src/` folder

3. **Browser auto-refreshes** (HMR)

4. **When done for the day**: Press `Ctrl + C` to stop

### Before Deployment

1. **Build**:
```bash
npm run build
```

2. **Test the build** locally:
```bash
npm run preview
# Or use PHP: php -S localhost:8000
```

3. **Fix any issues**, rebuild, re-test

4. **Deploy** `dist/` folder to server

---

## 🚢 Deployment Checklist

- [ ] Run `npm run build` successfully
- [ ] `dist/` folder is created and populated
- [ ] Test build locally (npm run preview or PHP)
- [ ] All pages load without errors
- [ ] Mobile responsiveness works
- [ ] Links and CTAs are functional
- [ ] Copy `index.php` to server
- [ ] Set correct permissions (if on Linux: `chmod 755`)
- [ ] Test on live server in multiple browsers
- [ ] Optimize images (optional but recommended)
- [ ] Add analytics (optional)

---

## 🐛 Troubleshooting

### Issue: "Port 5173 is already in use"
```bash
# Find and kill process on port 5173
lsof -i :5173                    # Mac/Linux
netstat -ano | findstr :5173    # Windows

# Then kill it (use the PID from above)
kill -9 <PID>                    # Mac/Linux
taskkill /PID <PID> /F          # Windows
```

### Issue: Dependencies won't install
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: Tailwind CSS not loading
- Run: `npm run build` (production build)
- Restart dev server: `npm run dev`
- Check that `index.css` has Tailwind imports

### Issue: PHP shows "404 - Not Found"
- Verify `dist/` folder exists: `npm run build`
- Check that `index.php` is in project root
- Ensure PHP can read the files (check permissions)

### Issue: Images not loading
- Place images in `public/` folder
- Reference as: `<img src="/images/my-image.png" />`
- Rebuild: `npm run build`

---

## 📱 Responsive Design Testing

The site is optimized for:
- **Mobile**: 320px and up
- **Tablet**: 768px and up
- **Desktop**: 1024px and up

**Test on mobile**:
```bash
# Open dev tools in browser
Press: F12

# Toggle device toolbar
Press: Ctrl + Shift + M (or Cmd + Shift + M on Mac)
```

---

## 🎨 Customization Quick Start

### Change Color Scheme
Edit `tailwind.config.js`:
```javascript
colors: {
  'primary': '#YOUR_HEX_COLOR',
  // Update all components to use primary instead of corporate-blue
}
```

### Change Font
Edit `index.html` (lines 11-12):
```html
<!-- Replace Google Fonts link -->
<link href="https://fonts.googleapis.com/css2?family=YOUR_FONT&display=swap" rel="stylesheet">
```

Edit `tailwind.config.js`:
```javascript
fontFamily: {
  'sans': ['YOUR_FONT', 'system-ui', 'sans-serif'],
}
```

### Add New Section
1. Create `src/components/NewSection.jsx`
2. Import in `src/App.jsx`
3. Add to JSX: `<NewSection />`

---

## 📊 Performance Tips

### Before Deployment

1. **Optimize images**:
   - Use tools like [TinyPNG](https://tinypng.com/)
   - Convert to WebP format
   - Place in `public/` folder

2. **Check bundle size**:
```bash
npm run build
# Check dist/ folder size (should be < 500KB)
```

3. **Minify and compress**:
   - Vite already does this
   - Enable gzip on server (Apache/nginx)

4. **Lazy load components** (optional):
```javascript
const Hero = lazy(() => import('./components/Hero'))
<Suspense fallback={<div>Loading...</div>}>
  <Hero />
</Suspense>
```

---

## 🔐 Security Considerations

### Before Production

1. **Update dependencies**:
```bash
npm audit
npm audit fix
```

2. **HTTPS**: Use SSL/TLS certificate (Let's Encrypt: free)

3. **Headers**: Add to PHP file:
```php
header("X-Content-Type-Options: nosniff");
header("X-Frame-Options: DENY");
header("X-XSS-Protection: 1; mode=block");
```

4. **CORS**: If calling APIs from other domains, configure properly

---

## 📈 SEO Optimization (Optional)

### Update `index.html`
```html
<meta name="description" content="Your description here">
<meta name="keywords" content="AI, Data, Annotation">
<meta name="author" content="Lifewood Data Technology">
<meta property="og:title" content="Lifewood - AI Data Solutions">
<meta property="og:image" content="https://yourdomain.com/og-image.png">
```

### Add Sitemap (optional)
Create `public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://yourdomain.com/</loc></url>
</urlset>
```

---

## 📞 Support & Resources

### Documentation Links
- [React Docs](https://react.dev/)
- [Vite Docs](https://vitejs.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Lucide React Icons](https://lucide.dev/)

### Community Help
- Stack Overflow: Tag `react`, `vite`, `tailwindcss`
- GitHub Issues: Project repository
- Discord Communities: React, Tailwind CSS

---

## ✨ Next Steps (Advanced)

Once comfortable, consider:

1. **Add dynamic content**: Connect to a backend API
2. **SEO enhancement**: Add structured data, sitemap, robots.txt
3. **Analytics**: Integrate Google Analytics or Mixpanel
4. **Forms**: Add contact form with backend validation
5. **Internationalization**: Support multiple languages
6. **Dark mode**: Add toggle with Tailwind's dark mode
7. **Blog**: Add blogging capability
8. **Admin dashboard**: Manage content from CMS

---

## 🎓 Learning Resources

### React Fundamentals
- Components and Props
- State and Lifecycle
- Hooks (useState, useEffect, useContext)

### Tailwind CSS Mastery
- Utility-first CSS
- Responsive design with breakpoints
- Custom configuration

### Framer Motion Animations
- Motion components
- Variants and transitions
- Gesture animations

---

## ✅ Verification Checklist

After setup, verify:

- [ ] `npm install` completes without errors
- [ ] `npm run dev` starts successfully on port 5173
- [ ] Can see landing page in browser
- [ ] All components render (Hero, Services, Stats, Footer)
- [ ] Animations work smoothly
- [ ] Responsive design works on mobile (F12 > toggle device)
- [ ] `npm run build` creates `dist/` folder
- [ ] Can serve with PHP: `php -S localhost:8000`
- [ ] All links and buttons are clickable
- [ ] No console errors (F12 > Console tab)

---

## 🏁 You're Ready!

Congratulations! You now have:
✅ A professional landing page  
✅ Development environment  
✅ Production build  
✅ Deployment setup  

**Happy coding!** 🚀

---

**Last Updated**: February 18, 2026  
**Version**: 1.0.0
