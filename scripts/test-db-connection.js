const mongoose = require('mongoose');

// Configuration
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dove-spiritual';

async function testConnection() {
  console.log('Testing MongoDB connection...');
  console.log(`Connection string: ${MONGODB_URI}`);
  
  // Set up event listeners for connection events
  mongoose.connection.on('connecting', () => {
    console.log('MongoDB: Connecting...');  });

  mongoose.connection.on('connected', () => {
    console.log('MongoDB: Connected successfully');  });

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);  });

  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB: Disconnected');  });

  // Set connection options
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  };

  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(MONGODB_URI, options);
    
    console.log('Successfully connected to MongoDB!');
    
    // Test if we can access the Admin collection
    const Admin = mongoose.model('Admin', new mongoose.Schema({
      username: String,
      email: String,
      password: String,
      role: String,
      isActive: Boolean
    }));
    
    const admin = await Admin.findOne({ username: 'admin' });
    console.log('Admin user found:', admin ? 'Yes' : 'No');
    
    return true;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return false;
  } finally {
    // Close the connection
    await mongoose.disconnect();
  }
}

// Run the test
testConnection()
  .then(success => {
    console.log(success ? 'Test completed successfully!' : 'Test failed');
    process.exit(success ? 0 : 1);
  })
  .catch(err => {
    console.error('Unexpected error:', err);
    process.exit(1);
  });
