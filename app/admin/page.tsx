export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Welcome to the Admin Panel</h2>
            <p className="text-gray-600">
              This is a simple admin dashboard. Authentication will be added later.
            </p>
          </div>
          <div className="p-4 border rounded-lg bg-blue-50">
            <h3 className="font-medium text-blue-800">Quick Actions</h3>
            <div className="mt-2 space-x-4">
              <a 
                href="/admin/login"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Go to Login
              </a>
              <a 
                href="/admin/dashboard"
                className="inline-block px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
              >
                View Dashboard
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
