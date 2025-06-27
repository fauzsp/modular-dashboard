import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiRequest } from '@/lib/queryClient';
import type { Metric } from '@shared/schema';

interface DashboardState {
  metrics: Metric[];
  isLoading: boolean;
  error: string | null;
  sidebarOpen: boolean;
  searchQuery: string;
  currentUser: {
    id: number;
    name: string;
    email: string;
    avatar: string;
    role: string;
  } | null;
}

const initialState: DashboardState = {
  metrics: [],
  isLoading: false,
  error: null,
  sidebarOpen: false,
  searchQuery: '',
  currentUser: {
    id: 1,
    name: 'John Doe',
    email: 'admin@dashboard.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150',
    role: 'Admin',
  },
};

export const fetchMetrics = createAsyncThunk(
  'dashboard/fetchMetrics',
  async () => {
    const response = await apiRequest('GET', '/api/metrics');
    return await response.json();
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMetrics.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMetrics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.metrics = action.payload;
      })
      .addCase(fetchMetrics.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch metrics';
      });
  },
});

export const { toggleSidebar, setSearchQuery, clearError } = dashboardSlice.actions;
export default dashboardSlice.reducer;
