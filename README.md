# ModernBlog - Professional Blog Platform

A complete full-stack blog website built with React, Express.js, PostgreSQL, and modern responsive design featuring markdown support.

## 🚀 Features

- **Frontend**: React with Vite, TailwindCSS, responsive design
- **Backend**: Express.js REST API with PostgreSQL
- **Database**: PostgreSQL with posts table (id, title, content, tags, created_at)
- **Markdown Support**: Custom markdown renderer for blog content
- **SEO Optimized**: Meta tags, Open Graph, and Twitter cards
- **Modern UI**: Clean typography, smooth animations, loading states
- **Search & Filter**: Filter posts by categories and search functionality

## 📁 Project Structure

```
ModernBlog/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities and API client
│   │   └── hooks/         # Custom React hooks
│   └── index.html
├── server/                # Express backend
│   ├── db.ts              # Database connection
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Data access layer
│   └── index.ts           # Server entry point
├── shared/                # Shared types and schemas
│   └── schema.ts          # Database schema and types
├── package.json           # Dependencies and scripts
├── drizzle.config.ts      # Database configuration
└── README.md
```

## 🛠️ Local Setup Guide (Windows with VS Code)

### Prerequisites

1. **Install Node.js (v18 or later)**
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version` and `npm --version`

2. **Install PostgreSQL**
   - Download from [postgresql.org](https://www.postgresql.org/download/windows/)
   - During installation, remember your password for the `postgres` user
   - Add PostgreSQL to your PATH

3. **Install VS Code**
   - Download from [code.visualstudio.com](https://code.visualstudio.com/)
   - Install recommended extensions: ES7+ React/Redux/React-Native snippets, Prettier, ESLint

### Database Setup

#### Option 1: Local PostgreSQL
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE modernblog;

# Create user (optional)
CREATE USER bloguser WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE modernblog TO bloguser;

# Exit psql
\q
```

#### Option 2: Render.com Database
1. Go to [render.com](https://render.com) and create an account
2. Create a new PostgreSQL database
3. Copy the connection string (External Database URL)

### Project Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd ModernBlog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   Create a `.env` file in the root directory:
   ```env
   # Local PostgreSQL
   DATABASE_URL=postgresql://postgres:your_password@localhost:5432/modernblog
   
   # OR Render.com database
   DATABASE_URL=your_render_database_url
   
   NODE_ENV=development
   PORT=5000
   ```

4. **Initialize database**
   ```bash
   npm run db:push
   ```

5. **Add sample data (optional)**
   ```bash
   # Connect to your database and run the sample-posts.sql file
   psql -d modernblog -f sample-posts.sql
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

7. **Open in browser**
   - Navigate to `http://localhost:5000`

## 🚀 Deployment Guide

### Frontend Deployment (Netlify)

1. **Build the frontend**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com) and create account
   - Drag and drop the `dist/public` folder to Netlify
   - Or connect your GitHub repository for automatic deployments

3. **Configure build settings**
   - Build command: `npm run build`
   - Publish directory: `dist/public`

### Backend Deployment (Render)

1. **Create Render account**
   - Go to [render.com](https://render.com)

2. **Create new Web Service**
   - Connect your GitHub repository
   - Choose "Node" environment

3. **Configure build settings**
   - Build command: `npm run build`
   - Start command: `npm start`

4. **Environment variables**
   Add these in Render dashboard:
   ```
   DATABASE_URL=your_postgresql_connection_string
   NODE_ENV=production
   ```

5. **Deploy**
   - Render will automatically build and deploy your app

## 📤 Export from Replit

### Method 1: Download as ZIP
1. In Replit, click the three dots menu (⋯) in the file explorer
2. Select "Download as zip"
3. Extract the ZIP file on your local machine

### Method 2: GitHub Export
1. In Replit, go to the "Version control" tab
2. Click "Create a Git repository"
3. Connect to GitHub and push your code
4. Clone the repository locally:
   ```bash
   git clone https://github.com/yourusername/your-repo.git
   ```

### Method 3: Manual File Copy
1. Create a new folder on your local machine
2. Copy each file from Replit to your local folder
3. Recreate the folder structure as shown above

## 📝 Daily Blog Posting (Admin Guide)

### Using curl (Command Line)
```bash
# Create a new blog post
curl -X POST http://localhost:5000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Your Blog Post Title",
    "content": "# Your Blog Content\n\nWrite your blog content here using **markdown** syntax.\n\n## Subheading\n\n- List item 1\n- List item 2\n\n```javascript\nconsole.log(\"Code example\");\n```",
    "tags": ["JavaScript", "Tutorial", "Web Development"]
  }'
```

### Using Postman
1. **Install Postman** from [postman.com](https://postman.com)

2. **Create new request**
   - Method: POST
   - URL: `http://localhost:5000/api/posts`
   - Headers: `Content-Type: application/json`

3. **Request body (JSON)**
   ```json
   {
     "title": "Your Blog Post Title",
     "content": "# Your Blog Content\n\nWrite your content here using **markdown**.\n\n## Features\n\n- Feature 1\n- Feature 2\n\n```javascript\nconst example = 'code block';\n```",
     "tags": ["React", "JavaScript", "Tutorial"]
   }
   ```

4. **Send request** and verify the response

### Sample Blog Post Template
```json
{
  "title": "Getting Started with Modern Web Development",
  "content": "# Getting Started with Modern Web Development\n\nWeb development has evolved significantly in recent years. In this post, we'll explore the latest trends and best practices.\n\n## Key Technologies\n\n- **React**: For building user interfaces\n- **Node.js**: For backend development\n- **PostgreSQL**: For data persistence\n\n## Code Example\n\n```javascript\nconst app = express();\napp.get('/api/posts', (req, res) => {\n  res.json({ message: 'Hello World!' });\n});\n```\n\n## Conclusion\n\nModern web development offers powerful tools for building amazing applications.",
  "tags": ["Web Development", "React", "Node.js", "Tutorial"]
}
```

## 📚 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm start           # Start production server

# Database
npm run db:push     # Push schema changes to database
npm run db:studio   # Open database studio (if available)

# Testing
npm test            # Run tests (when implemented)
```

## 🔧 API Endpoints

- `GET /api/posts` - Get all blog posts
- `GET /api/posts/:id` - Get single post by ID
- `POST /api/posts` - Create new blog post
- `PUT /api/posts/:id` - Update existing post
- `DELETE /api/posts/:id` - Delete post

## 🎨 Customization

### Styling
- Edit `client/src/index.css` for global styles
- Modify TailwindCSS classes in components
- Update color scheme in CSS variables

### Content
- Add new pages in `client/src/pages/`
- Create new components in `client/src/components/`
- Extend API routes in `server/routes.ts`

## 📞 Support

For issues or questions:
1. Check the console for error messages
2. Verify database connection
3. Ensure all environment variables are set
4. Check that ports are available (5000 for backend)

## 📄 License

This project is open source and available under the MIT License.

