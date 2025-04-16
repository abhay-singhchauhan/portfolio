
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, MessageSquare, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppSelector, useAppDispatch } from '@/hooks/use-redux';
import { fetchBlogsStart, fetchBlogsSuccess, fetchBlogsFailure } from '@/store/blogSlice';
import { BLOG_POSTS } from '@/data/blogData';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector(state => state.auth);
  const { posts, isLoading, error } = useAppSelector(state => state.blog);
  const isAdmin = isAuthenticated && user?.isAdmin;

  useEffect(() => {
    if (posts.length === 0 && !isLoading) {
      dispatch(fetchBlogsStart());
      try {
        dispatch(fetchBlogsSuccess(BLOG_POSTS));
      } catch (error) {
        dispatch(fetchBlogsFailure('Failed to load blog posts'));
      }
    }
  }, [dispatch, posts.length, isLoading]);
  
  const post = posts.find(post => post.id === id);
  
  if (isLoading) {
    return (
      <div className="section-padding pt-24 text-center">
        <div className="container mx-auto">
          <p>Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="section-padding pt-24 text-center">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
          <Link to="/blog" className="btn-primary">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    navigate(`/admin/blog`, { state: { editPostId: post.id } });
  };
  
  return (
    <div>
      {/* Blog Post Header */}
      <section className="pt-24 pb-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <Link to="/blog" className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-portfolio-primary transition-colors">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Blog
            </Link>
            
            {isAdmin && (
              <Button onClick={handleEdit} variant="outline" className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Edit Post
              </Button>
            )}
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="rounded-xl overflow-hidden mb-8">
              <img 
                src={post.imageSrc} 
                alt={post.title} 
                className="w-full h-auto object-cover"
                style={{ maxHeight: '500px' }}
              />
            </div>
            
            <div className="flex flex-wrap gap-3 mb-4">
              {post.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-medium px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-500 dark:text-gray-400 mb-12">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                {post.author}
              </div>
              
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                {post.date}
              </div>
              
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                {post.readTime}
              </div>
            </div>
            
            {/* Blog Post Content */}
            <div 
              className="prose prose-lg max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* Comments Section */}
            <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-8 flex items-center">
                <MessageSquare className="mr-2 h-6 w-6" />
                Comments
              </h3>
              
              {/* Login to comment */}
              <div className="card p-8 text-center bg-white dark:bg-gray-800 rounded-lg shadow">
                <h4 className="text-xl font-bold mb-4">Join the conversation</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Sign in to leave comments and engage with the community.
                </p>
                <div className="flex justify-center gap-4">
                  <button className="btn-primary">Sign In</button>
                  <button className="btn-outline">Create Account</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
