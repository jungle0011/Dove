import { hash } from 'bcryptjs';
import dbConnect from '@/lib/db';
import Admin from '@/lib/models/Admin';

async function createAdmin() {
  try {
    await dbConnect();
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    
    if (existingAdmin) {
      console.log('Admin user already exists:');
      console.log({
        id: existingAdmin._id,
        username: existingAdmin.username,
        email: existingAdmin.email,
        role: existingAdmin.role,
        isActive: existingAdmin.isActive
      });
      return;
    }

    // Create new admin
    const hashedPassword = await hash('admin123', 12);
    
    const admin = new Admin({
      username: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true
    });

    await admin.save();
    
    console.log('Admin user created successfully:');
    console.log({
      id: admin._id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
      isActive: admin.isActive
    });
    
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    process.exit(0);
  }
}

createAdmin();
