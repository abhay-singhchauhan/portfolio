
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, ChevronRight } from 'lucide-react';

// Mock data for blog posts
const BLOG_POSTS = [
  {
    id: 1,
    title: "Building Scalable Node.js Applications",
    excerpt: "Learn the best practices for building Node.js applications that can scale to handle millions of users.",
    date: "April 10, 2024",
    readTime: "8 min read",
    author: "Abhay Singh Chauhan",
    tags: ["Node.js", "Scaling", "Backend"],
    imageSrc: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Database Design Patterns for Backend Developers",
    excerpt: "Explore common database design patterns that can improve performance and maintainability in your applications.",
    date: "March 22, 2024",
    readTime: "6 min read",
    author: "Abhay Singh Chauhan",
    tags: ["Database", "MySQL", "PostgreSQL"],
    imageSrc: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Authentication Best Practices in Node.js",
    excerpt: "Learn how to implement secure authentication in your Node.js applications using JWT, OAuth, and more.",
    date: "February 15, 2024",
    readTime: "10 min read",
    author: "Abhay Singh Chauhan",
    tags: ["Security", "Authentication", "JWT"],
    imageSrc: "/placeholder.svg"
  },
  {
    id: 4,
    title: "RESTful API Design Guidelines",
    excerpt: "A comprehensive guide to designing clean, consistent, and user-friendly RESTful APIs.",
    date: "January 30, 2024",
    readTime: "7 min read",
    author: "Abhay Singh Chauhan",
    tags: ["API", "REST", "Backend"],
    imageSrc: "/placeholder.svg"
  },
];

const Blog = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  // Get all unique tags from blog posts
  const allTags = Array.from(
    new Set(BLOG_POSTS.flatMap(post => post.tags))
  );
  
  // Filter posts by selected tag
  const filteredPosts = selectedTag 
    ? BLOG_POSTS.filter(post => post.tags.includes(selectedTag))
    : BLOG_POSTS;
  
  return (
    <div>
      {/* Blog Header */}
      <section className="section-padding pt-24">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Blog</h1>
            <p className="text-lg text-gray-600 animate-fade-in animate-delay-100">
              Insights and tutorials on backend development, databases, and more.
            </p>
          </div>
          
          {/* Tag Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in animate-delay-200">
            <button 
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedTag === null ? 'bg-portfolio-primary text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedTag(null)}
            >
              All
            </button>
            
            {allTags.map((tag, index) => (
              <button 
                key={index}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedTag === tag ? 'bg-portfolio-primary text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
          
          {/* Blog Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {filteredPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
          
          {/* Login CTA */}
          <div className="max-w-3xl mx-auto p-8 rounded-xl bg-gray-50 text-center animate-fade-in">
            <h3 className="text-2xl font-bold mb-4">Want to join the conversation?</h3>
            <p className="text-gray-600 mb-6">
              Sign in to leave comments and engage with the community.
            </p>
            <div className="flex justify-center gap-4">
              <button className="btn-primary">Sign In</button>
              <button className="btn-outline">Create Account</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

interface BlogPostCardProps {
  post: {
    id: number;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    author: string;
    tags: string[];
    imageSrc: string;
  };
}

const BlogPostCard = ({ post }: BlogPostCardProps) => {
  return (
    <div className="card h-full flex flex-col animate-fade-in">
      <div className="h-56 overflow-hidden">
        <img 
          src={post.imageSrc} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      
      <div className="p-6 flex-grow">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <span 
              key={index} 
              className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <Link to={`/blog/${post.id}`}>
          <h3 className="text-xl font-bold mb-3 hover:text-portfolio-primary transition-colors">{post.title}</h3>
        </Link>
        
        <p className="text-gray-600 mb-6">{post.excerpt}</p>
        
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            {post.author}
          </div>
          
          <div className="flex items-center gap-3">
            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {post.date}
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {post.readTime}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-6 pt-0 border-t border-gray-100 mt-auto">
        <Link 
          to={`/blog/${post.id}`} 
          className="inline-flex items-center text-portfolio-primary hover:text-portfolio-primary/80 transition-colors"
        >
          Read More
          <ChevronRight className="ml-1 w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default Blog;
