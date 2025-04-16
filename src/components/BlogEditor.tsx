
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAppDispatch } from '@/hooks/use-redux';
import { createPost, updatePost, BlogPost } from '@/store/blogSlice';
import { X, ImagePlus, Save, Tag } from 'lucide-react';
import RichTextEditor from './RichTextEditor';
import TypewriterEffect from './TypewriterEffect';

interface BlogEditorProps {
  post?: BlogPost | null;
  onClose: () => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ post, onClose }) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const isEditMode = !!post;

  const [formData, setFormData] = useState<BlogPost>({
    id: '',
    title: '',
    excerpt: '',
    content: '',
    date: '',
    readTime: '',
    author: 'Abhay Singh Chauhan',
    tags: [''],
    imageSrc: '/placeholder.svg',
  });

  const [currentTag, setCurrentTag] = useState('');

  useEffect(() => {
    if (post) {
      setFormData(post);
    } else {
      // For new posts, set today's date
      const today = new Date();
      setFormData(prev => ({
        ...prev,
        id: Date.now().toString(),
        date: today.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        readTime: '5 min read',
      }));
    }
  }, [post]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (content: string) => {
    setFormData(prev => ({ ...prev, content }));
  };

  const handleAddTag = () => {
    if (currentTag.trim()) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags.filter(Boolean), currentTag.trim()],
      }));
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real app, this would upload the image to a server
    // For now, we'll just mock it
    if (e.target.files && e.target.files[0]) {
      // Simulating image upload
      setFormData(prev => ({ ...prev, imageSrc: URL.createObjectURL(e.target.files![0]) }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isEditMode) {
        dispatch(updatePost(formData));
        toast({
          title: "Post updated",
          description: "The blog post has been successfully updated.",
        });
      } else {
        dispatch(createPost(formData));
        toast({
          title: "Post created",
          description: "The blog post has been successfully created.",
        });
      }
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save the post. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          <TypewriterEffect 
            text={isEditMode ? 'Edit Blog Post' : 'Create New Blog Post'} 
            speed={70}
            className="text-portfolio-primary"
          />
        </h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <CardContent className="p-0">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="title">
              Title
            </label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="excerpt">
              Excerpt
            </label>
            <Textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Enter a brief summary"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="content">
              Content
            </label>
            <RichTextEditor 
              initialValue={formData.content} 
              onChange={handleContentChange} 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="readTime">
              Read Time
            </label>
            <Input
              id="readTime"
              name="readTime"
              value={formData.readTime}
              onChange={handleChange}
              placeholder="e.g., 5 min read"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="tags">
              Tags
            </label>
            <div className="flex mb-2">
              <Input
                id="tags"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                placeholder="Add a tag"
                className="mr-2"
              />
              <Button 
                type="button" 
                onClick={handleAddTag} 
                variant="outline"
                className="flex items-center gap-1"
              >
                <Tag className="h-4 w-4" />
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.filter(Boolean).map((tag, index) => (
                <div
                  key={index}
                  className="bg-gray-100 dark:bg-gray-700 text-sm px-3 py-1 rounded-full flex items-center"
                >
                  {tag}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 ml-1 p-0"
                    onClick={() => handleRemoveTag(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="image">
              Featured Image
            </label>
            <div className="flex items-center gap-4">
              <div className="h-24 w-24 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={formData.imageSrc}
                  alt="Featured"
                  className="h-full w-full object-cover"
                />
              </div>
              <label className="cursor-pointer">
                <Input
                  id="image"
                  type="file"
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/*"
                />
                <div className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-600">
                  <ImagePlus className="h-4 w-4" />
                  {isEditMode ? 'Change Image' : 'Upload Image'}
                </div>
              </label>
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="flex items-center gap-1">
              <Save className="h-4 w-4" />
              {isEditMode ? 'Update' : 'Publish'} Post
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BlogEditor;
