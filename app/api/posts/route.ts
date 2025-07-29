import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

// Use environment variables for MongoDB connection
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.MONGODB_DB || 'dove-spiritual-website';

// Validate MongoDB configuration
if (!process.env.MONGODB_URI) {
  console.warn('MONGODB_URI environment variable is not set. Using default local connection.');
}

// GET /api/posts - Get all posts
export async function GET(request: Request) {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('posts');
    
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const tag = searchParams.get('tag');
    
    let query: any = { isPublished: true };
    
    if (tag) {
      query.tags = { $in: [tag] };
    }
    
    const posts = await collection
      .find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();
    
    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}

// POST /api/posts - Create a new post
export async function POST(request: Request) {
  const client = new MongoClient(uri);
  
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.title || !data.content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }
    
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('posts');
    
    const postData = {
      ...data,
      author: data.author || 'Admin',
      authorEmail: data.authorEmail || 'admin@graceddove.com',
      isPublished: data.isPublished !== false,
      isPinned: data.isPinned || false,
      views: 0,
      likes: 0,
      comments: [],
      readTime: Math.ceil(data.content.split(/\s+/).length / 200),
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: data.tags || [],
      category: data.category || 'General'
    };
    
    const result = await collection.insertOne(postData);
    const post = { ...postData, _id: result.insertedId };
    
    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
