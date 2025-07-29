'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Eye, Calendar, Tag as TagIcon, Pin, MessageSquare } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Post } from '@/app/admin/dashboard/page'
import Image from 'next/image'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface PostListItemProps {
  post: Post
  onEdit: (post: Post) => void
  onDelete: (id: string) => void
  onTogglePublish: (post: Post) => void
  onTogglePin: (post: Post) => void
  onTagClick: (tag: string) => void
}

export function PostListItem({
  post,
  onEdit,
  onDelete,
  onTogglePublish,
  onTogglePin,
  onTagClick,
}: PostListItemProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row">
        {/* Featured Image */}
        {post.featuredImage && (
          <div className="md:w-1/3 h-48 md:h-auto relative">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        )}
        
        {/* Content */}
        <div className="flex-1 flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-semibold text-lg line-clamp-2">
                {post.isPinned && (
                  <Pin className="inline h-4 w-4 mr-2 text-yellow-500" />
                )}
                {post.title}
              </h3>
              
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(post)}
                  className="h-8 w-8"
                >
                  <span className="sr-only">Edit</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </Button>
                
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowDeleteDialog(true)}
                    className="h-8 w-8 text-red-500 hover:text-red-700"
                    disabled={isDeleting}
                  >
                    <span className="sr-only">Delete</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </Button>

                  <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete the post "{post.title}". This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          className="bg-red-600 hover:bg-red-700"
                          disabled={isDeleting}
                          onClick={async (e) => {
                            e.preventDefault();
                            try {
                              setIsDeleting(true);
                              await onDelete(post._id);
                              setShowDeleteDialog(false);
                            } finally {
                              setIsDeleting(false);
                            }
                          }}
                        >
                          {isDeleting ? 'Deleting...' : 'Delete Post'}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>{format(new Date(post.createdAt), 'MMM d, yyyy')}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" />
                <span>{post.views} views</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="h-3.5 w-3.5" />
                <span>{post.comments?.length || 0} comments</span>
              </div>
            </div>
            
            {post.excerpt && (
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                {post.excerpt}
              </p>
            )}
            
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs cursor-pointer hover:bg-primary/10"
                    onClick={(e) => {
                      e.stopPropagation()
                      onTagClick(tag)
                    }}
                  >
                    <TagIcon className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </CardHeader>
          
          <CardFooter className="mt-auto pt-0 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Switch
                id={`publish-${post._id}`}
                checked={post.isPublished}
                onCheckedChange={() => onTogglePublish(post)}
              />
              <Label htmlFor={`publish-${post._id}`} className="text-sm">
                {post.isPublished ? 'Published' : 'Draft'}
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onTogglePin(post)}
                className={post.isPinned ? 'text-yellow-500' : ''}
              >
                <Pin className={`h-4 w-4 mr-1 ${post.isPinned ? 'fill-current' : ''}`} />
                {post.isPinned ? 'Pinned' : 'Pin'}
              </Button>
            </div>
          </CardFooter>
        </div>
      </div>
    </Card>
  )
}
