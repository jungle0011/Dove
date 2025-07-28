"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { answeredPrayers } from "@/data/testimonials"

// Custom hook for mobile detection with debounce
const useMobileCheck = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Debounce the resize handler
    let timeoutId: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(checkIfMobile, 100)
    }

    // Use passive event listener for better performance
    window.addEventListener('resize', handleResize, { passive: true })
    
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return isMobile
}

// Memoized Testimonial Card Component
const TestimonialCard = React.memo(({ 
  testimonial, 
  isActive = true 
}: { 
  testimonial: typeof answeredPrayers[0]
  isActive?: boolean
}) => {
  return (
    <div className={`transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}>
      <Card 
        className="h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-amber-100 dark:border-amber-900/50 hover:border-amber-200 dark:hover:border-amber-800 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10 p-6 flex flex-col"
      >
        <CardContent className="p-0 flex-grow flex flex-col">
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
            ))}
          </div>
          <p className="text-gray-700 dark:text-gray-300 italic mb-6 flex-grow">"{testimonial.text}"</p>
          <div className="mt-auto">
            <p className="font-medium text-gray-900 dark:text-white">{testimonial.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.location}</p>
            <span className="inline-block mt-2 px-3 py-1 text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded-full">
              {testimonial.category}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
});

TestimonialCard.displayName = 'TestimonialCard';

// Memoized Particle component to prevent unnecessary re-renders
const Particle = React.memo(({ id, x, y, delay }: { id: number; x: number; y: number; delay: number }) => (
  <div
    className="absolute w-2 h-2 bg-gradient-to-r from-amber-300 to-yellow-300 rounded-full animate-float opacity-60"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${8 + Math.random() * 4}s`,
    }}
  />
));

Particle.displayName = 'Particle';

// Memoized navigation button component
const NavButton = React.memo(({ 
  direction, 
  onClick,
  className = '' 
}: { 
  direction: 'prev' | 'next', 
  onClick: () => void,
  className?: string 
}) => {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight;
  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-slate-800/90 rounded-full p-2 sm:p-3 shadow-lg hover:scale-110 transition-all duration-300 min-h-[44px] min-w-[44px] focus:outline-none focus:ring-2 focus:ring-amber-400 ${className}`}
      aria-label={direction === 'prev' ? 'Previous testimony' : 'Next testimony'}
    >
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-300" />
    </button>
  );
});

NavButton.displayName = 'NavButton';

export default function AnsweredPrayers() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileCheck();

  // Memoize the current testimonial to prevent unnecessary re-renders
  const currentTestimonial = useMemo(() => 
    answeredPrayers[currentIndex], 
    [currentIndex]
  );

  // Preload the next and previous testimonials for smoother transitions
  const nextIndex = (currentIndex + 1) % answeredPrayers.length;
  const prevIndex = (currentIndex - 1 + answeredPrayers.length) % answeredPrayers.length;

  // Handle touch events with passive listeners for better performance
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextPrayer();
    } else if (isRightSwipe) {
      prevPrayer();
    }

    // Reset touch values
    touchStartX.current = null;
    touchEndX.current = null;
  }, []);

  // Initialize particles with useMemo to prevent recalculation on re-renders
  const initializeParticles = useCallback(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }));
  }, []);

  // Initialize particles on component mount
  useEffect(() => {
    setParticles(initializeParticles());
  }, [initializeParticles]);

  // Auto-rotate testimonials with cleanup
  useEffect(() => {
    if (isMobile) return; // Disable auto-rotation on mobile for better UX
    
    const timer = setInterval(() => {
      nextPrayer();
    }, 8000); // Increased interval for better UX

    return () => clearInterval(timer);
  }, [currentIndex]); // Only re-run if currentIndex changes

  // Smoothly transition between testimonials
  const transitionToIndex = useCallback((newIndex: number) => {
    setIsTransitioning(true);
    
    // Use requestAnimationFrame for smoother animations
    requestAnimationFrame(() => {
      setCurrentIndex(newIndex);
      
      // Reset transition state after animation completes
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500); // Match this with your CSS transition duration
    });
  }, []);

  const nextPrayer = useCallback(() => {
    if (isTransitioning) return;
    const newIndex = (currentIndex + 1) % answeredPrayers.length;
    transitionToIndex(newIndex);
  }, [currentIndex, isTransitioning, transitionToIndex]);

  const prevPrayer = useCallback(() => {
    if (isTransitioning) return;
    const newIndex = (currentIndex - 1 + answeredPrayers.length) % answeredPrayers.length;
    transitionToIndex(newIndex);
  }, [currentIndex, isTransitioning, transitionToIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextPrayer();
      if (e.key === 'ArrowLeft') prevPrayer();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextPrayer, prevPrayer]);

  // Memoize the category color mapping
  const getCategoryColor = useCallback((category: string) => {
    const colors: Record<string, string> = {
      Healing: "from-green-400 to-emerald-400",
      Deliverance: "from-purple-400 to-violet-400",
      Breakthrough: "from-amber-400 to-yellow-400",
      Prophecy: "from-blue-400 to-cyan-400",
      Freedom: "from-pink-400 to-rose-400",
    };
    return colors[category] || "from-gray-400 to-slate-400";
  }, []);

  // Memoize the gradient class to prevent recalculation
  const gradientClass = useMemo(() => 
    getCategoryColor(currentTestimonial.category),
    [currentTestimonial.category, getCategoryColor]
  );

  // Memoized component for the category badge
  const CategoryBadge = React.memo(({ category }: { category: string }) => (
    <div className="inline-flex items-center space-x-2 mb-6">
      <div
        className={`px-4 py-2 rounded-full bg-gradient-to-r ${getCategoryColor(category)} text-white text-sm font-medium`}
      >
        {category}
      </div>
    </div>
  ));
  CategoryBadge.displayName = 'CategoryBadge';

  // Memoized component for the star rating
  const StarRating = React.memo(() => (
    <div className="flex justify-center mb-6">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-6 h-6 text-amber-400 fill-current" />
      ))}
    </div>
  ));
  StarRating.displayName = 'StarRating';

  // Memoized component for the dots indicator
  const DotsIndicator = React.memo(({ 
    count, 
    currentIndex, 
    onDotClick 
  }: { 
    count: number; 
    currentIndex: number; 
    onDotClick: (index: number) => void 
  }) => (
    <div className="flex justify-center mt-8 space-x-2">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            index === currentIndex ? "bg-amber-500 scale-125" : "bg-gray-300 dark:bg-gray-600 hover:bg-amber-300"
          }`}
          aria-label={`Go to testimony ${index + 1}`}
        />
      ))}
    </div>
  ));
  DotsIndicator.displayName = 'DotsIndicator';

  // Handle dot click with transition
  const handleDotClick = useCallback((index: number) => {
    if (index === currentIndex || isTransitioning) return;
    transitionToIndex(index);
  }, [currentIndex, isTransitioning, transitionToIndex]);

  return (
    <section 
      id="answered-prayers"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-900 relative overflow-hidden"
      ref={containerRef}
    >
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <Particle 
            key={particle.id} 
            id={particle.id} 
            x={particle.x} 
            y={particle.y} 
            delay={particle.delay} 
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12 scroll-reveal">
          <h2 className="text-3xl md:text-4xl font-light text-gray-800 dark:text-white mb-4">
            Answered Prayers & Testimonies
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Witness the miraculous power of God through these testimonies
          </p>
        </div>

        <div className="relative">
          {/* Main Testimony Card */}
          <Card
            className={`bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-amber-200 dark:border-amber-700 shadow-2xl overflow-hidden transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <CardContent className="p-8 md:p-12 text-center relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 via-yellow-400/10 to-amber-400/10 animate-pulse" />

              <div className="relative z-10">
                {/* Category Badge */}
                <CategoryBadge category={currentTestimonial.category} />

                {/* Stars */}
                <StarRating />

                {/* Testimony Text */}
                <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 italic leading-relaxed">
                  "{currentTestimonial.text}"
                </blockquote>

                {/* Attribution */}
                <div className="space-y-2">
                  <cite className="text-lg font-semibold text-gray-800 dark:text-white block">
                    — {currentTestimonial.name}
                  </cite>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {currentTestimonial.location}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <NavButton 
            direction="prev" 
            onClick={prevPrayer} 
            className="left-2 sm:left-4" 
          />
          
          <NavButton 
            direction="next" 
            onClick={nextPrayer} 
            className="right-2 sm:right-4" 
          />
        </div>

        {/* Dots Indicator */}
        <DotsIndicator 
          count={answeredPrayers.length} 
          currentIndex={currentIndex} 
          onDotClick={handleDotClick} 
        />
      </div>
    </section>
  );
}
