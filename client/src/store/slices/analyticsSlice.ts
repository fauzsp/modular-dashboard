import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiRequest } from '@/lib/queryClient';
import type { Analytics } from '@shared/schema';

interface AnalyticsState {
  data: Analytics | null;
  isLoading: boolean;
  error: string | null;
  timeRange: string;
}

const initialState: AnalyticsState = {
  data: null,
  isLoading: false,
  error: null,
  timeRange: '7d',
};

export const fetchAnalytics = createAsyncThunk(
  'analytics/fetchAnalytics',
  async (timeRange: string = '7d') => {
    const response = await apiRequest('GET', `/api/analytics?timeRange=${timeRange}`);
    return await response.json();
  }
);

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setTimeRange: (state, action: PayloadAction<string>) => {
      state.timeRange = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalytics.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch analytics';
      });
  },
});

export const { setTimeRange, clearError } = analyticsSlice.actions;
export default analyticsSlice.reducer;
