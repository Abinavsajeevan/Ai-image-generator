# 🚀 Vercel Deployment Guide

This guide will help you deploy your Text-to-Image & Audio application to Vercel.

## 📋 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Git Repository**: Push your code to GitHub, GitLab, or Bitbucket
3. **HuggingFace API Token**: Get your token from [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)

---

## 🎯 Deployment Methods

### **Method 1: Deploy via Vercel Dashboard (Recommended for Beginners)**

#### Step 1: Push Code to GitHub
```bash
# If you haven't initialized git yet
git init
git add .
git commit -m "Initial commit"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

#### Step 2: Import Project to Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Project"**
3. Select your GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `cd client && npm install && npm run build`
   - **Output Directory**: `client/dist`
   - **Install Command**: `npm install --prefix client && npm install --prefix api`

#### Step 3: Add Environment Variables
1. In the Vercel dashboard, go to **Settings** → **Environment Variables**
2. Add the following:
   - **Name**: `HF_TOKEN`
   - **Value**: Your HuggingFace API token
   - **Environment**: Production, Preview, Development (select all)

#### Step 4: Deploy
1. Click **"Deploy"**
2. Wait for the build to complete (usually 1-3 minutes)
3. Your app will be live at `https://your-project-name.vercel.app`

---

### **Method 2: Deploy via Vercel CLI**

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Login to Vercel
```bash
vercel login
```

#### Step 3: Deploy
```bash
# From your project root directory
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (Select your account)
# - Link to existing project? No
# - What's your project's name? (Enter a name)
# - In which directory is your code located? ./
```

#### Step 4: Add Environment Variable
```bash
vercel env add HF_TOKEN
# When prompted, paste your HuggingFace API token
# Select: Production, Preview, Development (all)
```

#### Step 5: Deploy to Production
```bash
vercel --prod
```

---

## 🔧 Project Structure for Vercel

Your project is now structured for Vercel deployment:

```
text-to-image-and-audio/
├── api/                      # Serverless API endpoints
│   ├── image.js             # /api/image endpoint
│   └── package.json         # API dependencies
├── client/                   # React frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── server/                   # Original Express server (kept for local dev)
│   └── ...
├── vercel.json              # Vercel configuration
└── DEPLOYMENT_GUIDE.md      # This file
```

---

## ✅ Verify Deployment

After deployment:
1. Visit your Vercel URL: `https://your-project-name.vercel.app`
2. Enter text in the input field (e.g., "a cat")
3. Click "Search"
4. You should see a generated image

---

## 🐛 Troubleshooting

### Issue: "HF_TOKEN not configured"
**Solution**: Make sure you added the `HF_TOKEN` environment variable in Vercel dashboard

### Issue: Build fails
**Solution**: Check the build logs in Vercel dashboard. Common issues:
- Missing dependencies in `package.json`
- Incorrect build commands
- Syntax errors in code

### Issue: API requests fail in production
**Solution**: 
1. Check that environment variables are set for **Production**
2. Verify API endpoints are `/api/image` (not `/api/image/`)
3. Check Vercel function logs in the dashboard

### Issue: CORS errors
**Solution**: The serverless function already includes CORS headers. If you still see errors:
- Clear browser cache
- Check that you're using the correct API endpoint

---

## 🔄 Updating Your Deployment

### Via GitHub (Automatic)
1. Push changes to your GitHub repository
2. Vercel automatically rebuilds and deploys

### Via Vercel CLI
```bash
vercel --prod
```

---

## 💡 Local Development

To run locally (using the original Express server):

```bash
# Terminal 1 - Start backend
cd server
npm install
npm start

# Terminal 2 - Start frontend
cd client
npm install
npm run dev
```

Then update `client/src/App.jsx` to use `http://localhost:5000/api/image` for local development.

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#vercel)
- [HuggingFace API Docs](https://huggingface.co/docs/api-inference/index)

---

## 🎉 You're All Set!

Your application is now deployed on Vercel. Share your live URL with others!

**Need help?** Check the [Vercel Community](https://github.com/vercel/vercel/discussions) or [Discord](https://vercel.com/discord).
