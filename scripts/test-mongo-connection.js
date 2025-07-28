const { MongoClient } = require('mongodb');

// Connection URI
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/dove-spiritual';

// Create a new MongoClient
const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 10000,
  connectTimeoutMS: 10000,
  maxPoolSize: 1,
  retryWrites: true,
  w: 'majority'
});

async function run() {
  try {
    console.log('Attempting to connect to MongoDB...');
    
    // Connect the client to the server
    await client.connect();
    console.log('Successfully connected to MongoDB!');
    
    // List all databases
    const adminDb = client.db('admin');
    const result = await adminDb.command({ listDatabases: 1 });
    console.log('Available databases:');
    result.databases.forEach(db => console.log(`- ${db.name}`));
    
    // Check if our target database exists
    const targetDb = client.db('dove-spiritual');
    const collections = await targetDb.listCollections().toArray();
    console.log('\nCollections in dove-spiritual:');
    collections.forEach(coll => console.log(`- ${coll.name}`));
    
    // Check for admin collection
    const adminCollection = targetDb.collection('admins');
    const adminCount = await adminCollection.countDocuments();
    console.log(`\nNumber of admin users: ${adminCount}`);
    
    if (adminCount > 0) {
      const admin = await adminCollection.findOne({});
      console.log('\nSample admin user:');
      console.log({
        _id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        isActive: admin.isActive
      });
    }
    
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  } finally {
    // Close the connection when done
    await client.close();
    console.log('\nConnection closed.');
  }
}

// Run the test
run().catch(console.dir);
