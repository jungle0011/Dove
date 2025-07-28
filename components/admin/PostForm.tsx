'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Loader2, X, Image as ImageIcon, Video } from 'lucide-react'
import CloudinaryUpload from '@/components/CloudinaryUpload'
import { toast } from 'sonner'

const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  excerpt: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  tags: z.string(),
  isPinned: z.boolean().default(false),
  isPublished: z.boolean().default(true),
  featuredImage: z.string().optional(),
  imageUrl: z.string().optional(),
  videoUrl: z.string().optional(),
})

type PostFormValues = z.infer<typeof postSchema>

interface PostFormProps {
  initialData?: PostFormValues & { _id?: string }
  onSuccess?: () => void
  onCancel: () => void
  isSubmitting: boolean
}

export function PostForm({ initialData, onSuccess, onCancel, isSubmitting }: PostFormProps) {
  const isEdit = !!initialData?._id
  
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: initialData || {
      title: '',
      excerpt: '',
      content: '',
      tags: '',
      isPinned: false,
      isPublished: true,
      featuredImage: '',
      imageUrl: '',
      videoUrl: '',
    },
  })

  const { register, handleSubmit, formState: { errors }, setValue, watch } = form
  const featuredImage = watch('featuredImage')
  const videoUrl = watch('videoUrl')

  const onSubmit = async (data: PostFormValues) => {
    try {
      const url = isEdit ? `/api/posts/${initialData?._id}` : '/api/posts'
      const method = isEdit ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          tags: data.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        }),
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to save post')
      }
      
      toast.success(`Post ${isEdit ? 'updated' : 'created'} successfully`)
      onSuccess?.()
      
    } catch (error) {
      console.error('Error saving post:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to save post')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              {...register('title')}
              placeholder="Enter post title"
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              {...register('excerpt')}
              placeholder="A short summary of your post"
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              {...register('content')}
              placeholder="Write your post content here..."
              rows={10}
              className={errors.content ? 'border-red-500' : ''}
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              {...register('tags')}
              placeholder="faith, prayer, healing"
            />
            <p className="mt-1 text-sm text-muted-foreground">
              Separate tags with commas
            </p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-4 rounded-lg border p-4">
            <h3 className="font-medium">Publish</h3>
            <div className="flex items-center justify-between">
              <Label htmlFor="isPublished">Status</Label>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {watch('isPublished') ? 'Published' : 'Draft'}
                </span>
                <Switch
                  id="isPublished"
                  checked={watch('isPublished')}
                  onCheckedChange={(checked) => setValue('isPublished', checked)}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="isPinned">Pin to top</Label>
              <Switch
                id="isPinned"
                checked={watch('isPinned')}
                onCheckedChange={(checked) => setValue('isPinned', checked)}
              />
            </div>
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isEdit ? 'Updating...' : 'Publishing...'}
                  </>
                ) : isEdit ? (
                  'Update Post'
                ) : (
                  'Publish Post'
                )}
              </Button>
            </div>
          </div>
          
          <div className="space-y-4 rounded-lg border p-4">
            <h3 className="font-medium">Featured Image</h3>
            {featuredImage ? (
              <div className="relative group">
                <img
                  src={featuredImage}
                  alt="Featured"
                  className="w-full h-48 object-cover rounded-md"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => {
                    setValue('featuredImage', '')
                    setValue('imageUrl', '')
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <CloudinaryUpload
                onSuccess={(url) => {
                  setValue('featuredImage', url)
                  setValue('imageUrl', url)
                }}
                resourceType="image"
                buttonText="Upload Image"
                className="w-full"
              />
            )}
          </div>
          
          <div className="space-y-4 rounded-lg border p-4">
            <h3 className="font-medium">Video (Optional)</h3>
            {videoUrl ? (
              <div className="relative group">
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                  <Video className="h-12 w-12 text-muted-foreground" />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => setValue('videoUrl', '')}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <CloudinaryUpload
                onSuccess={(url) => setValue('videoUrl', url)}
                resourceType="video"
                buttonText="Upload Video"
                className="w-full"
              />
            )}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isEdit ? 'Updating...' : 'Publishing...'}
            </>
          ) : isEdit ? (
            'Update Post'
          ) : (
            'Publish Post'
          )}
        </Button>
      </div>
    </form>
  )
}
