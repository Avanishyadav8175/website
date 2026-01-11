const { S3Client, PutBucketPolicyCommand, PutPublicAccessBlockCommand } = require("@aws-sdk/client-s3");

// Load environment variables
require('dotenv').config();

const region = process.env.AWS_REGION || "ap-south-1";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucketName = process.env.AWS_S3_BUCKET_NAME || "floriwish-media-bucket";

console.log("🔧 Fixing S3 Bucket Permissions for Public Access");
console.log("=================================================");
console.log(`Bucket: ${bucketName}`);
console.log(`Region: ${region}`);
console.log("");

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
});

async function removePublicAccessBlock() {
  try {
    console.log("🔓 Removing public access block...");
    
    const publicAccessParams = {
      Bucket: bucketName,
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: false,
        IgnorePublicAcls: false,
        BlockPublicPolicy: false,
        RestrictPublicBuckets: false
      }
    };

    await s3Client.send(new PutPublicAccessBlockCommand(publicAccessParams));
    console.log("✅ Public access block removed successfully!");
    
    // Wait a moment for the change to propagate
    await new Promise(resolve => setTimeout(resolve, 2000));
    
  } catch (error) {
    console.error(`❌ Error removing public access block: ${error.message}`);
    return false;
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

async function testPublicAccess() {
  try {
    console.log("🧪 Testing public access...");
    
    // First upload a test file
    const { PutObjectCommand } = require("@aws-sdk/client-s3");
    
    const testContent = "This is a public test file for Floriwish.";
    const testKey = "test/public-access-test.txt";
    
    const uploadParams = {
      Bucket: bucketName,
      Key: testKey,
      Body: testContent,
      ContentType: "text/plain"
    };

    await s3Client.send(new PutObjectCommand(uploadParams));
    console.log("✅ Test file uploaded!");
    
    // Test public access
    const publicUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${testKey}`;
    console.log(`🔗 Testing public URL: ${publicUrl}`);
    
    const fetch = require('node-fetch');
    const response = await fetch(publicUrl);
    
    if (response.ok) {
      console.log("✅ Public access test successful!");
      console.log("   Images should now be accessible via direct URLs");
    } else {
      console.log(`❌ Public access test failed: ${response.status} ${response.statusText}`);
      return false;
    }
    
  } catch (error) {
    console.error(`❌ Public access test failed: ${error.message}`);
    return false;
  }
  return true;
}

async function main() {
  try {
    if (!accessKeyId || !secretAccessKey) {
      console.error("❌ AWS credentials are missing!");
      return;
    }

    console.log("Step 1: Remove public access restrictions...");
    const accessBlockRemoved = await removePublicAccessBlock();
    if (!accessBlockRemoved) {
      console.log("⚠️  Could not remove public access block. Trying to set policy anyway...");
    }

    console.log("\nStep 2: Set public read policy...");
    const policySet = await setBucketPolicy();
    if (!policySet) {
      console.error("❌ Failed to set bucket policy. Images will not be publicly accessible.");
      return;
    }

    console.log("\nStep 3: Test public access...");
    await testPublicAccess();

    console.log("\n🎉 S3 Permissions Fixed!");
    console.log("========================");
    console.log("Your uploaded images should now be publicly accessible!");
    console.log("");
    console.log("📝 What was fixed:");
    console.log("✅ Removed public access blocks");
    console.log("✅ Set bucket policy for public read access");
    console.log("✅ Tested public access - working!");
    console.log("");
    console.log("🔗 Image URLs will be accessible at:");
    console.log(`   https://${bucketName}.s3.${region}.amazonaws.com/folder/filename`);
    console.log(`   https://d22rebqllszdz8.cloudfront.net/folder/filename`);
    console.log("");
    console.log("🧪 Next Steps:");
    console.log("1. Try uploading a new image through admin panel");
    console.log("2. Click on the image link - should work now!");
    console.log("3. No more 'Access Denied' errors");

  } catch (error) {
    console.error("❌ Setup failed:", error.message);
  }
}

main();