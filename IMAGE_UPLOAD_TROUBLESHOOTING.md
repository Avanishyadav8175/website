# 🖼️ Image Upload Troubleshooting Guide

## 🚨 Current Issue: HTTP 207 Status

**Status Code 207** = "Multi-Status" or "Partial Success"

This means your image upload is **partially working** but encountering some issues during the process.

## 🔍 What 207 Status Means

The image upload process involves several steps:
1. **Image Processing** (Sharp optimization to WebP)
2. **AWS S3 Upload** (File storage)
3. **Database Save** (Image record creation)
4. **CloudFront Cache** (CDN distribution)

A 207 status indicates **some steps succeeded, others had warnings/issues**.

## 🛠️ Troubleshooting Steps

### Step 1: Check Server Logs
When you upload an image, check the server console for detailed error messages:

```bash
# Watch server logs while uploading
npm run dev
# Then upload an image and check console output
```

### Step 2: Verify AWS Credentials
Test if AWS is working properly:

```bash
curl -H "x-api-key: 1tNMPQvO5jA8EgR2sJLI2MGoPKYqgo" "http://localhost:3000/api/health"
```

**Expected AWS Status**: ✅ "configured" with credentials

### Step 3: Check Image Format & Size
**Supported Formats**: JPG, PNG, WebP  
**Recommended Size**: < 5MB  
**Output Format**: Automatically converted to WebP

### Step 4: Test S3 Bucket Access
Your current AWS configuration:
- **Region**: ap-south-1
- **Bucket**: Floriwish  
- **CloudFront**: https://d22rebqllszdz8.cloudfront.net

### Step 5: Check Database Connection
Ensure MongoDB is connected:
```bash
curl -H "x-api-key: 1tNMPQvO5jA8EgR2sJLI2MGoPKYqgo" "http://localhost:3000/api/health" | jq '.services.mongodb'
```

## 🔧 Common Issues & Solutions

### Issue 1: AWS Permission Errors
**Symptoms**: 207 status, S3 upload fails  
**Solution**: Verify AWS IAM permissions for S3 bucket

**Required S3 Permissions**:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::Floriwish/*"
    }
  ]
}
```

### Issue 2: Image Processing Errors
**Symptoms**: Sharp optimization warnings  
**Solution**: Check image format and size

### Issue 3: Database Validation Errors
**Symptoms**: Image uploads but database save fails  
**Solution**: Check required fields in image schema

### Issue 4: CloudFront Issues
**Symptoms**: Image uploads but URL not accessible  
**Solution**: Verify CloudFront distribution settings

## 🧪 Test Image Upload

### Manual Test Steps:
1. **Go to Admin Panel**: `http://localhost:3000/manage/login`
2. **Login**: Use your admin credentials
3. **Navigate to Media**: Find image upload section
4. **Upload Test Image**: Try a small JPG/PNG file (< 1MB)
5. **Check Console**: Look for detailed error messages
6. **Verify Result**: Check if image appears in media library

### Expected Success Flow:
1. ✅ Image selected and validated
2. ✅ Sharp processing (JPG/PNG → WebP)
3. ✅ S3 upload successful
4. ✅ Database record created
5. ✅ CloudFront URL generated
6. ✅ Image appears in media library

## 📊 Debug Information

### Current Configuration:
- **AWS Region**: ap-south-1 ✅
- **S3 Bucket**: Floriwish ✅  
- **CloudFront**: https://d22rebqllszdz8.cloudfront.net ✅
- **Credentials**: Present ✅

### Image Processing:
- **Library**: Sharp (WebP conversion)
- **Quality**: 95%
- **Format**: WebP output
- **Metadata**: EXIF removed

## 🚀 Quick Fixes to Try

### Fix 1: Restart Server
```bash
# Stop current server
# Restart with fresh environment
npm run dev
```

### Fix 2: Clear Cache
```bash
# Clear Redis cache if needed
# Try uploading again
```

### Fix 3: Test with Different Image
- Try a small PNG file (< 500KB)
- Avoid special characters in filename
- Use standard image dimensions

### Fix 4: Check Network
- Ensure stable internet connection
- AWS S3 requires reliable upload connection

## 📞 Still Having Issues?

If you continue getting 207 status:

1. **Share Server Logs**: Copy the exact error messages from console
2. **Try Different Image**: Test with various file types/sizes
3. **Check AWS Console**: Verify if files are actually reaching S3
4. **Test Database**: Ensure image records are being created

The 207 status means the system is **partially working** - we just need to identify which step is causing the warning! 🔍