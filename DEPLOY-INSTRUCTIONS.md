# Deploy Instructions

## Quick Deploy to Render.com

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Ready for deployment"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Deploy on Render**:
   - Go to https://render.com
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Render will automatically use `render.yaml` settings

3. **Environment Variables** (if needed):
   - NODE_ENV=production
   - PORT=5000

## Alternative: Manual Deploy

```bash
# Install dependencies
npm install
cd client && npm install

# Build client
npm run build

# Start production server
cd .. && npm start
```

Your app will be running at the provided URL!

## Troubleshooting

- **Build fails**: Check Node.js version (requires >=18.x)
- **Port issues**: Render automatically assigns PORT
- **Static files**: Server serves from `client/build`
