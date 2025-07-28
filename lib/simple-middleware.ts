import { NextResponse } from 'next/server';
import { verifyToken } from './simple-auth';

// Simple middleware that just checks for a valid token
export function withAuth(handler: any) {
  return async (req: Request) => {
    console.log('Middleware: Checking auth...');
    
    // For testing - allow access to login endpoint
    if (req.url.includes('/api/admin/login')) {
      console.log('Middleware: Allowing access to login endpoint');
      return handler(req);
    }
    
    try {
      // Get token from cookies
      const cookieHeader = req.headers.get('cookie') || '';
      console.log('Middleware: Raw cookies:', cookieHeader);
      
      // Simple cookie parsing
      const cookies: Record<string, string> = {};
      cookieHeader.split(';').forEach(cookie => {
        const [key, value] = cookie.trim().split('=');
        if (key && value) cookies[key.trim()] = value.trim();
      });
      
      const token = cookies['admin-token'];
      console.log('Middleware: Extracted token:', token ? '***' : 'none');
      
      if (!token) {
        console.log('Middleware: No token found');
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        );
      }
      
      // Verify token
      console.log('Middleware: Verifying token...');
      const decoded = verifyToken(token);
      console.log('Middleware: Token verified:', decoded ? 'valid' : 'invalid');
      
      if (!decoded) {
        return NextResponse.json(
          { error: 'Invalid or expired token' },
          { status: 401 }
        );
      }
      
      // Continue to the handler
      console.log('Middleware: Authentication successful');
      return handler(req);
      
    } catch (error) {
      console.error('Auth middleware error:', error);
      return NextResponse.json(
        { error: 'Authentication failed' },
        { status: 401 }
      );
    }
  };
}
