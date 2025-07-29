import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

// Get MongoDB URI from environment variables
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.MONGODB_DB || 'dove-spiritual-website';

if (!process.env.MONGODB_URI) {
  console.warn('MONGODB_URI environment variable is not set. Using default local MongoDB connection.');
}

// PUT /api/posts/[id] - Update a post
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const client = new MongoClient(uri);
  
  try {
    const data = await request.json();
    
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('posts');
    
    const updateData = {
      ...data,
      tags: data.tags || [],
      updatedAt: new Date(),
    };
    
    const result = await collection.updateOne(
      { _id: new ObjectId(params.id) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }
    
    const updatedPost = await collection.findOne({ _id: new ObjectId(params.id) });
    
    return NextResponse.json({ post: updatedPost });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}

// DELETE /api/posts/[id] - Delete a post
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('posts');
    
    const result = await collection.deleteOne({ _id: new ObjectId(params.id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
