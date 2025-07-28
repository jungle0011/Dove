const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Admin model (simplified version for the script)
const AdminSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true, 
    maxlength: 50,
    trim: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    maxlength: 255,
    lowercase: true,
    trim: true 
  },
  password: { 
    type: String, 
    required: true, 
    minlength: 6 
  },
  role: { 
    type: String, 
    enum: ['admin', 'moderator'], 
    default: 'admin' 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  lastLogin: { 
    type: Date 
  }
}, {
  timestamps: true
});

const Admin = mongoose.model('Admin', AdminSchema);

async function setupAdmin() {
  try {
    // Use the provided MongoDB URI directly
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://folorunshomubiboy:IiKVKHdw7ids61xn@cluster0.cwugbi2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@dove-spiritual.com' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('rabbidove', 12);
    const admin = new Admin({
      username: 'admin',
      email: 'admin@dove-spiritual.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true
    });

    await admin.save();
    console.log('Admin user created successfully!');
    console.log('Email: admin@dove-spiritual.com');
    console.log('Username: admin');
    console.log('Password: rabbidove');
    console.log('Please change the password after first login.');

  } catch (error) {
    console.error('Error setting up admin:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

setupAdmin(); 