import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Search, Bell, ChevronDown } from "lucide-react";
import type { RootState, AppDispatch } from "@/store";
import { toggleSidebar, setSearchQuery } from "@/store/slices/dashboardSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function TopBar() {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser, searchQuery } = useSelector((state: RootState) => state.dashboard);
  const { unreadCount } = useSelector((state: RootState) => state.notifications);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleSearch = (value: string) => {
    dispatch(setSearchQuery(value));
  };

  const handleNotificationsToggle = () => {
    setNotificationsOpen(!notificationsOpen);
  };

  return (
    <header className="bg-white dark:bg-card border-b border-slate-200 dark:border-border shadow-sm sticky top-0 z-40">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => dispatch(toggleSidebar())}
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <h1 className="text-2xl font-semibold text-slate-800 dark:text-foreground">
            Dashboard Overview
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            className="relative"
            onClick={handleNotificationsToggle}
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <Badge variant="destructive" className="notification-badge">
                {unreadCount}
              </Badge>
            )}
          </Button>
          
          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} />
                  <AvatarFallback>
                    {currentUser?.name?.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{currentUser?.name}</p>
                  <p className="text-xs text-muted-foreground">{currentUser?.email}</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
