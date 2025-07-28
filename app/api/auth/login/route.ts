import { NextResponse } from 'next/server';
import { createToken, validateCredentials } from '@/lib/simple-auth';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Validate credentials (simple in-memory check)
    const isValid = validateCredentials(username, password);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create token
    const token = createToken(username);

    // Return token in response (client will need to store it)
    return NextResponse.json({
      success: true,
      token,
      user: { username }
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 