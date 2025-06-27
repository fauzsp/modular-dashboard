import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";
import { fetchMetrics } from "@/store/slices/dashboardSlice";
import { fetchUserStats } from "@/store/slices/userStatsSlice";
import { fetchAnalytics } from "@/store/slices/analyticsSlice";
import { fetchNotifications } from "@/store/slices/notificationsSlice";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import MetricsOverview from "@/components/modules/MetricsOverview";
import UserStatsModule from "@/components/modules/UserStatsModule";
import AnalyticsModule from "@/components/modules/AnalyticsModule";
import NotificationsModule from "@/components/modules/NotificationsModule";
import RecentActivity from "@/components/modules/RecentActivity";

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Initialize all dashboard data
    dispatch(fetchMetrics());
    dispatch(fetchUserStats());
    dispatch(fetchAnalytics('7d'));
    dispatch(fetchNotifications());
  }, [dispatch]);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        <TopBar />
        
        <div className="p-6 space-y-6">
          <MetricsOverview />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UserStatsModule />
            <AnalyticsModule />
          </div>
          
          <NotificationsModule />
          <RecentActivity />
        </div>
      </main>
    </div>
  );
}
