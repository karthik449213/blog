import { Link, useLocation } from "wouter";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Post } from "@shared/schema";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const { data: posts } = useQuery<Post[]>({
    queryKey: ["/api/posts"],
  });

  // Filter posts based on search query
  const searchResults = posts?.filter(post => 
    searchQuery.length > 0 && (
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  ).slice(0, 5) || [];

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchInput = (value: string) => {
    setSearchQuery(value);
    setShowSearchResults(value.length > 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex-shrink-0">
                <Link href="/">
                  <h1 className="text-2xl font-bold text-primary cursor-pointer">ModernBlog</h1>
                </Link>
              </div>
              <nav className="hidden md:flex space-x-8">
                <Link href="/">
                  <span className={`transition-colors duration-200 font-medium cursor-pointer ${
                    location === "/" ? "text-primary" : "text-slate-700 hover:text-primary"
                  }`}>
                    Home
                  </span>
                </Link>
                <Link href="/categories">
                  <span className={`transition-colors duration-200 font-medium cursor-pointer ${
                    location === "/categories" ? "text-primary" : "text-slate-700 hover:text-primary"
                  }`}>
                    Categories
                  </span>
                </Link>
                <Link href="/about">
                  <span className={`transition-colors duration-200 font-medium cursor-pointer ${
                    location === "/about" ? "text-primary" : "text-slate-700 hover:text-primary"
                  }`}>
                    About
                  </span>
                </Link>
                <Link href="/contact">
                  <span className={`transition-colors duration-200 font-medium cursor-pointer ${
                    location === "/contact" ? "text-primary" : "text-slate-700 hover:text-primary"
                  }`}>
                    Contact
                  </span>
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block" ref={searchRef}>
                <Input
                  type="text"
                  placeholder="Search posts..."
                  className="pl-10 pr-4 py-2 w-64"
                  value={searchQuery}
                  onChange={(e) => handleSearchInput(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                
                {/* Search Results Dropdown */}
                {showSearchResults && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    {searchResults.map((post) => (
                      <Link key={post.id} href={`/post/${post.id}`}>
                        <div 
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                          onClick={() => {
                            setShowSearchResults(false);
                            setSearchQuery("");
                          }}
                        >
                          <h4 className="font-medium text-slate-900 text-sm line-clamp-1">{post.title}</h4>
                          <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                            {post.content.substring(0, 100)}...
                          </p>
                          <div className="flex gap-1 mt-2">
                            {post.tags.slice(0, 2).map((tag) => (
                              <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
                
                {showSearchResults && searchQuery.length > 0 && searchResults.length === 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="px-4 py-3 text-center text-slate-500 text-sm">
                      No posts found for "{searchQuery}"
                    </div>
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white">
            <div className="px-4 py-2 space-y-1">
              <Link href="/">
                <span className="block px-3 py-2 text-slate-700 hover:text-primary transition-colors duration-200 font-medium cursor-pointer">
                  Home
                </span>
              </Link>
              <Link href="/categories">
                <span className="block px-3 py-2 text-slate-700 hover:text-primary transition-colors duration-200 font-medium cursor-pointer">
                  Categories
                </span>
              </Link>
              <Link href="/about">
                <span className="block px-3 py-2 text-slate-700 hover:text-primary transition-colors duration-200 font-medium cursor-pointer">
                  About
                </span>
              </Link>
              <Link href="/contact">
                <span className="block px-3 py-2 text-slate-700 hover:text-primary transition-colors duration-200 font-medium cursor-pointer">
                  Contact
                </span>
              </Link>
              <div className="px-3 py-2">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search posts..."
                    className="pl-10 pr-4 py-2 w-full"
                    value={searchQuery}
                    onChange={(e) => handleSearchInput(e.target.value)}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  
                  {/* Mobile Search Results */}
                  {showSearchResults && searchResults.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                      {searchResults.map((post) => (
                        <Link key={post.id} href={`/post/${post.id}`}>
                          <div 
                            className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                            onClick={() => {
                              setShowSearchResults(false);
                              setSearchQuery("");
                              setMobileMenuOpen(false);
                            }}
                          >
                            <h4 className="font-medium text-slate-900 text-sm line-clamp-1">{post.title}</h4>
                            <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                              {post.content.substring(0, 100)}...
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      {children}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold text-primary mb-4">ModernBlog</h3>
              <p className="text-slate-600 mb-6 max-w-md">
                A modern blog platform for developers, designers, and tech enthusiasts. Share your knowledge and learn from the community.
              </p>
              <div className="flex space-x-4">
                <span className="text-slate-400 hover:text-primary transition-colors duration-200 cursor-pointer">
                  <i className="fab fa-twitter text-xl"></i>
                </span>
                <span className="text-slate-400 hover:text-primary transition-colors duration-200 cursor-pointer">
                  <i className="fab fa-github text-xl"></i>
                </span>
                <span className="text-slate-400 hover:text-primary transition-colors duration-200 cursor-pointer">
                  <i className="fab fa-linkedin text-xl"></i>
                </span>
                <span className="text-slate-400 hover:text-primary transition-colors duration-200 cursor-pointer">
                  <i className="fab fa-youtube text-xl"></i>
                </span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Categories</h4>
              <ul className="space-y-2 text-slate-600">
                <li><span className="hover:text-primary transition-colors duration-200 cursor-pointer">JavaScript</span></li>
                <li><span className="hover:text-primary transition-colors duration-200 cursor-pointer">React</span></li>
                <li><span className="hover:text-primary transition-colors duration-200 cursor-pointer">Node.js</span></li>
                <li><span className="hover:text-primary transition-colors duration-200 cursor-pointer">CSS</span></li>
                <li><span className="hover:text-primary transition-colors duration-200 cursor-pointer">Design</span></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Company</h4>
              <ul className="space-y-2 text-slate-600">
                <li><span className="hover:text-primary transition-colors duration-200 cursor-pointer">About</span></li>
                <li><span className="hover:text-primary transition-colors duration-200 cursor-pointer">Contact</span></li>
                <li><span className="hover:text-primary transition-colors duration-200 cursor-pointer">Privacy Policy</span></li>
                <li><span className="hover:text-primary transition-colors duration-200 cursor-pointer">Terms of Service</span></li>
                <li><span className="hover:text-primary transition-colors duration-200 cursor-pointer">Newsletter</span></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-slate-500 text-sm">
                © 2024 ModernBlog. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <span className="text-slate-500 hover:text-primary text-sm transition-colors duration-200 cursor-pointer">
                  RSS Feed
                </span>
                <span className="text-slate-500 hover:text-primary text-sm transition-colors duration-200 cursor-pointer">
                  Newsletter
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
