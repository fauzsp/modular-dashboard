import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '@/lib/queryClient';
import type { UserStats } from '@shared/schema';

interface UserStatsState {
  data: UserStats | null;
  isLoading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

const initialState: UserStatsState = {
  data: null,
  isLoading: false,
  error: null,
  lastUpdated: null,
};

export const fetchUserStats = createAsyncThunk(
  'userStats/fetchUserStats',
  async () => {
    const response = await apiRequest('GET', '/api/user-stats');
    return await response.json();
  }
);

export const updateUserStats = createAsyncThunk(
  'userStats/updateUserStats',
  async (stats: Partial<UserStats>) => {
    const response = await apiRequest('PUT', '/api/user-stats', stats);
    return await response.json();
  }
);

const userStatsSlice = createSlice({
  name: 'userStats',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchUserStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch user stats';
      })
      .addCase(updateUserStats.fulfilled, (state, action) => {
        state.data = action.payload;
        state.lastUpdated = new Date().toISOString();
      });
  },
});

export const { clearError } = userStatsSlice.actions;
export default userStatsSlice.reducer;
