import { useSelector } from "react-redux";
import { Users, DollarSign, TrendingUp, Percent, TrendingDown } from "lucide-react";
import type { RootState } from "@/store";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const iconMap = {
  users: Users,
  "dollar-sign": DollarSign,
  "chart-line": TrendingUp,
  percentage: Percent,
};

const colorMap = {
  blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
  green: "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400",
  orange: "bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400",
  purple: "bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
};

export default function MetricsOverview() {
  const { metrics, isLoading } = useSelector((state: RootState) => state.dashboard);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="w-12 h-12 rounded-lg" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => {
        const Icon = iconMap[metric.icon as keyof typeof iconMap] || Users;
        const colorClass = colorMap[metric.color as keyof typeof colorMap] || colorMap.blue;
        const change = parseFloat(metric.change || "0");
        const isPositive = change >= 0;

        return (
          <Card key={metric.id} className="metric-card slide-up">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-muted-foreground">
                    {metric.name}
                  </p>
                  <p className="text-3xl font-bold text-slate-800 dark:text-foreground mt-2">
                    {metric.value}
                  </p>
                  <div className="flex items-center mt-2">
                    {isPositive ? (
                      <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                    )}
                    <span 
                      className={`text-sm font-medium ${
                        isPositive ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {isPositive ? '+' : ''}{metric.change}%
                    </span>
                    <span className="text-xs text-slate-500 dark:text-muted-foreground ml-1">
                      vs last month
                    </span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClass}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
