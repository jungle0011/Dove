import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Article from '@/lib/models/Article';

export async function GET() {
  try {
    await dbConnect();
    console.log('Connected to MongoDB successfully');
    
    const articles = await Article.find().sort({ createdAt: -1 });
    console.log(`Found ${articles.length} articles`);
    
    // Ensure every article has a media field (default to empty array if missing)
    const articlesWithMedia = articles.map(article => ({
      ...article.toObject(),
      media: Array.isArray(article.media) ? article.media : [],
    }));
    
    console.log('Returning articles:', articlesWithMedia.length);
    return NextResponse.json({ articles: articlesWithMedia });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ error: 'Failed to fetch articles.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    console.log('Connected to MongoDB successfully for POST');
    
    const data = await req.json();
    console.log('Received data:', data);
    
    const { title, content, media, type, tags, author, authorAvatar, pinned } = data;
    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required.' }, { status: 400 });
    }
    
    const articleData = {
      title,
      content,
      media: media || [],
      type,
      tags,
      author,
      authorAvatar,
      pinned,
    };
    
    console.log('Creating article with data:', articleData);
    const article = await Article.create(articleData);
    console.log('Article created successfully:', article._id);
    
    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json({ error: 'Failed to create article.' }, { status: 500 });
  }
} 