import { Link, useLocation } from "wouter";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                <span className="text-slate-500 hover:text-primary transition-colors duration-200 font-medium cursor-pointer">Categories</span>
                <span className="text-slate-500 hover:text-primary transition-colors duration-200 font-medium cursor-pointer">About</span>
                <span className="text-slate-500 hover:text-primary transition-colors duration-200 font-medium cursor-pointer">Contact</span>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block">
                <Input
                  type="text"
                  placeholder="Search posts..."
                  className="pl-10 pr-4 py-2 w-64"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
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
              <span className="block px-3 py-2 text-slate-500 hover:text-primary transition-colors duration-200 font-medium cursor-pointer">Categories</span>
              <span className="block px-3 py-2 text-slate-500 hover:text-primary transition-colors duration-200 font-medium cursor-pointer">About</span>
              <span className="block px-3 py-2 text-slate-500 hover:text-primary transition-colors duration-200 font-medium cursor-pointer">Contact</span>
              <div className="px-3 py-2">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search posts..."
                    className="pl-10 pr-4 py-2 w-full"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
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
