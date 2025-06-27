import { useSelector, useDispatch } from "react-redux";
import { Info, CheckCircle, AlertTriangle, X } from "lucide-react";
import type { RootState, AppDispatch } from "@/store";
import { markNotificationAsRead, markAllNotificationsAsRead } from "@/store/slices/notificationsSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";

const typeIcons = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertTriangle,
};

const typeColors = {
  info: "bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800",
  success: "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800",
  warning: "bg-yellow-50 border-yellow-200 dark:bg-yellow-950/20 dark:border-yellow-800",
  error: "bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800",
};

const iconColors = {
  info: "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
  success: "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400",
  warning: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400",
  error: "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400",
};

export default function NotificationsModule() {
  const dispatch = useDispatch<AppDispatch>();
  const { notifications, isLoading, unreadCount } = useSelector((state: RootState) => state.notifications);

  const handleMarkAsRead = (id: number) => {
    dispatch(markNotificationAsRead(id));
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllNotificationsAsRead());
  };

  const handleLoadMore = () => {
    console.log("Loading more notifications...");
  };

  if (isLoading) {
    return (
      <Card className="module-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Notifications</CardTitle>
            <Skeleton className="w-24 h-6" />
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-start space-x-3 p-4 border rounded-lg">
              <Skeleton className="w-8 h-8 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="w-6 h-6" />
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
          <div className="flex items-center space-x-2">
            <CardTitle>Recent Notifications</CardTitle>
            {unreadCount > 0 && (
              <Badge variant="destructive">{unreadCount}</Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleMarkAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {notifications.length === 0 ? (
          <div className="text-center py-8 text-slate-500 dark:text-muted-foreground">
            <Info className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No notifications</p>
          </div>
        ) : (
          notifications.slice(0, 5).map((notification) => {
            const Icon = typeIcons[notification.type as keyof typeof typeIcons] || Info;
            const typeColor = typeColors[notification.type as keyof typeof typeColors];
            const iconColor = iconColors[notification.type as keyof typeof iconColors];
            
            return (
              <div 
                key={notification.id} 
                className={`flex items-start space-x-3 p-4 rounded-lg border transition-colors ${typeColor} ${
                  !notification.isRead ? 'ring-2 ring-blue-200 dark:ring-blue-800' : ''
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${iconColor}`}>
                  <Icon className="w-4 h-4" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 dark:text-foreground">
                    {notification.title}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-muted-foreground mt-1">
                    {notification.message}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-muted-foreground mt-2">
                    {formatDistanceToNow(new Date(notification.createdAt!), { addSuffix: true })}
                  </p>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleMarkAsRead(notification.id)}
                  className="text-slate-400 hover:text-slate-600 flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            );
          })
        )}
        
        {notifications.length > 5 && (
          <div className="pt-4 border-t border-slate-200 dark:border-border text-center">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleLoadMore}
            >
              View All Notifications
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
