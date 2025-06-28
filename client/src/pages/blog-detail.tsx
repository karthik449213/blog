import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { useEffect } from "react";
import type { Post } from "@shared/schema";
import MarkdownRenderer from "@/components/markdown-renderer";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Calendar, Clock, Heart, Bookmark, Share2 } from "lucide-react";
import { formatDistance } from "date-fns";

export default function BlogDetail() {
  const { id } = useParams();
  
  const { data: post, isLoading, error } = useQuery<Post>({
    queryKey: [`/api/posts/${id}`],
    enabled: !!id,
  });

  const { data: allPosts } = useQuery<Post[]>({
    queryKey: ["/api/posts"],
  });

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Post not found</h2>
          <p className="text-slate-600 mb-4">The post you're looking for doesn't exist.</p>
          <Link href="/">
            <Button>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = allPosts?.filter(p => 
    p.id !== post?.id && 
    p.tags.some(tag => post?.tags.includes(tag))
  ).slice(0, 2) || [];

  const readingTime = Math.ceil((post?.content.length || 0) / 200);

  // Update page title for SEO
  useEffect(() => {
    if (post) {
      document.title = `${post.title} | ModernBlog`;
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        const excerpt = post.content.substring(0, 150).replace(/[#*`]/g, '');
        metaDescription.setAttribute('content', excerpt + '...');
      }
    }
    
    return () => {
      document.title = 'ModernBlog - Professional Blog Platform';
    };
  }, [post]);

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link href="/">
          <Button variant="ghost" className="p-0 h-auto font-medium text-slate-600 hover:text-primary">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Home
          </Button>
        </Link>
      </nav>

      {isLoading ? (
        <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-8 pt-8 pb-6">
            <div className="flex gap-2 mb-4">
              <Skeleton className="w-16 h-6 rounded-full" />
              <Skeleton className="w-20 h-6 rounded-full" />
            </div>
            <Skeleton className="w-full h-12 mb-6" />
            <div className="flex items-center justify-between border-b border-gray-100 pb-6">
              <div className="flex items-center space-x-4">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div>
                  <Skeleton className="w-24 h-4 mb-1" />
                  <Skeleton className="w-32 h-3" />
                </div>
              </div>
              <div className="text-right">
                <Skeleton className="w-20 h-4 mb-1" />
                <Skeleton className="w-16 h-3" />
              </div>
            </div>
          </div>
          <div className="px-8">
            <Skeleton className="w-full h-64 md:h-80 rounded-lg mb-8" />
          </div>
          <div className="px-8 pb-8 space-y-4">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-3/4 h-4" />
          </div>
        </article>
      ) : post ? (
        <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Article Header */}
          <div className="px-8 pt-8 pb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-between border-b border-gray-100 pb-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {post.title.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">ModernBlog Author</p>
                  <p className="text-sm text-slate-500">Content Creator</p>
                </div>
              </div>
              <div className="text-right text-sm text-slate-500">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDistance(new Date(post.createdAt), new Date(), { addSuffix: true })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{readingTime} min read</span>
                </div>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="px-8 pb-8">
            <div className="prose prose-lg max-w-none">
              <MarkdownRenderer content={post.content} />
            </div>

            {/* Article Actions */}
            <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-100">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                  <Heart className="w-4 h-4 mr-2" />
                  Like
                </Button>
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </article>
      ) : null}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Related Articles</h3>
          <div className="grid gap-6 md:grid-cols-2">
            {relatedPosts.map((relatedPost) => (
              <Link key={relatedPost.id} href={`/post/${relatedPost.id}`}>
                <article className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {relatedPost.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h4 className="font-semibold text-slate-900 mb-2 hover:text-primary transition-colors duration-200 line-clamp-2">
                      {relatedPost.title}
                    </h4>
                    <p className="text-sm text-slate-600 mb-2 line-clamp-3">
                      {relatedPost.content.substring(0, 120)}...
                    </p>
                    <p className="text-xs text-slate-500">
                      {formatDistance(new Date(relatedPost.createdAt), new Date(), { addSuffix: true })} • {Math.ceil(relatedPost.content.length / 200)} min read
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
