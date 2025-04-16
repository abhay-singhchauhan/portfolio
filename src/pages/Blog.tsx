
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ChevronRight, Settings } from 'lucide-react';
import { BLOG_POSTS } from '@/data/blogData';
import { useAppSelector } from '@/hooks/use-redux';
import { Button } from '@/components/ui/button';

const Blog = () => {
  const { isAuthenticated, user } = useAppSelector(state => state.auth);
  const isAdmin = isAuthenticated && user?.isAdmin;

  return (
    <div className="section-padding pt-24">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">Blog</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Insights, tutorials, and tech thoughts
            </p>
          </div>
          
          {isAdmin && (
            <Link to="/admin/blog">
              <Button variant="outline" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Manage Blog
              </Button>
            </Link>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <div 
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <img 
                src={post.imageSrc} 
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.slice(0, 3).map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-xl font-bold mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <Link to={`/blog/${post.id}`}>
                    {post.title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {post.date}
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                
                <Link 
                  to={`/blog/${post.id}`}
                  className="flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  Read More
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
