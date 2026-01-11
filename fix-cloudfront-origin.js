const { CloudFrontClient, GetDistributionCommand, UpdateDistributionCommand } = require("@aws-sdk/client-cloudfront");

// Load environment variables
require('dotenv').config();

const region = process.env.AWS_REGION || "ap-south-1";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucketName = process.env.AWS_S3_BUCKET_NAME || "floriwish-media-bucket";
const distributionId = process.env.AWS_CLOUDFRONT_DISTRIBUTION_ID || "E3GZ7EXE92VRTW";

console.log("🔧 CloudFront Origin Fix Tool");
console.log("==============================");
console.log(`Distribution ID: ${distributionId}`);
console.log(`Current Bucket: ${bucketName}`);
console.log(`Region: ${region}`);
console.log("");

const cloudFrontClient = new CloudFrontClient({
  region: "us-east-1", // CloudFront API is always in us-east-1
  credentials: {
    accessKeyId,
    secretAccessKey
  }
});

async function getCurrentDistribution() {
  try {
    console.log("📋 Getting current CloudFront distribution configuration...");
    
    const command = new GetDistributionCommand({
      Id: distributionId
    });

    const response = await cloudFrontClient.send(command);
    return response;
    
  } catch (error) {
    console.error(`❌ Error getting distribution: ${error.message}`);
    return null;
  }
}

async function updateDistributionOrigin(distribution) {
  try {
    console.log("🔄 Updating CloudFront distribution origin...");
    
    const config = distribution.Distribution.DistributionConfig;
    const etag = distribution.ETag;
    
    // Update the origin to point to our new bucket
    const newOriginDomainName = `${bucketName}.s3.${region}.amazonaws.com`;
    
    console.log(`   Old Origin: ${config.Origins.Items[0].DomainName}`);
    console.log(`   New Origin: ${newOriginDomainName}`);
    
    // Update the origin
    config.Origins.Items[0].DomainName = newOriginDomainName;
    config.Origins.Items[0].Id = bucketName;
    
    // Update default cache behavior origin
    config.DefaultCacheBehavior.TargetOriginId = bucketName;
    
    const updateCommand = new UpdateDistributionCommand({
      Id: distributionId,
      DistributionConfig: config,
      IfMatch: etag
    });

    const updateResponse = await cloudFrontClient.send(updateCommand);
    
    console.log("✅ CloudFront distribution updated successfully!");
    console.log("   Status:", updateResponse.Distribution.Status);
    console.log("   Domain:", updateResponse.Distribution.DomainName);
    
    return true;
    
  } catch (error) {
    console.error(`❌ Error updating distribution: ${error.message}`);
    return false;
  }
}

async function main() {
  try {
    if (!accessKeyId || !secretAccessKey) {
      console.error("❌ AWS credentials are missing!");
      return;
    }

    // Get current distribution
    const distribution = await getCurrentDistribution();
    if (!distribution) {
      console.error("❌ Could not retrieve CloudFront distribution");
      return;
    }

    const currentOrigin = distribution.Distribution.DistributionConfig.Origins.Items[0].DomainName;
    const expectedOrigin = `${bucketName}.s3.${region}.amazonaws.com`;
    
    console.log("📊 Current Configuration:");
    console.log(`   CloudFront Origin: ${currentOrigin}`);
    console.log(`   Expected Origin: ${expectedOrigin}`);
    console.log(`   Distribution Status: ${distribution.Distribution.Status}`);
    
    if (currentOrigin === expectedOrigin) {
      console.log("\n✅ CloudFront is already pointing to the correct bucket!");
      console.log("   No changes needed.");
    } else {
      console.log("\n🔧 CloudFront is pointing to wrong bucket. Updating...");
      
      const updated = await updateDistributionOrigin(distribution);
      
      if (updated) {
        console.log("\n🎉 CloudFront Origin Updated!");
        console.log("================================");
        console.log("✅ CloudFront now points to the correct S3 bucket");
        console.log("⏳ Changes may take 5-15 minutes to propagate globally");
        console.log("");
        console.log("📝 What was fixed:");
        console.log(`   ✅ Origin updated to: ${expectedOrigin}`);
        console.log("   ✅ Distribution configuration saved");
        console.log("");
        console.log("🧪 Test after 5-10 minutes:");
        console.log("   1. Upload a new image through admin panel");
        console.log("   2. Click on the image link");
        console.log("   3. Image should load without Access Denied error");
        console.log("");
        console.log("🔗 CloudFront URL: https://d22rebqllszdz8.cloudfront.net");
      }
    }

  } catch (error) {
    console.error("❌ Setup failed:", error.message);
  }
}

main();