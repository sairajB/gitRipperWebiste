# Deployment Guide for Git Ripper Website

## Deploy to Vercel

### Prerequisites

1. Create a [Vercel account](https://vercel.com)
2. Install Vercel CLI: `npm i -g vercel`
3. Push your code to GitHub

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:

   - **Framework Preset**: Other
   - **Root Directory**: Leave empty (use root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `frontend/dist`
   - **Install Command**: `npm run install:all`

5. Set Environment Variables:

   ```
   NODE_ENV=production
   FRONTEND_URL=https://your-domain.vercel.app
   PORT=5000
   ```

6. Click "Deploy"

### Option 2: Deploy via CLI

1. Login to Vercel:

   ```bash
   vercel login
   ```

2. In your project root, run:

   ```bash
   vercel
   ```

3. Follow the prompts:

   - Link to existing project? No
   - Project name: git-ripper-website
   - Directory: ./
   - Want to override settings? Yes
   - Build Command: `npm run build`
   - Output Directory: `frontend/dist`
   - Development Command: `npm run dev`

4. Set environment variables:

   ```bash
   vercel env add NODE_ENV
   # Enter: production

   vercel env add FRONTEND_URL
   # Enter: https://your-domain.vercel.app
   ```

5. Deploy:
   ```bash
   vercel --prod
   ```

### Environment Variables to Set in Vercel

| Variable        | Value                            | Description             |
| --------------- | -------------------------------- | ----------------------- |
| `NODE_ENV`      | `production`                     | Environment mode        |
| `FRONTEND_URL`  | `https://your-domain.vercel.app` | Frontend URL for CORS   |
| `SMTP_HOST`     | Your SMTP host                   | For contact form emails |
| `SMTP_PORT`     | `587`                            | SMTP port               |
| `SMTP_USER`     | Your email                       | SMTP username           |
| `SMTP_PASS`     | Your password                    | SMTP password           |
| `CONTACT_EMAIL` | contact@yourdomain.com           | Contact form recipient  |

### Custom Domain (Optional)

1. In Vercel Dashboard, go to your project
2. Click on "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed by Vercel
5. Update `FRONTEND_URL` environment variable to your custom domain

### Troubleshooting

- **Build fails**: Check the build logs in Vercel dashboard
- **API not working**: Ensure environment variables are set correctly
- **CORS errors**: Make sure `FRONTEND_URL` matches your deployed domain
- **404 on refresh**: Vercel automatically handles SPA routing with the current config

### Monitoring

- Check deployment status in Vercel Dashboard
- Monitor function logs in Vercel for backend issues
- Use Vercel Analytics for performance insights
