import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "wouter";
import type { Post } from "@shared/schema";
import BlogCard from "@/components/blog-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
const API_URL = fetch(`${import.meta.env.VITE_API_URL}`);

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: [`${API_URL}/api/posts`],
  });

  // Get all unique tags
  const allTags = Array.from(new Set(posts?.flatMap(post => post.tags) || []));

  // Filter posts by selected category
  const filteredPosts = selectedCategory 
    ? posts?.filter(post => post.tags.includes(selectedCategory)) || []
    : posts || [];

  const tagCounts = allTags.map(tag => ({
    tag,
    count: posts?.filter(post => post.tags.includes(tag)).length || 0
  })).sort((a, b) => b.count - a.count);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center py-12 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Categories
        </h1>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          Explore our articles by topics and technologies. Find exactly what you're looking for.
        </p>
      </div>

      {/* Category Tags */}
      <section className="mb-12">
        <div className="flex flex-wrap gap-3 justify-center">
          <Badge 
            variant={selectedCategory === null ? "default" : "secondary"}
            className="cursor-pointer px-4 py-2 text-sm"
            onClick={() => setSelectedCategory(null)}
          >
            All Posts ({posts?.length || 0})
          </Badge>
          {tagCounts.map(({ tag, count }) => (
            <Badge 
              key={tag}
              variant={selectedCategory === tag ? "default" : "secondary"}
              className="cursor-pointer px-4 py-2 text-sm"
              onClick={() => setSelectedCategory(tag)}
            >
              {tag} ({count})
            </Badge>
          ))}
        </div>
      </section>

      {/* Selected Category Title */}
      {selectedCategory && (
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center">
            Posts in "{selectedCategory}"
          </h2>
        </section>
      )}

      {/* Posts Grid */}
      <section>
        {isLoading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <Skeleton className="w-full h-48" />
                <div className="p-6">
                  <div className="flex gap-2 mb-3">
                    <Skeleton className="w-16 h-6 rounded" />
                    <Skeleton className="w-20 h-6 rounded" />
                  </div>
                  <Skeleton className="w-full h-6 mb-2" />
                  <Skeleton className="w-full h-4 mb-2" />
                  <Skeleton className="w-3/4 h-4 mb-4" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              No posts found in "{selectedCategory}"
            </h3>
            <p className="text-slate-600 mb-4">
              Try selecting a different category or view all posts.
            </p>
            <Badge 
              variant="default"
              className="cursor-pointer px-4 py-2"
              onClick={() => setSelectedCategory(null)}
            >
              View All Posts
            </Badge>
          </div>
        )}
      </section>
    </main>
  );
}
