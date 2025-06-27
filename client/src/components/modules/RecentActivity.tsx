import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import type { Activity } from "@shared/schema";

const statusColors = [
  "bg-green-500",
  "bg-blue-500", 
  "bg-purple-500",
  "bg-orange-500",
];

export default function RecentActivity() {
  const [refreshing, setRefreshing] = useState(false);
  
  const { data: activities, isLoading, refetch } = useQuery<Activity[]>({
    queryKey: ['/api/activities'],
    staleTime: 30000, // 30 seconds
  });

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setTimeout(() => setRefreshing(false), 500);
  };

  if (isLoading) {
    return (
      <Card className="module-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Activity</CardTitle>
            <Skeleton className="w-20 h-8" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4 p-3 rounded-lg">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="w-2 h-2 rounded-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="module-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Activity</CardTitle>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw className={`w-4 h-4 mr-1 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {!activities || activities.length === 0 ? (
          <div className="text-center py-8 text-slate-500 dark:text-muted-foreground">
            <RefreshCw className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No recent activity</p>
          </div>
        ) : (
          activities.map((activity, index) => (
            <div 
              key={activity.id} 
              className="flex items-center space-x-4 p-3 hover:bg-slate-50 dark:hover:bg-muted rounded-lg transition-colors"
            >
              <Avatar className="w-10 h-10">
                <AvatarImage 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150" 
                  alt="User Avatar" 
                />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-800 dark:text-foreground">
                  <span className="font-medium">Admin</span>
                  <span className="ml-1">{activity.action}</span>
                </p>
                <p className="text-xs text-slate-500 dark:text-muted-foreground">
                  {formatDistanceToNow(new Date(activity.createdAt!), { addSuffix: true })}
                </p>
              </div>
              
              <div className={`w-2 h-2 rounded-full ${statusColors[index % statusColors.length]}`} />
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
