# 🚀 Floriwish Deployment Guide

## Environment Configuration

The project is now configured to work on both:
- **Development**: `http://localhost:3000`
- **Production**: `http://floriwish.com`

## Environment Files

### `.env.local` - Local Development
- Used for local development on `localhost:3001`
- Uses test Razorpay keys
- Points to local domain

### `.env.production` - Production Deployment  
- Used for production deployment on `floriwish.com`
- Uses live Razorpay keys
- Points to production domain

### `.env` - Current Active Environment
- This file gets overwritten by deployment scripts
- Don't edit this directly - use `.env.local` or `.env.production`

## 🛠️ Development Setup

### Local Development
```bash
# Start local development server
npm run dev:local

# Or manually
cp .env.local .env
npm run dev
```

### Setup Database (First Time)
```bash
# Setup admin user and sample products
npm run setup:admin

# Setup Indian locations (already done)
npm run setup:locations
```

## 🌐 Production Deployment

### 1. Build for Production
```bash
# Build with production environment
npm run build:production

# Or manually
cp .env.production .env
npm run build
```

### 2. Start Production Server
```bash
# Start production server
npm run start:production

# Or manually  
cp .env.production .env
npm run start
```

### 3. Deploy to Server

#### Option A: Direct Server Deployment
```bash
# On your server (82.112.235.203)
git pull origin main
npm install
npm run build:production
npm run start:production
```

#### Option B: PM2 Process Manager
```bash
# Install PM2 globally
npm install -g pm2

# Start with PM2
cp .env.production .env
npm run build
pm2 start npm --name "floriwish" -- start

# Save PM2 configuration
pm2 save
pm2 startup
```

#### Option C: Docker Deployment
```bash
# Build Docker image
docker build -t floriwish .

# Run container
docker run -p 3000:3000 --env-file .env.production floriwish
```

## 🔧 Configuration Details

### Domain Configuration
- **Development**: All URLs point to `localhost:3001`
- **Production**: All URLs point to `floriwish.com`

### Database
- **MongoDB**: Same database for both environments
- **Redis**: Same Redis instance for both environments

### Payment Gateway
- **Development**: Test Razorpay keys
- **Production**: Live Razorpay keys

### File Storage
- **AWS S3**: Same bucket for both environments
- **CloudFront**: Same CDN for both environments

## 🚦 Verification Steps

### After Deployment, Test:

1. **Homepage**: Visit `http://floriwish.com`
2. **Location Selector**: Search for cities like "Mumbai", "Delhi"
3. **Products**: Browse sample products
4. **Admin Panel**: Visit `http://floriwish.com/manage/login`
   - Email: `admin@decorwish.com`
   - Password: `admin123`

### API Health Check
```bash
curl -H "x-api-key: 1tNMPQvO5jA8EgR2sJLI2MGoPKYqgo" "http://floriwish.com/api/health"
```

### Location API Test
```bash
curl -H "x-api-key: 1tNMPQvO5jA8EgR2sJLI2MGoPKYqgo" "http://floriwish.com/api/frontend/location"
```

## 🔒 Security Notes

### Environment Variables
- Never commit `.env` files to git
- Use different API keys for development and production
- Keep database credentials secure

### API Security
- All APIs require `x-api-key` header
- Admin APIs require additional authentication
- CORS is configured for your domain

## 📝 Troubleshooting

### Common Issues

1. **404 Errors**: Normal for non-existent products
2. **CORS Errors**: Check API key in middleware
3. **Database Connection**: Verify MongoDB URI
4. **Redis Connection**: Check Redis URL and password

### Logs
```bash
# Check application logs
pm2 logs floriwish

# Check system logs
tail -f /var/log/nginx/error.log
```

## 🔄 Updates and Maintenance

### Deploying Updates
```bash
# Pull latest code
git pull origin main

# Install dependencies
npm install

# Build and restart
npm run build:production
pm2 restart floriwish
```

### Database Maintenance
```bash
# Backup database
mongodump --uri="mongodb+srv://flowrish:flowrish@cluster0.1qrxi07.mongodb.net/Flowrish"

# Clear Redis cache
redis-cli -h 82.112.235.203 -p 6379 -a HvX832R6qsuQxQJv0Wszmb FLUSHALL
```

## 📊 Monitoring

### Health Endpoints
- **System Health**: `/api/health`
- **Database Status**: Check MongoDB and Redis connections
- **Sample Data**: Verify products, customers, orders count

### Performance
- **Location API**: Should return 50+ cities
- **Product Pages**: Should load without 404s
- **Admin Panel**: Should be accessible and functional

---

## 🎉 Your Floriwish website is now ready for production!

**Development**: `http://localhost:3000`  
**Production**: `http://floriwish.com`

Both environments have:
- ✅ 50+ Indian cities for location selection
- ✅ Sample products and admin panel
- ✅ Working APIs and authentication
- ✅ Payment gateway integration
- ✅ File storage and CDN