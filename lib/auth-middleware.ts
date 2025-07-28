import { NextResponse } from 'next/server';
import { verifyToken } from './simple-auth';

// Simple middleware to protect routes
export function requireAuth(handler: any) {
  return async (req: Request) => {
    // Get token from Authorization header
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1]; // Bearer <token>

    if (!token) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Add user to request and continue
    (req as any).user = decoded;
    return handler(req);
  };
}
