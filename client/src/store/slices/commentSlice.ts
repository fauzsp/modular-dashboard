import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiRequest } from '@/lib/queryClient';
import type { Comment } from '@shared/schema';

interface Comments {
    comments: Comment[];
      isLoading: boolean;
      error: string | null;
}

const initialState: Comments = {
    comments: [],
    isLoading: false,
    error: null,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId?: number) => {
    const url = postId ? `/api/comments?postId=${postId}` : '/api/comments';
    const response = await apiRequest('GET', `${url}`);
    const value = await response.json();
    return value;
  }
)

export const createComment = createAsyncThunk(
  'comments/createComment',
  async (commentData: Comment) => {
    const response = await apiRequest('POST', '/api/comments', {
      body: JSON.stringify(commentData),
      headers: { 'Content-Type': 'application/json' },
    });
    const value = await response.json();
    console.log('Created Comment:', value);
    return value;
  }
)

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments(state, action: PayloadAction<Comment[]>) {
      state.comments = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch comments';
      });
  },
});

export const { setComments, setLoading, setError } = commentSlice.actions;

export default commentSlice.reducer;