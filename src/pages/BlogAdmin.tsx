
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { useAppSelector, useAppDispatch } from '@/hooks/use-redux';
import { 
  deletePost, 
  fetchBlogsStart, 
  fetchBlogsSuccess,
  fetchBlogsFailure,
  BlogPost
} from '@/store/blogSlice';
import { Pencil, Trash, PlusCircle, Eye } from 'lucide-react';
import { BLOG_POSTS } from '@/data/blogData';
import BlogEditor from '@/components/BlogEditor';

const BlogAdmin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Get posts from Redux store
  const { posts, isLoading, error } = useAppSelector(state => state.blog);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);

  // Check if we were navigated here with a post to edit
  useEffect(() => {
    if (location.state?.editPostId) {
      const postToEdit = posts.find(post => post.id === location.state.editPostId);
      if (postToEdit) {
        handleEdit(postToEdit);
      }
    }
  }, [location.state, posts]);

  // Load posts if empty
  useEffect(() => {
    if (posts.length === 0 && !isLoading) {
      dispatch(fetchBlogsStart());
      try {
        // In a real app, this would be an API call
        dispatch(fetchBlogsSuccess(BLOG_POSTS));
      } catch (error) {
        dispatch(fetchBlogsFailure('Failed to load blog posts'));
      }
    }
  }, [dispatch, posts.length, isLoading]);

  const handleDelete = (id: string | number) => {
    try {
      dispatch(deletePost(id.toString()));
      
      toast({
        title: "Post deleted",
        description: "The blog post has been successfully deleted.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (post: BlogPost) => {
    setCurrentPost(post);
    setIsEditing(true);
  };

  const handleAdd = () => {
    setCurrentPost(null);
    setIsEditing(true);
  };

  const handleView = (id: string | number) => {
    navigate(`/blog/${id}`);
  };

  const handleCloseEditor = () => {
    setIsEditing(false);
    setCurrentPost(null);
    // Clear the location state
    navigate(location.pathname, { replace: true, state: {} });
  };

  if (isLoading) {
    return (
      <div className="section-padding pt-24">
        <div className="container mx-auto">
          <p>Loading blog posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="section-padding pt-24">
        <div className="container mx-auto">
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
            <p className="text-red-600 dark:text-red-400">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding pt-24">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <Button onClick={handleAdd} className="flex items-center gap-2">
            <PlusCircle className="w-4 h-4" />
            New Post
          </Button>
        </div>

        {isEditing ? (
          <BlogEditor post={currentPost} onClose={handleCloseEditor} />
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>{post.date}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {post.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleView(post.id)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEdit(post)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => handleDelete(post.id)}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogAdmin;
