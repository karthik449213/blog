import { Link } from "wouter";
import type { Post } from "@shared/schema";
import { Calendar, Clock } from "lucide-react";
import { formatDistance } from "date-fns";

interface BlogCardProps {
  post: Post;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const readingTime = Math.ceil(post.content.length / 200);
  const excerpt = post.content.length > 150 ? post.content.substring(0, 150) + "..." : post.content;

  if (featured) {
    return (
      <Link href={`/post/${post.id}`}>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer">
          <div className="md:flex">
            <div className="md:w-1/2">
              <div className="w-full h-64 md:h-full bg-gradient-to-br from-primary/20 to-blue-600/20 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-primary mb-2">Featured Post</h3>
                  <p className="text-slate-600">Click to read more</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 p-8">
              <div className="flex items-center space-x-2 mb-4">
                <span className="px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full">Featured</span>
                {post.tags.slice(0, 1).map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3 hover:text-primary transition-colors duration-200">
                {post.title}
              </h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                {excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {post.title.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">ModernBlog Author</p>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDistance(new Date(post.createdAt), new Date(), { addSuffix: true })}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-primary font-medium">
                  <span>Read More</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/post/${post.id}`}>
      <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer">
        <div className="w-full h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-2">
              {post.title.charAt(0).toUpperCase()}
            </div>
            <p className="text-slate-600 text-sm">Click to read</p>
          </div>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2 hover:text-primary transition-colors duration-200 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-slate-600 text-sm mb-4 line-clamp-3">
            {excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {post.title.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">ModernBlog Author</p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDistance(new Date(post.createdAt), new Date(), { addSuffix: true })}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Clock className="w-3 h-3" />
              <span>{readingTime} min read</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
