import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Main function to run the setup
async function main() {
  try {
    // Import the db module with TypeScript file extensions for ts-node
    const dbModule = await import(path.join(__dirname, '..', 'lib', 'db.ts'));
    const AdminModule = await import(path.join(__dirname, '..', 'lib', 'models', 'Admin.ts'));

    const dbConnect = dbModule.default;
    const Admin = AdminModule.default;
    
    // Call the setup function
    await setupAdmin(dbConnect, Admin);
  } catch (error) {
    console.error('Error in setup script:', error);
    process.exit(1);
  }
}

// Setup admin function
async function setupAdmin(dbConnect: any, Admin: any) {
  try {
    // Connect to the database
    await dbConnect();
    
    // Check if an admin already exists
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }
    
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    
    // Create a new admin user
    const admin = new Admin({
      username: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true
    });
    
    // Save the admin user to the database
    await admin.save();
    
    console.log('Admin user created successfully');
    console.log('Username: admin');
    console.log('Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error setting up admin user:', error);
    process.exit(1);
  }
}

// Start the setup process
main().catch(error => {
  console.error('Unhandled error in setup script:', error);
  process.exit(1);
});
