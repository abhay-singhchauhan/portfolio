
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { deletePost } from '@/store/blogSlice';
import { Pencil, Trash, PlusCircle, Eye } from 'lucide-react';
import { BLOG_POSTS } from '@/data/blogData';
import BlogEditor from '@/components/BlogEditor';

type BlogPost = {
  id: string | number;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
};

const BlogAdmin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // In a real app, this would come from the Redux store
  const [posts, setPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);

  const handleDelete = (id: string | number) => {
    try {
      // This would dispatch to an API in a real app
      setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
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
  };

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
