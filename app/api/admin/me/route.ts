import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/simple-middleware';

// Simple protected route that just returns success if authenticated
const handler = async (req: Request) => {
  console.log('Protected route: Handling request');
  return NextResponse.json({
    success: true,
    message: 'You are authenticated!',
    // In a real app, you might return user data here
    // But for now, we're just testing the auth flow
  });
};

// Apply the auth middleware to this route
export const GET = withAuth(handler);
