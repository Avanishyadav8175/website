// Run this script with: node scripts/activate-popular-categories.js
// Or with tsx: npx tsx scripts/activate-popular-categories.js

const mongoose = require('mongoose');

// Get MongoDB URI from environment or use default
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/floriwish';

async function activatePopularCategories() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const CatalogueCategory = mongoose.model('CatalogueCategory', new mongoose.Schema({}, { strict: false }));

    // Find and activate "Popular Categories"
    const result = await CatalogueCategory.updateOne(
      { name: 'Popular Categories' },
      { $set: { isActive: true } }
    );

    console.log('Update result:', result);

    if (result.matchedCount > 0) {
      console.log('✅ Successfully activated "Popular Categories"');
    } else {
      console.log('⚠️  "Popular Categories" not found in database');
      
      // List all catalogue categories
      const categories = await CatalogueCategory.find({}).select('name isActive');
      console.log('\nExisting catalogue categories:');
      categories.forEach(cat => {
        console.log(`  - ${cat.name} (isActive: ${cat.isActive})`);
      });
    }

    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

activatePopularCategories();
