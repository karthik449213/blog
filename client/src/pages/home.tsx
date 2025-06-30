import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { Post } from "@shared/schema";
import BlogCard from "@/components/blog-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
const API_URL = fetch(`${import.meta.env.VITE_API_URL}`);

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: posts, isLoading, error } = useQuery<Post[]>({
    queryKey: [`${API_URL}/api/posts`],
  });

  const filteredPosts = posts?.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           post.tags.some(tag => tag.toLowerCase() === selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  }) || [];

  const featuredPost = filteredPosts[0];
  const otherPosts = filteredPosts.slice(1);

  const allTags = Array.from(new Set(posts?.flatMap(post => post.tags) || []));

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Failed to load posts</h2>
          <p className="text-slate-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="text-center py-12 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Welcome to ModernBlog
        </h1>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          Discover insightful articles, tutorials, and stories from our community of writers and developers.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {allTags.slice(0, 5).map((tag) => (
            <span key={tag} className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Featured Post */}
      {isLoading ? (
        <section className="mb-12">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <Skeleton className="w-full h-64 md:h-80" />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center space-x-2 mb-4">
                  <Skeleton className="w-16 h-6 rounded-full" />
                  <Skeleton className="w-20 h-6 rounded-full" />
                </div>
                <Skeleton className="w-full h-8 mb-3" />
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-3/4 h-4 mb-4" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div>
                      <Skeleton className="w-20 h-4 mb-1" />
                      <Skeleton className="w-16 h-3" />
                    </div>
                  </div>
                  <Skeleton className="w-20 h-6" />
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : featuredPost ? (
        <section className="mb-12">
          <BlogCard post={featuredPost} featured />
        </section>
      ) : null}

      {/* Search and Filter */}
      <section className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <h2 className="text-3xl font-bold text-slate-900">Latest Posts</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {allTags.map((tag) => (
                  <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
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
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Skeleton className="w-8 h-8 rounded-full" />
                      <div>
                        <Skeleton className="w-20 h-4 mb-1" />
                        <Skeleton className="w-16 h-3" />
                      </div>
                    </div>
                    <Skeleton className="w-16 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : otherPosts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {otherPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No posts found</h3>
            <p className="text-slate-600">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </section>
    </main>
  );
}
