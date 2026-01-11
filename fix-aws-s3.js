const { S3Client, CreateBucketCommand, PutBucketPolicyCommand, PutBucketCorsCommand } = require("@aws-sdk/client-s3");

// Load environment variables
require('dotenv').config();

const region = process.env.AWS_REGION || "ap-south-1";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucketName = process.env.AWS_S3_BUCKET_NAME || "Floriwish";

console.log("🔧 AWS S3 Bucket Setup & Fix Tool");
console.log("=====================================");
console.log(`Region: ${region}`);
console.log(`Bucket: ${bucketName}`);
console.log(`Access Key: ${accessKeyId ? accessKeyId.substring(0, 8) + '...' : 'Missing'}`);
console.log("");

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
});

async function createBucketIfNotExists() {
  try {
    console.log("📦 Creating S3 bucket if it doesn't exist...");
    
    const createBucketParams = {
      Bucket: bucketName,
      CreateBucketConfiguration: {
        LocationConstraint: region
      }
    };

    await s3Client.send(new CreateBucketCommand(createBucketParams));
    console.log(`✅ Bucket '${bucketName}' created successfully!`);
  } catch (error) {
    if (error.name === 'BucketAlreadyOwnedByYou') {
      console.log(`✅ Bucket '${bucketName}' already exists and is owned by you.`);
    } else if (error.name === 'BucketAlreadyExists') {
      console.log(`⚠️  Bucket '${bucketName}' already exists but may be owned by someone else.`);
      console.log("   Try using a different bucket name in your .env file.");
      return false;
    } else {
      console.error(`❌ Error creating bucket: ${error.message}`);
      return false;
    }
  }
  return true;
}

async function setBucketPolicy() {
  try {
    console.log("🔐 Setting bucket policy for public read access...");
    
    const bucketPolicy = {
      Version: "2012-10-17",
      Statement: [
        {
          Sid: "PublicReadGetObject",
          Effect: "Allow",
          Principal: "*",
          Action: "s3:GetObject",
          Resource: `arn:aws:s3:::${bucketName}/*`
        }
      ]
    };

    const policyParams = {
      Bucket: bucketName,
      Policy: JSON.stringify(bucketPolicy)
    };

    await s3Client.send(new PutBucketPolicyCommand(policyParams));
    console.log("✅ Bucket policy set successfully!");
  } catch (error) {
    console.error(`❌ Error setting bucket policy: ${error.message}`);
    return false;
  }
  return true;
}

async function setBucketCors() {
  try {
    console.log("🌐 Setting CORS configuration...");
    
    const corsParams = {
      Bucket: bucketName,
      CORSConfiguration: {
        CORSRules: [
          {
            AllowedHeaders: ["*"],
            AllowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
            AllowedOrigins: ["*"],
            ExposeHeaders: ["ETag"],
            MaxAgeSeconds: 3000
          }
        ]
      }
    };

    await s3Client.send(new PutBucketCorsCommand(corsParams));
    console.log("✅ CORS configuration set successfully!");
  } catch (error) {
    console.error(`❌ Error setting CORS: ${error.message}`);
    return false;
  }
  return true;
}

async function testUpload() {
  try {
    console.log("🧪 Testing file upload...");
    
    const { PutObjectCommand } = require("@aws-sdk/client-s3");
    
    const testContent = "This is a test file for Floriwish image upload.";
    const testParams = {
      Bucket: bucketName,
      Key: "test/test-upload.txt",
      Body: testContent,
      ContentType: "text/plain"
    };

    await s3Client.send(new PutObjectCommand(testParams));
    console.log("✅ Test upload successful!");
    console.log(`   File URL: https://${bucketName}.s3.${region}.amazonaws.com/test/test-upload.txt`);
  } catch (error) {
    console.error(`❌ Test upload failed: ${error.message}`);
    return false;
  }
  return true;
}

async function main() {
  try {
    if (!accessKeyId || !secretAccessKey) {
      console.error("❌ AWS credentials are missing!");
      console.log("   Please check your .env file for:");
      console.log("   - AWS_ACCESS_KEY_ID");
      console.log("   - AWS_SECRET_ACCESS_KEY");
      return;
    }

    const bucketCreated = await createBucketIfNotExists();
    if (!bucketCreated) return;

    await setBucketPolicy();
    await setBucketCors();
    await testUpload();

    console.log("");
    console.log("🎉 AWS S3 Setup Complete!");
    console.log("=====================================");
    console.log("Your S3 bucket is now ready for image uploads.");
    console.log("");
    console.log("📝 Next Steps:");
    console.log("1. Try uploading an image through the admin panel");
    console.log("2. The image should now upload successfully");
    console.log("3. Check the media library to see your uploaded images");
    console.log("");
    console.log("🔗 Bucket Details:");
    console.log(`   Bucket Name: ${bucketName}`);
    console.log(`   Region: ${region}`);
    console.log(`   CloudFront URL: ${process.env.AWS_CLOUDFRONT_URL}`);

  } catch (error) {
    console.error("❌ Setup failed:", error.message);
  }
}

main();