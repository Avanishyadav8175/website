#!/bin/bash

# Floriwish Deployment Script

echo "🚀 Starting Floriwish Deployment..."

# Check if production environment file exists
if [ ! -f ".env.production" ]; then
    echo "❌ .env.production file not found!"
    echo "Please create .env.production with production environment variables."
    exit 1
fi

# Copy production environment
echo "📝 Setting up production environment..."
cp .env.production .env

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Check if PM2 is available
    if command -v pm2 &> /dev/null; then
        echo "🔄 Restarting with PM2..."
        pm2 restart floriwish || pm2 start npm --name "floriwish" -- start
        pm2 save
    else
        echo "🚀 Starting production server..."
        echo "Note: Consider using PM2 for production process management"
        npm start
    fi
    
    echo "🎉 Deployment completed successfully!"
    echo "🌐 Your website should be available at: http://floriwish.com"
    
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi