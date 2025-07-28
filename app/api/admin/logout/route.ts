import { NextResponse } from 'next/server';

export async function POST() {
  // Create response
  const response = NextResponse.json({ success: true });
  
  // Clear the JWT cookie
  response.cookies.set('admin-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(0), // Set to past date to delete
    path: '/',
  });
  
  return response;
}