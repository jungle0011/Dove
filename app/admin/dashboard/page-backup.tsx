'use client';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome to the admin dashboard</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium">Create New Post</h3>
              <p className="text-sm text-gray-500">Write a new blog post</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium">Manage Posts</h3>
              <p className="text-sm text-gray-500">View and edit all posts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    try {
      const url = editingPost 
        ? `/api/posts/${editingPost._id}`
        : '/api/posts'
      
      const method = editingPost ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to save post')
      }
      
      const { post: savedPost } = await response.json()
      
      if (editingPost) {
        setPosts(prev => prev.map(p => p._id === savedPost._id ? savedPost : p))
        toast.success('Post updated successfully')
      } else {
        setPosts(prev => [savedPost, ...prev])
        toast.success('Post created successfully')
      }
      
      setMode('list')
      setEditingPost(null)
      setForm(initialFormState)
      
    } catch (error) {
      console.error('Error saving post:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to save post')
    } finally {
      setSaving(false)
    }
  }

  // Handle post deletion
  const handleDelete = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return
    
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete post')
      }
      
      setPosts(prev => prev.filter(post => post._id !== postId))
      toast.success('Post deleted successfully')
      
    } catch (error) {
      console.error('Error deleting post:', error)
      toast.error('Failed to delete post')
    }
  }

  // Toggle post publish status
  const togglePublish = async (post: Post) => {
    try {
      const response = await fetch(`/api/posts/${post._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isPublished: !post.isPublished })
      })
      
      if (!response.ok) {
        throw new Error('Failed to update post status')
      }
      
      const { post: updatedPost } = await response.json()
      setPosts(prev => prev.map(p => p._id === updatedPost._id ? updatedPost : p))
      toast.success(`Post ${updatedPost.isPublished ? 'published' : 'unpublished'} successfully`)
      
    } catch (error) {
      console.error('Error toggling publish status:', error)
      toast.error('Failed to update post status')
    }
  }

  // Toggle post pin status
  const togglePin = async (post: Post) => {
    try {
      const response = await fetch(`/api/posts/${post._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isPinned: !post.isPinned })
      })
      
      if (!response.ok) {
        throw new Error('Failed to update pin status')
      }
      
      const { post: updatedPost } = await response.json()
      setPosts(prev => prev.map(p => p._id === updatedPost._id ? updatedPost : p))
      toast.success(`Post ${updatedPost.isPinned ? 'pinned' : 'unpinned'} successfully`)
      
    } catch (error) {
      console.error('Error toggling pin status:', error)
      toast.error('Failed to update pin status')
    }
  }

  // Handle edit post
  const handleEdit = (post: Post) => {
    setEditingPost(post)
    setForm({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      tags: [...post.tags],
      isPublished: post.isPublished,
      isPinned: post.isPinned,
      featuredImage: post.featuredImage || '',
      videoUrl: post.videoUrl || '',
      meta: {
        title: post.meta?.title || '',
        description: post.meta?.description || '',
        keywords: post.meta?.keywords || []
      }
    })
    setMode('edit')
  }

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let result = [...posts]
    
    if (search) {
      const searchLower = search.toLowerCase()
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(searchLower) ||
          (post.content || '').toLowerCase().includes(searchLower) ||
          (post.excerpt || '').toLowerCase().includes(searchLower) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      )
    }
    
    if (selectedTag) {
      result = result.filter((post) => 
        post.tags.some(tag => tag.toLowerCase() === selectedTag.toLowerCase())
      )
    }
    
    // Sort by pinned first, then by date (newest first)
    return result.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1
      if (!a.isPinned && b.isPinned) return 1
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }, [posts, search, selectedTag])
  
  // Get all unique tags from posts
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)))
    return Array.from(tags).sort()
  }, [posts])

  // Initial data fetch
  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button onClick={() => setMode('create')}>
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      {mode === 'list' ? (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select onValueChange={(value) => setSelectedTag(value === 'all' ? null : value)}>
              <SelectTrigger className="w-[180px]">
                <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
                {selectedTag || 'Filter by tag'}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tags</SelectItem>
                {allTags.map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No posts found. Create your first post!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <PostListItem
                  key={post._id}
                  post={post}
                  onEdit={() => handleEdit(post)}
                  onDelete={() => handleDelete(post._id)}
                  onTogglePublish={() => togglePublish(post)}
                  onTogglePin={() => togglePin(post)}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{editingPost ? 'Edit Post' : 'Create New Post'}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setMode('list')
                  setEditingPost(null)
                  setForm(initialFormState)
                }}
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <PostForm
                form={form}
                onFormChange={handleFormChange}
                onTagsChange={(tags) => setForm(prev => ({ ...prev, tags }))}
                onFeaturedImageChange={(url) => setForm(prev => ({ ...prev, featuredImage: url }))}
              />
              <div className="flex justify-end space-x-4 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setMode('list')
                    setEditingPost(null)
                    setForm(initialFormState)
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {editingPost ? 'Updating...' : 'Creating...'}
                    </>
                  ) : editingPost ? (
                    'Update Post'
                  ) : (
                    'Create Post'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
