const API_KEY = "1tNMPQvO5jA8EgR2sJLI2MGoPKYqgo";
const BASE_URL = process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000";

async function makeRequest(endpoint, method = "GET", body = null) {
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

        return { success: response.ok, data, status: response.status };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function setupAdminAndProducts() {
    console.log("🚀 Setting up Decorwish Admin & Products...\n");

    // Step 1: Create Admin User
    console.log("👤 Creating Admin User...");
    const adminData = {
        email: "admin@floriwish76decorwish.com",
        password: "Decorwish@2025#Salman",
        name: "Decorwish Admin"
    };

    const adminResult = await makeRequest("/api/admin/setup-admin", "POST", adminData);

    if (adminResult.success) {
        console.log("✅ Admin user created successfully!");
        console.log(`   Email: ${adminData.email}`);
        console.log(`   Password: ${adminData.password}`);
        console.log(`   Name: ${adminResult.data.name}`);
        console.log(`   Role: ${adminResult.data.role}\n`);
    } else {
        console.log("⚠️  Admin creation result:", adminResult.data.message || adminResult.error);
        if (adminResult.data.message?.includes("already exists")) {
            console.log("   Using existing admin credentials:");
            console.log(`   Email: ${adminData.email}`);
            console.log(`   Password: ${adminData.password}\n`);
        }
    }

    // Step 2: Create Sample Products
    console.log("🛍️  Creating Sample Products...");
    const productsResult = await makeRequest("/api/admin/setup-products", "POST");

    if (productsResult.success) {
        console.log("✅ Sample products created successfully!");
        if (productsResult.data && productsResult.data.products) {
            console.log(`   Created ${productsResult.data.products.length} products:`);
            productsResult.data.products.forEach(product => {
                console.log(`   - ${product.name} (${product.sku}) - ₹${product.price}`);
            });
        }
        if (productsResult.data && productsResult.data.presets) {
            console.log("\n   Created presets:");
            Object.entries(productsResult.data.presets).forEach(([key, value]) => {
                console.log(`   - ${key}: ${value}`);
            });
        }
    } else {
        console.log("❌ Product creation failed:", productsResult.error);
    }

    // Step 3: Check System Health
    console.log("\n🏥 Checking System Health...");
    const healthResult = await makeRequest("/api/health");

    if (healthResult.success) {
        const health = healthResult.data;
        console.log("✅ System Status: " + health.status.toUpperCase());
        console.log(`   MongoDB: ${health.services.mongodb.status}`);
        console.log(`   Redis: ${health.services.redis.status}`);
        console.log(`   AWS: ${health.services.aws.status}`);
        console.log(`   Products in DB: ${health.database.sampleData.products}`);
        console.log(`   Customers in DB: ${health.database.sampleData.customers}`);
        console.log(`   Orders in DB: ${health.database.sampleData.orders}`);
    }

    console.log("\n🎉 Setup Complete!");
    console.log("\n📝 Next Steps:");
    console.log("1. Visit http://localhost:3000 to see the frontend");
    console.log("2. Visit http://localhost:3000/manage/login to access admin panel");
    console.log("3. Login with:");
    console.log(`   Email: ${adminData.email}`);
    console.log(`   Password: ${adminData.password}`);
    console.log("4. Explore the admin dashboard and manage your products!");

    console.log("\n🔧 Admin Panel Features:");
    console.log("- Dashboard with system health monitoring");
    console.log("- Product & category management");
    console.log("- Media management");
    console.log("- Blog management");
    console.log("- User & order management");
    console.log("- System settings & configurations");
}

// Run the setup
setupAdminAndProducts().catch(console.error);