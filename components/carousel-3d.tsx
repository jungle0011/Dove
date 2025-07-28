"use client";

import React, {
  useRef,
  useEffect,
  useState,
  TouchEvent,
} from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Calendar, User, Eye, Heart } from "lucide-react";

export interface Post3DItem {
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

interface PostsCarousel3DProps {
  posts: Post3DItem[];
  autoRotate?: boolean;
  rotateInterval?: number;
  cardHeight?: number;
  title?: string;
  subtitle?: string;
  tagline?: string;
  onReadMore: (post: Post3DItem) => void;
}

const PostsCarousel3D = ({
  posts,
  autoRotate = true,
  rotateInterval = 4000,
  cardHeight = 500,
  title = "Latest Spiritual Posts",
  subtitle = "Divine Inspiration",
  tagline = "Discover our latest spiritual insights, prophetic words, and inspirational content to strengthen your faith journey.",
  onReadMore,
}: PostsCarousel3DProps) => {
  const [active, setActive] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  useEffect(() => {
    if (autoRotate && isInView && !isHovering && posts.length > 1) {
      const interval = setInterval(() => {
        setActive((prev) => (prev + 1) % posts.length);
      }, rotateInterval);
      return () => clearInterval(interval);
    }
  }, [isInView, isHovering, autoRotate, rotateInterval, posts.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    
    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  const onTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      setActive((prev) => (prev + 1) % posts.length);
    } else if (distance < -minSwipeDistance) {
      setActive((prev) => (prev - 1 + posts.length) % posts.length);
    }
  };

  const getCardAnimationClass = (index: number) => {
    if (index === active) return "scale-100 opacity-100 z-20";
    if (index === (active + 1) % posts.length)
      return "translate-x-[40%] scale-95 opacity-60 z-10";
    if (index === (active - 1 + posts.length) % posts.length)
      return "translate-x-[-40%] scale-95 opacity-60 z-10";
    return "scale-90 opacity-0";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (posts.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">{title}</h2>
          <p className="text-gray-600 mb-8">No posts available yet. Check back soon!</p>
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-gray-500">Posts created from the admin panel will appear here.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">{title}</h2>
          <h3 className="text-xl text-blue-600 font-semibold mb-4">{subtitle}</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">{tagline}</p>
        </div>

        {/* 3D Carousel */}
        <div
          className="relative overflow-hidden h-[550px] max-w-4xl mx-auto"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          ref={carouselRef}
        >
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            {posts.map((post, index) => (
              <div
                key={post._id}
                className={`absolute top-0 w-full max-w-md transform transition-all duration-500 ${getCardAnimationClass(
                  index
                )}`}
              >
                <div className={`overflow-hidden bg-white h-[${cardHeight}px] border shadow-lg hover:shadow-xl flex flex-col rounded-lg`}>
                  {/* Featured Image Header */}
                  <div
                    className="relative bg-gradient-to-br from-blue-400 to-purple-500 p-6 flex items-center justify-center h-48 overflow-hidden"
                    style={post.featuredImage ? {
                      backgroundImage: `url(${post.featuredImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    } : {}}
                  >
                    <div className="absolute inset-0 bg-black/50" />
                    <div 
                      className="relative z-10 text-center text-white cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        onReadMore(post);
                      }}
                    >
                      <h3 className="text-2xl font-bold mb-2">{post.category.toUpperCase()}</h3>
                      <div className="w-12 h-1 bg-white mx-auto mb-2" />
                      <p className="text-sm">{post.title}</p>
                      {post.isPinned && (
                        <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          Pinned
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div 
                    className="p-6 flex flex-col flex-grow cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      onReadMore(post);
                    }}
                  >
                    <h3 className="text-xl font-bold mb-1 text-gray-800 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-500 text-sm font-medium mb-2">By {post.author}</p>
                    <p className="text-gray-600 text-sm flex-grow line-clamp-3 mb-4">
                      {post.excerpt || post.content.substring(0, 120) + '...'}
                    </p>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(post.createdAt)}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
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

                    {/* Read More Link */}
                    <div className="mt-auto">
                      <button className="text-blue-600 flex items-center hover:underline relative group">
                        <span className="relative z-10">Read more</span>
                        <ArrowRight className="ml-2 w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                      </button>
                      <div className="mt-2 text-xs text-gray-400">
                        {post.readTime} min read
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          {posts.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-gray-500 hover:bg-white z-30 shadow-md transition-all hover:scale-110"
                onClick={() => setActive((prev) => (prev - 1 + posts.length) % posts.length)}
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-gray-500 hover:bg-white z-30 shadow-md transition-all hover:scale-110"
                onClick={() => setActive((prev) => (prev + 1) % posts.length)}
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {posts.length > 1 && (
            <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center space-x-3 z-30">
              {posts.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    active === idx ? "bg-blue-600 w-5" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  onClick={() => setActive(idx)}
                  aria-label={`Go to post ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PostsCarousel3D;
