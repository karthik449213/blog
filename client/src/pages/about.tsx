import { Users, Target, Heart, Code } from "lucide-react";

export default function About() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center py-12 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          About ModernBlog
        </h1>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          A modern platform for developers, designers, and tech enthusiasts to share knowledge and learn from the community.
        </p>
      </div>

      {/* Mission */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-12">
        <div className="flex items-center mb-6">
          <Target className="w-8 h-8 text-primary mr-3" />
          <h2 className="text-3xl font-bold text-slate-900">Our Mission</h2>
        </div>
        <p className="text-slate-700 leading-relaxed text-lg">
          We believe in the power of shared knowledge. ModernBlog was created to provide a platform where developers, designers, 
          and technology enthusiasts can share their experiences, learn from each other, and contribute to the growth of the tech community.
        </p>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center mb-4">
            <Code className="w-6 h-6 text-primary mr-3" />
            <h3 className="text-xl font-semibold text-slate-900">Technical Excellence</h3>
          </div>
          <p className="text-slate-600">
            Built with modern technologies including React, TypeScript, and PostgreSQL for optimal performance and reliability.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center mb-4">
            <Users className="w-6 h-6 text-primary mr-3" />
            <h3 className="text-xl font-semibold text-slate-900">Community Driven</h3>
          </div>
          <p className="text-slate-600">
            Our content comes from experienced developers and industry professionals sharing real-world insights and best practices.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center mb-6">
          <Heart className="w-8 h-8 text-primary mr-3" />
          <h2 className="text-3xl font-bold text-slate-900">Our Values</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-slate-900 mb-2">Quality Content</h4>
            <p className="text-slate-600 text-sm">
              We prioritize well-researched, practical articles that provide real value to our readers.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-2">Open Learning</h4>
            <p className="text-slate-600 text-sm">
              Knowledge should be accessible to everyone, regardless of their background or experience level.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-2">Continuous Growth</h4>
            <p className="text-slate-600 text-sm">
              Technology evolves rapidly, and we're committed to staying current with the latest trends and best practices.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}