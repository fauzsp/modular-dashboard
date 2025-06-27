import { useSelector, useDispatch } from "react-redux";
import { UserPlus, UserCheck, Clock } from "lucide-react";
import type { RootState, AppDispatch } from "@/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function UserStatsModule() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: userStats, isLoading } = useSelector((state: RootState) => state.userStats);

  const handleViewReport = () => {
    console.log("Loading full user stats report...");
  };

  if (isLoading || !userStats) {
    return (
      <Card className="module-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>User Statistics</CardTitle>
            <Skeleton className="w-12 h-4" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div>
                  <Skeleton className="h-4 w-24 mb-1" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              <Skeleton className="h-8 w-16" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  const stats = [
    {
      icon: UserPlus,
      label: "New Registrations",
      sublabel: "Last 24 hours",
      value: userStats.newRegistrations.toLocaleString(),
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
    },
    {
      icon: UserCheck,
      label: "Active Users",
      sublabel: "Currently online",
      value: userStats.activeUsers.toLocaleString(),
      color: "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400",
    },
    {
      icon: Clock,
      label: "Avg Session Time",
      sublabel: "Per user today",
      value: userStats.avgSessionTime,
      color: "bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400",
    },
  ];

  return (
    <Card className="module-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>User Statistics</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="status-indicator bg-green-500" />
            <span className="text-xs text-slate-500 dark:text-muted-foreground">Live</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index}
              className="flex items-center justify-between p-4 bg-slate-50 dark:bg-muted rounded-lg hover:bg-slate-100 dark:hover:bg-muted/80 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800 dark:text-foreground">
                    {stat.label}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-muted-foreground">
                    {stat.sublabel}
                  </p>
                </div>
              </div>
              <span className="text-2xl font-bold text-slate-800 dark:text-foreground">
                {stat.value}
              </span>
            </div>
          );
        })}
        
        <div className="pt-4 border-t border-slate-200 dark:border-border">
          <Button 
            onClick={handleViewReport}
            className="w-full"
          >
            View Detailed Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
