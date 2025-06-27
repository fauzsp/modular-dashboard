import { useSelector, useDispatch } from "react-redux";
import { TrendingUp, BarChart3 } from "lucide-react";
import type { RootState, AppDispatch } from "@/store";
import { setTimeRange, fetchAnalytics } from "@/store/slices/analyticsSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function AnalyticsModule() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: analytics, isLoading, timeRange } = useSelector((state: RootState) => state.analytics);

  const handleTimeRangeChange = (value: string) => {
    dispatch(setTimeRange(value));
    dispatch(fetchAnalytics(value));
  };

  const handleOpenFullAnalytics = () => {
    console.log("Opening full analytics dashboard...");
  };

  if (isLoading || !analytics) {
    return (
      <Card className="module-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Analytics Overview</CardTitle>
            <Skeleton className="w-32 h-8" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="chart-container" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-20 rounded-lg" />
            <Skeleton className="h-20 rounded-lg" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const pageViewsChange = "+15.3%";
  const uniqueVisitorsChange = "+8.1%";

  return (
    <Card className="module-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Analytics Overview</CardTitle>
          <Select value={timeRange} onValueChange={handleTimeRangeChange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Chart */}
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analytics.chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
              <XAxis 
                dataKey="name" 
                className="text-xs text-slate-500 dark:text-muted-foreground"
              />
              <YAxis className="text-xs text-slate-500 dark:text-muted-foreground" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-slate-50 dark:bg-muted rounded-lg">
            <p className="text-2xl font-bold text-slate-800 dark:text-foreground">
              {analytics.pageViews.toLocaleString()}
            </p>
            <p className="text-xs text-slate-500 dark:text-muted-foreground">Page Views</p>
            <div className="flex items-center justify-center mt-1">
              <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
              <span className="text-xs text-green-600">{pageViewsChange}</span>
            </div>
          </div>
          
          <div className="text-center p-4 bg-slate-50 dark:bg-muted rounded-lg">
            <p className="text-2xl font-bold text-slate-800 dark:text-foreground">
              {analytics.uniqueVisitors.toLocaleString()}
            </p>
            <p className="text-xs text-slate-500 dark:text-muted-foreground">Unique Visitors</p>
            <div className="flex items-center justify-center mt-1">
              <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
              <span className="text-xs text-green-600">{uniqueVisitorsChange}</span>
            </div>
          </div>
        </div>
        
        <div className="pt-4 border-t border-slate-200 dark:border-border">
          <Button 
            onClick={handleOpenFullAnalytics}
            variant="secondary"
            className="w-full"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Open Analytics Dashboard
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
