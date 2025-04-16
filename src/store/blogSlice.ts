
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type BlogPost = {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  tags: string[];
  imageSrc: string;
};

type BlogState = {
  posts: BlogPost[];
  currentPost: BlogPost | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: BlogState = {
  posts: [],
  currentPost: null,
  isLoading: false,
  error: null,
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    fetchBlogsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchBlogsSuccess: (state, action: PayloadAction<BlogPost[]>) => {
      state.isLoading = false;
      state.posts = action.payload;
      state.error = null;
    },
    fetchBlogsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setCurrentPost: (state, action: PayloadAction<BlogPost>) => {
      state.currentPost = action.payload;
    },
    createPost: (state, action: PayloadAction<BlogPost>) => {
      state.posts.push(action.payload);
    },
    updatePost: (state, action: PayloadAction<BlogPost>) => {
      const index = state.posts.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    deletePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
  },
});

export const { 
  fetchBlogsStart, 
  fetchBlogsSuccess, 
  fetchBlogsFailure,
  setCurrentPost,
  createPost,
  updatePost,
  deletePost,
} = blogSlice.actions;

export default blogSlice.reducer;
