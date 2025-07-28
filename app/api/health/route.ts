import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import mongoose from 'mongoose';

export async function GET() {
  try {
    // Check if already connected
    if (mongoose.connection.readyState === 1) {
      return NextResponse.json({ 
        status: 'connected',
        dbName: mongoose.connection.name,
        dbHost: mongoose.connection.host
      });
    }

    // If not connected, try to connect
    await dbConnect();
    
    return NextResponse.json({ 
      status: 'connected',
      dbName: mongoose.connection.name,
      dbHost: mongoose.connection.host
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      { 
        status: 'error',
        error: 'Failed to connect to database',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
