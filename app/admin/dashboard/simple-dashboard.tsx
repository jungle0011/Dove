'use client';

export default function SimpleDashboard() {
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
