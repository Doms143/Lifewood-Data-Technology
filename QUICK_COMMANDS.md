# Quick Command Reference
## Copy & Paste Commands for Lifewood Project

### Initial Setup (Run Once)

```bash
# Navigate to project directory
cd lifewood-project

# Install all dependencies
npm install
```

---

### Development (Daily Usage)

```bash
# Start development server (auto-reload on save)
npm run dev

# Open in browser: http://localhost:5173
```

Press `Ctrl + C` to stop the server.

---

### Production Build

```bash
# Create optimized production build
npm run build

# Output: dist/ folder with all bundled files
```

---

### Testing the Build

```bash
# Option 1: Preview with Vite
npm run preview

# Option 2: Serve with PHP (in project directory)
php -S localhost:8000

# Then open: http://localhost:8000/index.php
```

---

### Troubleshooting Commands

```bash
# Clear npm cache (if install fails)
npm cache clean --force

# Check for security vulnerabilities
npm audit

# Fix vulnerabilities automatically
npm audit fix

# Update all packages (be careful!)
npm update

# See installed packages
npm list

# See outdated packages
npm outdated

# Find what's using port 5173 (Mac/Linux)
lsof -i :5173

# Find what's using port 5173 (Windows)
netstat -ano | findstr :5173
```

---

### File Customization Quick References

| What to Change | File | Lines |
|---|---|---|
| Headline & CTA | `src/components/Hero.jsx` | 31, 37-40 |
| Services | `src/components/Services.jsx` | 8-31 |
| Global Stats | `src/components/Stats.jsx` | 5-20 |
| Footer Content | `src/components/Footer.jsx` | 25-60 |
| Colors | `tailwind.config.js` | 12-18 |
| Font | `index.html` + `tailwind.config.js` | 11-12 + config |

---

### Key Directories

```
src/            ← React components (edit these)
dist/           ← Build output (don't edit, auto-generated)
public/         ← Static assets (place images here)
node_modules/   ← Dependencies (don't edit)
```

---

### Environment Variables (Optional)

Create `.env.local` in project root:
```
VITE_API_URL=https://api.example.com
VITE_APP_NAME=Lifewood
```

Use in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL
```

---

### Deployment Commands (Once Complete)

```bash
# Final build
npm run build

# Serve locally to verify
php -S localhost:8000

# If all looks good, upload 'dist/' folder and 'index.php' to server
```

---

### Git Commands (If Using Version Control)

```bash
# Initialize git (first time only)
git init

# See what changed
git status

# Stage changes
git add .

# Commit changes
git commit -m "Your message here"

# Push to remote
git push origin main
```

---

### Docker (Optional - For Advanced Users)

```bash
# Build Docker image
docker build -t lifewood .

# Run container
docker run -p 8000:80 lifewood

# Access at: http://localhost:8000
```

---

### Performance & Security Check

```bash
# Check bundle size after build
npm run build
# Check dist/ folder size in file explorer

# Audit for security issues
npm audit

# Fix issues
npm audit fix

# Check what versions are installed
npm list --depth=0
```

---

### Update Dependencies (Quarterly)

```bash
# See what can be updated
npm outdated

# Update everything
npm update

# Update specific package
npm install react@latest

# Always test after updating!
npm run dev
```

---

## Emergency Resets

If everything breaks:

```bash
# Option 1: Delete and reinstall node_modules
rm -rf node_modules
npm install

# Option 2: Delete cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# Option 3: Start completely fresh
rm -rf node_modules dist package-lock.json
npm cache clean --force
npm install
npm run build
```

---

## Need Help?

- Check [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions
- Check [README.md](README.md) for project overview
- Open `src/App.jsx` to see component structure
- Each component has commented sections explaining features

---

**Pro Tip**: Save this file and refer back to it while developing!
