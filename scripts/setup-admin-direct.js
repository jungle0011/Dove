const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

async function setupAdmin() {
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dove-spiritual';
  
  if (!MONGODB_URI) {
    console.error('Please set the MONGODB_URI environment variable');
    process.exit(1);
  }

  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db();
    const adminCollection = db.collection('admins');
    
    // Check if admin already exists
    const existingAdmin = await adminCollection.findOne({ username: 'admin' });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }
    
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    
    // Create admin user
    const result = await adminCollection.insertOne({
      username: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    if (result.insertedId) {
      console.log('Admin user created successfully');
      console.log('Username: admin');
      console.log('Password: admin123');
    } else {
      console.error('Failed to create admin user');
    }
  } catch (error) {
    console.error('Error setting up admin user:', error);
  } finally {
    await client.close();
  }
}

setupAdmin().catch(console.error);
