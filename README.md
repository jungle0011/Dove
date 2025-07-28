# Dove Spiritual Website - Admin Panel & Public Forum System

A comprehensive spiritual community platform featuring an admin panel for content management and a public forum for community engagement.

## 🌟 Features

### 🔐 Admin Panel (`/admin`)
- **Secure Authentication**: Login/logout with session management
- **Dashboard**: Overview of posts, comments, and site statistics
- **Content Management**: Create, edit, delete, and pin teachings/articles
- **User Management**: Moderate comments and manage user interactions
- **Real-time Updates**: Live preview of changes

### 🌐 Public Forum (`/forum`)
- **Advanced Search & Filtering**: Live search, tag filtering, favorites toggle
- **Featured Content**: Pinned posts stay at top with special styling
- **Social Sharing**: WhatsApp, Twitter, Facebook, copy link buttons
- **User Engagement**: Comments system with moderation
- **Mobile Responsive**: Touch-friendly interface with smooth animations

## 🛠 Technical Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API routes, MongoDB with Mongoose
- **Authentication**: Session-based admin authentication with JWT
- **Database**: MongoDB Atlas for data persistence
- **Styling**: Custom Islamic-themed design with deep blue/gold color scheme
- **Rich Text Editor**: React Quill for content creation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- MongoDB database (local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dove-spiritual-website
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/dove-spiritual
   JWT_SECRET=your-super-secret-jwt-key-here
   ```

4. **Setup Database**
   ```bash
   # Run the admin setup script
   node scripts/setup-admin.js
   ```

5. **Start Development Server**
   ```bash
   pnpm dev
   ```

6. **Access the Application**
   - Main Site: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin
   - Public Forum: http://localhost:3000/forum

## 🔑 Default Admin Credentials

After running the setup script, you can login with:
- **Email**: admin@dove-spiritual.com
- **Password**: admin123

⚠️ **Important**: Change the default password after first login!

## 📁 Project Structure

```
dove-spiritual-website/
├── app/
│   ├── admin/                 # Admin panel pages
│   │   ├── login/            # Admin authentication
│   │   ├── posts/            # Post management
│   │   └── layout.tsx        # Admin layout
│   ├── forum/                # Public forum pages
│   │   ├── [id]/             # Individual post view
│   │   └── layout.tsx        # Forum layout
│   └── api/                  # API routes
│       ├── auth/             # Authentication endpoints
│       ├── posts/            # Post CRUD operations
│       └── admin/            # Admin-specific endpoints
├── components/               # Reusable UI components
├── lib/                      # Database and utility functions
│   ├── models/               # MongoDB models
│   ├── auth.ts               # Authentication utilities
│   └── db.ts                 # Database connection
├── scripts/                  # Setup and utility scripts
└── public/                   # Static assets
```

## 🎨 Key Features

### Content Creation
- Rich text editor for teachings with image uploads
- Categorization with tags and types
- Draft/publish workflow
- Pin important content to top

### User Interaction
- Comments system with name/email or anonymous posting
- Like/favorite posts with localStorage persistence
- Social sharing capabilities
- Mobile-responsive design

### Admin Capabilities
- Create and manage forum/articles
- Pin important content to top
- Moderate user comments
- Delete inappropriate content
- View site analytics and engagement metrics
- Manage content categories and tags

### User Experience
- Sticky filter bar for search and filtering
- Modal views for detailed content
- Smooth animations with Framer Motion
- Progressive loading for performance
- Cross-platform responsive design

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/verify` - Verify authentication

### Posts
- `GET /api/posts` - Get posts with filtering
- `POST /api/posts` - Create new post (admin only)
- `GET /api/posts/[id]` - Get single post
- `PUT /api/posts/[id]` - Update post (admin only)
- `DELETE /api/posts/[id]` - Delete post (admin only)

### Comments
- `GET /api/posts/[id]/comments` - Get post comments
- `POST /api/posts/[id]/comments` - Add comment

### Admin
- `GET /api/admin/stats` - Get dashboard statistics

## 🎯 Usage Examples

### Creating a New Post
1. Navigate to `/admin`
2. Login with admin credentials
3. Click "Create Post" or go to `/admin/posts/new`
4. Fill in title, content, category, and tags
5. Set publish status and pin if needed
6. Click "Create Post"

### Managing Comments
1. Go to `/admin/posts`
2. View posts and their comment counts
3. Click on individual posts to moderate comments
4. Approve or delete comments as needed

### Forum Navigation
1. Visit `/forum` to see all posts
2. Use search bar to find specific content
3. Filter by category or tags
4. Like and favorite posts
5. Share posts on social media
6. Add comments to engage with the community

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- Set `MONGODB_URI` and `JWT_SECRET` environment variables
- Build with `pnpm build`
- Start with `pnpm start`

## 🔒 Security Considerations

- JWT tokens are HTTP-only cookies
- Password hashing with bcrypt
- Input validation and sanitization
- CORS protection
- Rate limiting (recommended for production)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments

## 🔄 Updates

Stay updated with the latest features and security patches by regularly pulling from the main branch.

---

**Built with ❤️ for spiritual communities** 