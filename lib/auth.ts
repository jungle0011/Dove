import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import Admin from './models/Admin';
import dbConnect from './db';

// Ensure JWT_SECRET is set in environment variables
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not set in environment variables');
}

const JWT_SECRET = process.env.JWT_SECRET;

export interface AdminUser {
  id: string;
  email: string;
  username: string;
  role: 'admin' | 'moderator';
}

export function generateToken(user: Omit<AdminUser, 'password'>): string {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      username: user.username, 
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export async function verifyAdminToken(request: NextRequest): Promise<AdminUser | null> {
  try {
    const token = request.cookies.get('admin-token')?.value;
    
    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as AdminUser;
    
    // Verify admin still exists and is active
    await dbConnect();
    const admin = await Admin.findById(decoded.id).select('_id email username role isActive');
    
    if (!admin || !admin.isActive) {
      return null;
    }

    return {
      id: admin._id.toString(),
      email: admin.email,
      username: admin.username,
      role: admin.role
    };
  } catch (error) {
    return null;
  }
}

export async function requireAuth(request: NextRequest): Promise<NextResponse | AdminUser> {
  const admin = await verifyAdminToken(request);
  
  if (!admin) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }

  return admin;
}

export async function requireAdminRole(request: NextRequest): Promise<NextResponse | AdminUser> {
  const admin = await requireAuth(request);
  
  if (admin instanceof NextResponse) {
    return admin;
  }

  if (admin.role !== 'admin') {
    return NextResponse.json(
      { error: 'Admin privileges required' },
      { status: 403 }
    );
  }

  return admin;
} 