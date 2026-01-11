const API_KEY = "1tNMPQvO5jA8EgR2sJLI2MGoPK";
const BASE_URL = "http://localhost:3000";

async function testAPI(endpoint, method = "GET", body = null) {
  try {
    const options = {
      method,
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json"
      }
    };
    
    if (body) {
      options.body = JSON.stringify(body);
    }
    
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const data = await response.json();
    
    console.log(`\n✅ ${method} ${endpoint}`);
    console.log(`Status: ${response.status}`);
    console.log("Response:", JSON.stringify(data, null, 2));
    
    return { success: response.ok, data };
  } catch (error) {
    console.log(`\n❌ ${method} ${endpoint}`);
    console.log("Error:", error.message);
    return { success: false, error: error.message };
  }
}

async function runTests() {
  console.log("🚀 Testing Decorwish System APIs...\n");
  
  // Test health check
  await testAPI("/api/health");
  
  // Test database connections
  await testAPI("/api/admin/test-connections");
  
  // Test product seeding
  await testAPI("/api/admin/seed-products", "POST");
  
  // Test health check again to see updated data
  await testAPI("/api/health");
  
  console.log("\n🎉 System testing completed!");
  console.log("\n📝 Next steps:");
  console.log("1. Visit http://localhost:3000 to see the frontend");
  console.log("2. Visit http://localhost:3000/manage/login to access admin panel");
  console.log("3. Check the System Health section in admin panel");
}

// Run if called directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { testAPI, runTests };


