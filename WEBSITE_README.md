# Git-ripper Website

A beautiful, modern MERN stack website for the Git-ripper npm package. This website showcases the features, provides documentation, examples, and statistics for the Git-ripper CLI tool.

## 🚀 Features

- **Modern Design**: Beautiful, responsive design with smooth animations
- **MERN Stack**: MongoDB (future), Express.js, React, Node.js
- **Real-time Stats**: Live statistics and download trends
- **Interactive Examples**: Copy-paste ready command examples
- **Comprehensive Docs**: Complete documentation with troubleshooting
- **Contact Form**: Contact form with validation
- **SEO Optimized**: Meta tags, structured data, and semantic HTML

## 🛠️ Tech Stack

### Frontend

- **React 18** with Vite for fast development
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Chart.js** for data visualization
- **React Router** for navigation
- **React Helmet** for SEO

### Backend

- **Express.js** with ES modules
- **CORS** and security middleware
- **Rate limiting** and compression
- **NPM and GitHub API integration**
- **Contact form handling**

## 📦 Installation

### Prerequisites

- Node.js 16 or higher
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## 🏗️ Project Structure

```
git-ripper-website/
├── backend/
│   ├── routes/
│   │   ├── npmStats.js
│   │   ├── github.js
│   │   └── contact.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   └── sections/
│   │   ├── pages/
│   │   └── App.jsx
│   ├── public/
│   └── package.json
└── README.md
```

## 🎨 Design System

The website uses a carefully crafted design system with:

- **Color Palette**: Primary blues, secondary grays, accent yellows
- **Typography**: Inter for UI, JetBrains Mono for code
- **Components**: Reusable card, button, and form components
- **Animations**: Smooth enter/exit animations with Framer Motion

## 🔧 Environment Variables

### Backend (.env)

```
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=contact@example.com

# GitHub API (Optional)
GITHUB_TOKEN=your-github-token
```

## 📄 Pages

1. **Home** - Hero, features, how it works, examples, stats, testimonials
2. **Documentation** - Complete usage guide and troubleshooting
3. **Examples** - Real-world command examples organized by category
4. **Statistics** - Live usage stats, charts, and community metrics
5. **Contact** - Contact form and FAQ section

## 🔗 API Endpoints

### NPM Statistics

- `GET /api/npm/stats/:packageName` - Get package statistics
- `GET /api/npm/trend/:packageName` - Get download trends

### GitHub Integration

- `GET /api/github/repo/:owner/:repo` - Get repository information
- `GET /api/github/repo/:owner/:repo/languages` - Get repository languages
- `GET /api/github/repo/:owner/:repo/activity` - Get commit activity

### Contact

- `POST /api/contact/send` - Send contact form message

## 🚀 Deployment

### Frontend (Vercel/Netlify)

```bash
cd frontend
npm run build
# Deploy dist/ folder
```

### Backend (Railway/Heroku)

```bash
cd backend
# Set environment variables
# Deploy with your preferred platform
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Git-ripper CLI tool by [sairajB](https://github.com/sairajB)
- Design inspiration from modern developer tools
- Community feedback and contributions

---

Made with ❤️ for the Git-ripper community
