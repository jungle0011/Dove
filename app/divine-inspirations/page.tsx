'use client';

import { useState, useEffect } from 'react';
import { Calendar, User, Eye, Heart, Search, Filter, ChevronDown } from 'lucide-react';

interface Post {
  _id: string;
  title: string;
  content: string;
  excerpt?: string;
  author: string;
  tags: string[];
  category: string;
  isPinned: boolean;
  isPublished: boolean;
  views: number;
  likes: number;
  createdAt: string;
  readTime: number;
  featuredImage?: string;
}

export default function DivineInspirationsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [expandedPost, setExpandedPost] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts?limit=50');
      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts || []);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const categories = ['All', ...Array.from(new Set(posts.map(post => post.category)))];
  const allTags = ['All', ...Array.from(new Set(posts.flatMap(post => post.tags)))];

  const filteredPosts = posts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesTag = selectedTag === 'All' || post.tags.includes(selectedTag);
      return matchesSearch && matchesCategory && matchesTag;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'popular':
          return (b.views + b.likes) - (a.views + a.likes);
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const pinnedPosts = filteredPosts.filter(post => post.isPinned);
  const regularPosts = filteredPosts.filter(post => !post.isPinned);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading divine inspirations...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Divine Inspirations</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            A sacred space where spiritual insights, prophetic words, and divine revelations come together 
            to strengthen your faith journey and deepen your relationship with God.
          </p>
          <div className="mt-8 text-blue-100">
            <span className="text-2xl font-semibold">{posts.length}</span> Divine Messages Available
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>

            {/* Tag Filter */}
            <div className="relative">
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag === 'All' ? 'All Tags' : tag}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
                <option value="title">Alphabetical</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredPosts.length} of {posts.length} divine inspirations
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {selectedTag !== 'All' && ` tagged with "${selectedTag}"`}
          </p>
        </div>

        {/* Pinned Posts */}
        {pinnedPosts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="bg-yellow-500 text-white px-2 py-1 rounded text-sm mr-2">PINNED</span>
              Featured Messages
            </h2>
            <div className="space-y-4">
              {pinnedPosts.map((post) => (
                <PostCard 
                  key={post._id} 
                  post={post} 
                  expandedPost={expandedPost}
                  setExpandedPost={setExpandedPost}
                  formatDate={formatDate}
                  isPinned={true}
                />
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts */}
        {regularPosts.length > 0 ? (
          <div className="space-y-6">
            {regularPosts.map((post) => (
              <PostCard 
                key={post._id} 
                post={post} 
                expandedPost={expandedPost}
                setExpandedPost={setExpandedPost}
                formatDate={formatDate}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🙏</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No posts found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

interface PostCardProps {
  post: Post;
  expandedPost: string | null;
  setExpandedPost: (id: string | null) => void;
  formatDate: (date: string) => string;
  isPinned?: boolean;
}

function PostCard({ post, expandedPost, setExpandedPost, formatDate, isPinned = false }: PostCardProps) {
  const isExpanded = expandedPost === post._id;

  return (
    <div className={`bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
      isPinned ? 'border-l-4 border-yellow-500' : ''
    }`}>
      {/* Featured Image */}
      {post.featuredImage && (
        <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 relative overflow-hidden">
          <img 
            src={post.featuredImage} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
              {post.title}
            </h2>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.createdAt)}</span>
              </div>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                {post.category}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{post.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>{post.likes}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mb-4">
          <p className="text-gray-700 leading-relaxed">
            {isExpanded ? post.content : (post.excerpt || post.content.substring(0, 200) + '...')}
          </p>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag, idx) => (
              <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <button
            onClick={() => setExpandedPost(isExpanded ? null : post._id)}
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            {isExpanded ? 'Show Less' : 'Read More'}
          </button>
          <div className="text-xs text-gray-400">
            {post.readTime} min read
          </div>
        </div>
      </div>
    </div>
  );
}
