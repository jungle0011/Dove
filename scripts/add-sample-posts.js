const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const dbName = 'dove-spiritual-website';

const samplePosts = [
  {
    title: "Walking in Divine Purpose",
    content: "Discover your God-given purpose and learn to walk confidently in the path He has prepared for you. This prophetic word will encourage your heart and strengthen your faith.",
    excerpt: "Discover your God-given purpose and learn to walk confidently in the path He has prepared for you.",
    author: "Prophetess Grace",
    authorEmail: "grace@graceddove.com",
    tags: ["purpose", "faith", "prophetic"],
    category: "Prophetic Word",
    isPinned: true,
    isPublished: true,
    views: 245,
    likes: 18,
    comments: [],
    featuredImage: "",
    readTime: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Healing Rain from Heaven",
    content: "Experience the supernatural healing power of God as His healing rain pours down upon you. Testimonies of miraculous healings and breakthrough.",
    excerpt: "Experience the supernatural healing power of God as His healing rain pours down upon you.",
    author: "Prophetess Grace",
    authorEmail: "grace@graceddove.com",
    tags: ["healing", "miracles", "breakthrough"],
    category: "Healing Ministry",
    isPinned: false,
    isPublished: true,
    views: 189,
    likes: 24,
    comments: [],
    featuredImage: "",
    readTime: 7,
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
    updatedAt: new Date(Date.now() - 86400000)
  },
  {
    title: "Prophetic Encounters in Prayer",
    content: "Learn how to position yourself for divine encounters during prayer. Practical steps to deepen your relationship with the Holy Spirit.",
    excerpt: "Learn how to position yourself for divine encounters during prayer.",
    author: "Prophetess Grace",
    authorEmail: "grace@graceddove.com",
    tags: ["prayer", "prophetic", "holy spirit"],
    category: "Teaching",
    isPinned: false,
    isPublished: true,
    views: 156,
    likes: 12,
    comments: [],
    featuredImage: "",
    readTime: 6,
    createdAt: new Date(Date.now() - 172800000), // 2 days ago
    updatedAt: new Date(Date.now() - 172800000)
  }
];

async function addSamplePosts() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(dbName);
    const collection = db.collection('posts');
    
    // Clear existing posts
    await collection.deleteMany({});
    console.log('Cleared existing posts');
    
    // Insert sample posts
    const result = await collection.insertMany(samplePosts);
    console.log(`Inserted ${result.insertedCount} sample posts`);
    
    console.log('Sample posts added successfully!');
  } catch (error) {
    console.error('Error adding sample posts:', error);
  } finally {
    await client.close();
  }
}

addSamplePosts();
