import { Mail, MapPin, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, just show an alert
    alert("Thank you for your message! We'll get back to you soon.");
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center py-12 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Contact Us
        </h1>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          Have a question, suggestion, or want to contribute? We'd love to hear from you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center mb-6">
            <MessageSquare className="w-6 h-6 text-primary mr-3" />
            <h2 className="text-2xl font-bold text-slate-900">Send us a Message</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                Your Name
              </label>
              <Input 
                id="name" 
                type="text" 
                placeholder="Enter your full name"
                required 
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter your email"
                required 
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                Subject
              </label>
              <Input 
                id="subject" 
                type="text" 
                placeholder="What's this about?"
                required 
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                Message
              </label>
              <Textarea 
                id="message"
                placeholder="Tell us more about your inquiry..."
                rows={6}
                required 
              />
            </div>
            
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </section>

        {/* Contact Information */}
        <section className="space-y-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Get in Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-primary mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-900">Email</h3>
                  <p className="text-slate-600">hello@modernblog.dev</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-primary mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-900">Phone</h3>
                  <p className="text-slate-600">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-primary mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-900">Address</h3>
                  <p className="text-slate-600">
                    123 Tech Street<br />
                    San Francisco, CA 94105<br />
                    United States
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Frequently Asked</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-slate-900 text-sm">How can I contribute articles?</h4>
                <p className="text-slate-600 text-sm">Send us your article proposal via email with an outline and your background.</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 text-sm">Do you accept guest posts?</h4>
                <p className="text-slate-600 text-sm">Yes! We welcome quality technical content from experienced developers.</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 text-sm">How often do you publish new content?</h4>
                <p className="text-slate-600 text-sm">We publish new articles weekly, covering the latest trends and best practices.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}