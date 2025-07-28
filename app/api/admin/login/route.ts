import { NextResponse } from 'next/server';
import { createToken, validateCredentials } from '@/lib/simple-auth';

// Simple login endpoint
export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    
    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' }, 
        { status: 400 }
      );
    }
    
    // Validate credentials (in-memory for simplicity)
    const isValid = await validateCredentials(username, password);
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' }, 
        { status: 401 }
      );
    }
    
    // Create JWT token
    const token = createToken(username);
    
    // Set HTTP-only cookie
    const response = NextResponse.json({ 
      success: true,
      message: 'Login successful',
      user: { username }
    });
    
    response.cookies.set({
      name: 'admin-token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });
    
    return response;
    
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}