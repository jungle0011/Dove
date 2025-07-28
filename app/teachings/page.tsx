"use client"

import { useEffect, useState, useMemo } from "react"
import { Heart, MessageCircle, Share2, Pin, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import EnhancedFooter from "@/components/enhanced-footer"
import Navigation from "@/components/navigation"

interface Teaching {
  _id: string
  title: string
  content: string
  tags: string[]
  pinned: boolean
  createdAt: string
  updatedAt: string
  media?: { url: string; type: "image" | "video" }[]
  favorites?: number
  comments?: number
}

export default function TeachingsPage() {
  const [teachings, setTeachings] = useState<Teaching[]>([])
  const [search, setSearch] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])

  useEffect(() => {
    fetchTeachings()
    // Load favorites from localStorage
    const favs = localStorage.getItem("dove-favorites")
    if (favs) setFavoriteIds(JSON.parse(favs))
  }, [])

  const fetchTeachings = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/articles", { cache: "no-store" })
      const data = await res.json()
      setTeachings(data.articles || [])
    } catch (e) {
      console.error('Error fetching teachings:', e)
      setTeachings([])
    } finally {
      setLoading(false)
    }
  }

  const handleFavorite = (id: string) => {
    let updated: string[]
    if (favoriteIds.includes(id)) {
      updated = favoriteIds.filter(fav => fav !== id)
    } else {
      updated = [...favoriteIds, id]
    }
    setFavoriteIds(updated)
    localStorage.setItem("dove-favorites", JSON.stringify(updated))
  }

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    teachings.forEach(t => t.tags?.forEach(tag => tags.add(tag)))
    return Array.from(tags)
  }, [teachings])

  const filteredTeachings = useMemo(() => {
    let items = teachings
    if (search) {
      items = items.filter(t =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.content.toLowerCase().includes(search.toLowerCase())
      )
    }
    if (selectedTag) {
      items = items.filter(t => t.tags?.includes(selectedTag))
    }
    // Pinned first
    return [
      ...items.filter(t => t.pinned),
      ...items.filter(t => !t.pinned),
    ]
  }, [teachings, search, selectedTag])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:bg-slate-900">
      <span className="text-2xl text-amber-600 font-bold">Loading...</span>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:bg-slate-900 transition-all duration-1000">
      <Navigation isDarkMode={false} setIsDarkMode={() => {}} />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-700 dark:text-amber-300 mb-2">Teachings</h1>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-2.5 text-amber-400" />
              <input
                type="text"
                placeholder="Search teachings..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-amber-200 focus:border-amber-500 focus:ring-amber-200 focus:outline-none bg-white dark:bg-slate-800 dark:text-white"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
              <Badge
                variant={!selectedTag ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedTag(null)}
              >
                All
              </Badge>
              {allTags.map(tag => (
                <Badge
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        {/* Uniform grid like admin panel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTeachings.length === 0 && (
            <div className="text-center text-gray-400 py-24 text-xl">No teachings found.</div>
          )}
          {filteredTeachings.map(teaching => (
            <Card
              key={teaching._id}
              className={`mb-6 break-inside-avoid shadow-xl border-amber-100 dark:border-amber-800 bg-white/95 dark:bg-slate-800/90 transition-all duration-300 hover:scale-[1.02] ${teaching.pinned ? "ring-2 ring-amber-400" : ""}`}
            >
              <CardHeader className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  {teaching.pinned && <Pin className="text-amber-400" />}
                  <CardTitle className="text-2xl font-bold text-amber-700 dark:text-amber-300">{teaching.title}</CardTitle>
                </div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {teaching.tags?.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs border-amber-300 dark:border-amber-700 text-amber-600 dark:text-amber-300">{tag}</Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 items-center justify-center">
                {/* Media */}
                {teaching.media && teaching.media.length > 0 && (
                  <div className="w-full rounded-lg overflow-hidden mb-2 flex justify-center">
                    {teaching.media[0].type === "image" ? (
                      <img src={teaching.media[0].url} alt="Teaching Media" className="w-full max-w-xs object-cover rounded-lg" />
                    ) : (
                      <video src={teaching.media[0].url} controls className="w-full max-w-xs rounded-lg" />
                    )}
                  </div>
                )}
                <div className="prose prose-amber max-w-none dark:prose-invert text-center" dangerouslySetInnerHTML={{ __html: teaching.content }} />
                <div className="flex items-center justify-between mt-2 w-full">
                  <div className="flex items-center gap-4">
                    <button
                      className={`flex items-center gap-1 text-amber-500 hover:text-amber-700 transition-colors ${favoriteIds.includes(teaching._id) ? "font-bold" : ""}`}
                      onClick={() => handleFavorite(teaching._id)}
                      aria-label="Favorite"
                    >
                      <Heart fill={favoriteIds.includes(teaching._id) ? "#facc15" : "none"} />
                      <span>{favoriteIds.includes(teaching._id) ? "Favorited" : "Favorite"}</span>
                    </button>
                    <span className="flex items-center gap-1 text-gray-400 dark:text-gray-500">
                      <MessageCircle className="w-4 h-4" />
                      {teaching.comments || 0}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="text-gray-400 hover:text-amber-500 transition-colors"
                      onClick={() => {
                        navigator.share ? navigator.share({ title: teaching.title, url: window.location.href }) : window.open(window.location.href, "_blank")
                      }}
                      aria-label="Share"
                    >
                      <Share2 />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <EnhancedFooter />
    </div>
  )
} 