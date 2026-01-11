const citiesData = require("./indian-cities-data");

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

// Indian states data
const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir",
    "Ladakh", "Puducherry", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep", "Andaman and Nicobar Islands"
];

// Build comprehensive cities list from citiesData
const indianCities = [];
for (const [stateName, cities] of Object.entries(citiesData)) {
    for (const city of cities) {
        indianCities.push({
            name: city.name,
            state: stateName,
            isTopCity: city.isTopCity || false,
            aliases: city.aliases || []
        });
    }
}

console.log(`📊 Total cities to add: ${indianCities.length}`);

async function setupIndianLocations() {
    console.log("🇮🇳 Setting up Indian States and Cities...\n");

    // Step 1: Create States
    console.log("🏛️  Creating Indian States...");
    const createdStates = {};
    let statesCreated = 0;
    let statesSkipped = 0;

    for (const stateName of indianStates) {
        const stateData = {
            name: stateName,
            isActive: true,
            createdBy: "system",
            updatedBy: "system"
        };

        const result = await makeRequest("/api/admin/preset/state", "POST", stateData);

        if (result.success) {
            createdStates[stateName] = result.data._id;
            statesCreated++;
            console.log(`   ✅ Created: ${stateName}`);
        } else if (result.data?.message?.includes("already exists") || result.status === 409) {
            statesSkipped++;
            console.log(`   ⚠️  Already exists: ${stateName}`);
        } else {
            console.log(`   ❌ Failed to create: ${stateName} - ${result.error || result.data?.message}`);
        }
    }

    // Fetch all states to get their IDs
    console.log("🔍 Fetching state IDs...");
    const allStatesResult = await makeRequest("/api/admin/preset/state");

    if (allStatesResult.success && allStatesResult.data && Array.isArray(allStatesResult.data.data)) {
        console.log(`Found ${allStatesResult.data.data.length} states in database`);
        allStatesResult.data.data.forEach(state => {
            if (indianStates.includes(state.name)) {
                createdStates[state.name] = state._id;

            }
        });
    } else {
        console.log("Failed to fetch states or invalid response format");
    }

    console.log(`\n📊 States Summary: ${statesCreated} created, ${statesSkipped} already existed\n`);

    // Step 2: Create Cities
    console.log("🏙️  Creating Indian Cities...");
    let citiesCreated = 0;
    let citiesSkipped = 0;
    let citiesFailed = 0;

    for (const cityData of indianCities) {
        const stateId = createdStates[cityData.state];

        if (!stateId) {
            console.log(`   ❌ Cannot create ${cityData.name}: State ${cityData.state} not found`);
            citiesFailed++;
            continue;
        }

        const cityPayload = {
            name: cityData.name,
            state: stateId,
            aliases: cityData.aliases || [],
            isTopCity: cityData.isTopCity,
            isActive: true,
            createdBy: "system",
            updatedBy: "system"
        };

        const result = await makeRequest("/api/admin/preset/city", "POST", cityPayload);

        if (result.success) {
            citiesCreated++;
            const topCityIndicator = cityData.isTopCity ? "⭐" : "  ";
            console.log(`   ✅ ${topCityIndicator} Created: ${cityData.name}, ${cityData.state}`);
        } else if (result.data?.message?.includes("already exists") || result.status === 409) {
            citiesSkipped++;
            const topCityIndicator = cityData.isTopCity ? "⭐" : "  ";
            console.log(`   ⚠️  ${topCityIndicator} Already exists: ${cityData.name}, ${cityData.state}`);
        } else {
            citiesFailed++;
            console.log(`   ❌ Failed to create: ${cityData.name} - ${result.error || result.data?.message}`);
        }
    }

    console.log(`\n📊 Cities Summary: ${citiesCreated} created, ${citiesSkipped} already existed, ${citiesFailed} failed\n`);

    // Step 3: Verify Setup
    console.log("🔍 Verifying Location Setup...");

    const statesResult = await makeRequest("/api/admin/preset/state");
    const citiesResult = await makeRequest("/api/admin/preset/city");

    if (statesResult.success && citiesResult.success) {
        console.log("✅ Location verification successful!");
        console.log(`   Total States in DB: ${statesResult.data?.data?.length || statesResult.data?.count || 'N/A'}`);
        console.log(`   Total Cities in DB: ${citiesResult.data?.data?.length || citiesResult.data?.count || 'N/A'}`);

        if (Array.isArray(citiesResult.data?.data)) {
            const topCities = citiesResult.data.data.filter(city => city.isTopCity);
            console.log(`   Top Cities: ${topCities.length}`);
        }
    } else {
        console.log("❌ Location verification failed");
    }

    console.log("\n🎉 Indian Locations Setup Complete!");
    console.log("\n📝 What was added:");
    console.log("- 36 Indian states and union territories");
    console.log(`- ${indianCities.length} Indian cities (comprehensive list)`);
    console.log("- Top cities marked for priority display");
    console.log("- City aliases for better search");
    console.log("\n🔧 Usage:");
    console.log("- Cities are now available for delivery location selection");
    console.log("- Top cities will appear first in dropdowns");
    console.log("- Aliases help with search functionality");
    console.log(`\n📈 Summary: ${citiesCreated} created, ${citiesSkipped} already existed, ${citiesFailed} failed`);
}

// Run the setup
setupIndianLocations().catch(console.error);