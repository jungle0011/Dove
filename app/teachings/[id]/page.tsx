import { notFound } from "next/navigation"
import { headers } from "next/headers"
import { Badge } from "@/components/ui/badge"
import { Pin } from "lucide-react"

async function getTeaching(id: string) {
  const host = headers().get("host")
  const protocol = host?.includes("localhost") ? "http" : "https"
  const baseUrl = `${protocol}://${host}`
  const res = await fetch(`${baseUrl}/api/articles/${id}`, { cache: "no-store" })
  if (!res.ok) return null
  return res.json()
}

export default async function TeachingDetailPage({ params }: { params: { id: string } }) {
  const data = await getTeaching(params.id)
  if (!data || data.error) return notFound()
  const teaching = data
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:bg-slate-900 transition-all duration-1000 px-4 py-12">
      <div className="max-w-2xl mx-auto bg-white/95 dark:bg-slate-800/90 rounded-2xl shadow-2xl border border-amber-100 dark:border-amber-800 p-8">
        <div className="flex items-center gap-2 mb-2">
          {teaching.pinned && <Pin className="text-amber-400" />}
          <h1 className="text-3xl font-bold text-amber-700 dark:text-amber-300 line-clamp-2">{teaching.title}</h1>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {teaching.tags?.map((tag: string) => (
            <Badge key={tag} variant="outline" className="text-xs border-amber-300 dark:border-amber-700 text-amber-600 dark:text-amber-300">{tag}</Badge>
          ))}
        </div>
        {teaching.media && teaching.media.length > 0 && (
          <div className="w-full flex justify-center mb-6">
            {teaching.media[0].type === "image" ? (
              <img src={teaching.media[0].url} alt="Teaching Media" className="w-full max-w-md object-cover rounded-lg shadow" />
            ) : (
              <video src={teaching.media[0].url} controls className="w-full max-w-md rounded-lg shadow" />
            )}
          </div>
        )}
        <div className="prose prose-amber max-w-none dark:prose-invert text-lg" dangerouslySetInnerHTML={{ __html: teaching.content }} />
      </div>
    </div>
  )
} 