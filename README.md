# Lifewood Data Technology - Landing Page

A high-fidelity, modern landing page for Lifewood Data Technology built with React, Vite, Tailwind CSS, and Framer Motion.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- PHP (for serving the built application)

### Installation & Setup

1. **Clone or navigate to the project directory**
```bash
cd lifewood-project
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

### Building for Production

1. **Build the React app**
```bash
npm run build
```
This creates an optimized build in the `dist/` folder.

2. **Serve with PHP**
Place the entire project in your web server directory and access via:
```
http://localhost/lifewood-project/index.php
```

### Project Structure
```
lifewood-project/
├── src/
│   ├── components/
│   │   ├── Hero.jsx        # Hero section with headline and CTA
│   │   ├── Services.jsx    # Services cards section
│   │   ├── Stats.jsx       # Global stats section
│   │   └── Footer.jsx      # Corporate footer
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # React entry point
│   └── index.css           # Tailwind imports
├── public/                 # Static assets
├── dist/                   # Build output
├── index.html              # HTML template
├── index.php               # PHP server file
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
└── package.json            # Dependencies
```

## 🎨 Design Features

- **Color Palette**: Corporate Deep Blue, Clean White, Teal/Green accents
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Framer Motion for entrance and hover effects
- **Modern Icons**: Lucide React for scalable SVG icons
- **Accessibility**: Semantic HTML and ARIA compliant

## 📦 Dependencies

- **React 18.2**: UI library
- **Vite**: Fast build tool
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Lucide React**: Icon library

## 🔧 Configuration

### Tailwind CSS Color Customization
Edit `tailwind.config.js` to modify the color palette:
```javascript
colors: {
  'corporate-blue': '#0D47A1',
  'dark-blue': '#1A237E',
  'teal-accent': '#00897B',
  'light-teal': '#4DB6AC',
}
```

### Vite Build Output
The build output is configured to be in the `dist/` folder. The PHP file will serve from this location.

## 📝 Customization

### Hero Section
Edit [src/components/Hero.jsx](src/components/Hero.jsx) to change:
- Headline text
- CTA button text and links
- Stats numbers

### Services
Edit [src/components/Services.jsx](src/components/Services.jsx) to:
- Add/remove service cards
- Change service descriptions
- Modify icons

### Stats Section
Edit [src/components/Stats.jsx](src/components/Stats.jsx) to:
- Update global statistics
- Change section messaging

### Footer
Edit [src/components/Footer.jsx](src/components/Footer.jsx) to:
- Update contact information
- Add/remove social links
- Modify footer links

## 🚀 Deployment

### Using PHP
1. Run `npm run build`
2. Upload entire project to your web server
3. Access via `http://yourdomain.com/index.php`

### Using Node.js
```bash
npm run preview
```

### Docker (Optional)
Create a `Dockerfile`:
```dockerfile
FROM php:8-apache
COPY . /var/www/html/
RUN a2enmod rewrite
```

## 📄 License

Copyright © 2024 Lifewood Data Technology. All rights reserved.

## 🤝 Support

For issues or questions:
- Email: hello@lifewood.com
- Phone: +1 (555) 123-4567
