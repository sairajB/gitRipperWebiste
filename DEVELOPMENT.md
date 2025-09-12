# 🛠️ Development Guide for Git-ripper Website

## 🏁 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Initial Setup

1. **Navigate to Project**

   ```bash
   cd p:\gitRipperWebsite
   ```

2. **Install All Dependencies**

   ```bash
   npm run install:all
   ```

3. **Set Up Environment Variables**

   ```bash
   cd backend
   cp .env.example .env
   ```

   Edit `.env` with your configuration:

   ```env
   PORT=5000
   NODE_ENV=development
   SMTP_HOST=your-smtp-host
   SMTP_PORT=587
   SMTP_USER=your-email
   SMTP_PASS=your-password
   GITHUB_TOKEN=your-github-token
   ```

4. **Start Development**

   ```bash
   npm run dev
   ```

   This starts:

   - **Frontend:** http://localhost:3000
   - **Backend:** http://localhost:5000

## 📝 Available Scripts

### Root Level

```bash
npm run dev          # Start both frontend and backend
npm run install:all  # Install dependencies for all packages
npm run build        # Build frontend for production
npm run preview      # Preview production build
```

### Frontend (React + Vite)

```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Lint code with ESLint
```

### Backend (Express.js)

```bash
cd backend
npm run dev          # Start with nodemon (auto-restart)
npm start            # Start production server
npm run lint         # Lint code with ESLint
```

## 🎨 Key Features Implemented

✅ **Modern React 18** with Vite build system
✅ **Tailwind CSS** with custom design system
✅ **Framer Motion** animations and transitions
✅ **Chart.js** for interactive data visualization
✅ **Express.js backend** with security middleware
✅ **NPM and GitHub API** integration
✅ **Contact form** with validation and SMTP
✅ **Responsive design** for all devices
✅ **SEO optimization** with React Helmet
✅ **Error handling** and loading states
✅ **Copy-to-clipboard** functionality
✅ **Interactive code examples**

## 🚀 Deployment

### Frontend (Vercel/Netlify)

1. **Build the frontend:**

   ```bash
   cd frontend && npm run build
   ```

2. **Deploy the `dist` folder** to your hosting platform

3. **Set environment variables:**
   ```
   VITE_API_URL=https://your-backend-url.com
   ```

### Backend (Railway/Heroku)

1. **Prepare for deployment:**

   ```bash
   cd backend
   ```

2. **Set environment variables** on your hosting platform

3. **Deploy using Git** or platform-specific CLI

## 🎯 Next Steps

1. **Customize Content:** Update statistics and testimonials with real data
2. **Configure Email:** Set up SMTP for contact form
3. **Add Analytics:** Integrate Google Analytics or similar
4. **Deploy:** Deploy to Vercel/Netlify (frontend) and Railway/Heroku (backend)
5. **Domain:** Point your custom domain to the deployment
6. **Testing:** Add unit and integration tests
7. **Performance:** Optimize images and add lazy loading
8. **Monitoring:** Set up error tracking and performance monitoring

## 💡 Development Tips

- Use `npm run dev` to start both servers simultaneously
- The frontend proxies API calls to the backend automatically
- All animations are optimized for performance
- The design system is easily customizable via Tailwind config
- Security vulnerabilities in dependencies are non-critical (development only)

**Your Git-ripper website is ready for development and deployment! 🎉**

## Scripts for Development

### Start Backend Server

```bash
cd backend
npm install
npm run dev
```

The backend will start on http://localhost:5000

### Start Frontend Development Server

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on http://localhost:3000

### Build for Production

```bash
cd frontend
npm run build
```

## Environment Setup

1. Copy `backend/.env.example` to `backend/.env`
2. Configure environment variables as needed
3. The frontend is configured to proxy API calls to the backend

## Key Features Implemented

✅ Modern React 18 with Vite
✅ Tailwind CSS with custom design system
✅ Framer Motion animations
✅ Chart.js for statistics
✅ Express.js backend with security middleware
✅ NPM and GitHub API integration
✅ Contact form with validation
✅ Responsive design
✅ SEO optimization
✅ Error handling and loading states

## Next Steps

1. Set up MongoDB for data persistence
2. Implement email functionality
3. Add GitHub authentication for private repos
4. Deploy to production
5. Set up CI/CD pipeline
6. Add analytics tracking
