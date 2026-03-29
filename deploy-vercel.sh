#!/bin/bash
# Kralj Dashboard - Vercel Deploy Script

echo "👑 Kralj Dashboard - Vercel Deploy"
echo "===================================="
echo ""

cd /mnt/data/openclaw/workspace/.openclaw/workspace/kralj-dashboard

# 1. Build check
echo "🔨 Building for production..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Build failed!"
  exit 1
fi

echo "✅ Build successful!"
echo ""

# 2. Vercel deployment
if command -v vercel &> /dev/null; then
  echo "🚀 Deploying to Vercel..."
  vercel --prod
else
  echo "⚠️  Vercel CLI not installed."
  echo ""
  echo "Install with:"
  echo "  npm install -g vercel"
  echo ""
  echo "Or deploy manually:"
  echo "  1. Open https://vercel.com/new"
  echo "  2. Import GitHub repo: nermindurma81-ui/kralj-dashboard"
  echo "  3. Deploy!"
fi

echo ""
echo "✅ Deploy complete!"
