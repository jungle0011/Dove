const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

// Configuration
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dove-spiritual';
const ADMIN_USER = {
  username: 'admin',
  email: 'admin@example.com',
  password: 'admin123', // In a real app, this should be more secure
  role: 'admin',
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
};

async function createAdminUser() {
  const client = new MongoClient(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 10000,
    connectTimeoutMS: 10000,
  });

  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Connected to MongoDB!');

    const db = client.db();
    const adminCollection = db.collection('admins');

    // Check if admin already exists
    const existingAdmin = await adminCollection.findOne({ username: ADMIN_USER.username });
    
    if (existingAdmin) {
      console.log('Admin user already exists:');
      console.log({
        _id: existingAdmin._id,
        username: existingAdmin.username,
        email: existingAdmin.email,
        role: existingAdmin.role,
        isActive: existingAdmin.isActive
      });
      return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(ADMIN_USER.password, salt);

    // Create admin user
    const result = await adminCollection.insertOne({
      ...ADMIN_USER,
      password: hashedPassword
    });

    console.log('Admin user created successfully!');
    console.log({
      _id: result.insertedId,
      username: ADMIN_USER.username,
      email: ADMIN_USER.email,
      role: ADMIN_USER.role
    });

  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

// Run the function
createAdminUser().catch(console.error);
