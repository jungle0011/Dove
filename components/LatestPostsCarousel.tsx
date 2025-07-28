import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { Badge } from "@/components/ui/badge"
import { Pin } from "lucide-react"

interface Teaching {
  _id: string
  title: string
  content: string
  tags: string[]
  pinned?: boolean
  media?: { url: string; type: "image" | "video" }[]
}

interface LatestPostsCarouselProps {
  posts: Teaching[]
}

const getExcerpt = (html: string, maxLength = 120) => {
  const text = html.replace(/<[^>]+>/g, "")
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text
}

const LatestPostsCarousel: React.FC<LatestPostsCarouselProps> = ({ posts }) => {
  if (!posts || posts.length === 0) return (
    <div className="text-center text-gray-400 py-12">No teachings to display.</div>
  )
  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        spaceBetween={32}
        loop={true}
        autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: false, stopOnLastSlide: false, waitForTransition: false }}
        pagination={{ clickable: true, el: ".main-carousel-pagination" }}
        navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
        breakpoints={{
          640: { slidesPerView: 1 },
          900: { slidesPerView: 2 },
          1280: { slidesPerView: 3 },
        }}
        className="w-full"
      >
        {posts.map((teaching) => (
          <SwiperSlide key={teaching._id}>
            <div className="flex flex-col h-[420px] bg-white/95 dark:bg-slate-800/90 rounded-2xl shadow-2xl border border-amber-100 dark:border-amber-800 p-6 transition-all duration-300 hover:scale-[1.02] max-w-md mx-auto relative">
              <div className="flex items-center gap-2 mb-2">
                {teaching.pinned && <Pin className="text-amber-400" />}
                <h3 className="text-xl font-bold text-amber-700 dark:text-amber-300 line-clamp-2">{teaching.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {teaching.tags?.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs border-amber-300 dark:border-amber-700 text-amber-600 dark:text-amber-300">{tag}</Badge>
                ))}
              </div>
              {teaching.media && teaching.media.length > 0 && (
                <div className="w-full flex justify-center mb-3">
                  {teaching.media[0].type === "image" ? (
                    <img src={teaching.media[0].url} alt="Teaching Media" className="w-full max-w-xs h-40 object-cover rounded-lg shadow" />
                  ) : (
                    <video src={teaching.media[0].url} controls className="w-full max-w-xs h-40 rounded-lg shadow" />
                  )}
                </div>
              )}
              <div className="text-gray-700 dark:text-gray-200 text-sm mb-4 line-clamp-3 text-center">{getExcerpt(teaching.content)}</div>
              <a href={`/teachings/${teaching._id}`} className="mt-auto inline-block bg-gradient-to-r from-amber-500 to-yellow-400 text-white font-semibold px-5 py-2 rounded-full shadow hover:from-amber-600 hover:to-yellow-500 transition">Read More</a>
            </div>
          </SwiperSlide>
        ))}
        <div className="main-carousel-pagination" />
        <div className="custom-swiper-nav swiper-button-prev" />
        <div className="custom-swiper-nav swiper-button-next" />
      </Swiper>
    </div>
  )
}

export default LatestPostsCarousel 