import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "wouter";
import { 
  Home, Users, BarChart, Bell, Settings,  
  ChartLine, LogOut 
} from "lucide-react";
import type { RootState, AppDispatch } from "@/store";
import { toggleSidebar } from "@/store/slices/dashboardSlice";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navigationItems = [
  { path: "/", label: "Dashboard", icon: Home },
  { path: "/overview", label: "Overview", icon: Bell },
  { path: "/user-stats", label: "User Stats", icon: Users },
  { path: "/analytics", label: "Analytics", icon: BarChart },
  { path: "/notifications", label: "Notifications", icon: Bell },
  { path: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const dispatch = useDispatch<AppDispatch>();
  const [location] = useLocation();
  const { sidebarOpen, currentUser } = useSelector((state: RootState) => state.dashboard);
  const { unreadCount } = useSelector((state: RootState) => state.notifications);

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={() => dispatch(toggleSidebar())}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:relative inset-y-0 left-0 z-50 w-64 
        bg-white dark:bg-card border-r border-slate-200 dark:border-border shadow-sm
        transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        {/* Logo */}
        <div className="flex items-center px-6 py-4 border-b border-slate-200 dark:border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <ChartLine className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-slate-800 dark:text-foreground">
              DashboardPro
            </span>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path || 
              (item.path !== "/" && location.startsWith(item.path));
            
            return (
              <Link key={item.path} href={item.path}>
                <div className={`nav-link ${isActive ? 'nav-link-active' : 'nav-link-inactive'}`}>
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                  {item.label === "Notifications" && unreadCount > 0 && (
                    <Badge variant="destructive" className="ml-auto">
                      {unreadCount}
                    </Badge>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
        
        {/* User Profile */}
        <div className="px-4 py-6 border-t border-slate-200 dark:border-border">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} />
              <AvatarFallback>
                {currentUser?.name?.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 dark:text-foreground truncate">
                {currentUser?.name}
              </p>
              <p className="text-xs text-slate-500 dark:text-muted-foreground truncate">
                {currentUser?.role}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-slate-400 hover:text-slate-600"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
