import { 
  users, metrics, userStats, analytics, notifications, activities,
  type User, type InsertUser, type Metric, type InsertMetric,
  type UserStats, type InsertUserStats, type Analytics, type InsertAnalytics,
  type Notification, type InsertNotification, type Activity, type InsertActivity
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Metrics
  getMetrics(): Promise<Metric[]>;
  updateMetric(id: number, metric: Partial<InsertMetric>): Promise<Metric | undefined>;
  
  // User Stats
  getUserStats(): Promise<UserStats | undefined>;
  updateUserStats(stats: Partial<InsertUserStats>): Promise<UserStats>;
  
  // Analytics
  getAnalytics(timeRange?: string): Promise<Analytics | undefined>;
  updateAnalytics(analytics: Partial<InsertAnalytics>): Promise<Analytics>;
  
  // Notifications
  getNotifications(userId?: number): Promise<Notification[]>;
  createNotification(notification: InsertNotification): Promise<Notification>;
  markNotificationAsRead(id: number): Promise<boolean>;
  markAllNotificationsAsRead(userId?: number): Promise<boolean>;
  
  // Activities
  getActivities(limit?: number): Promise<Activity[]>;
  createActivity(activity: InsertActivity): Promise<Activity>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private metrics: Map<number, Metric> = new Map();
  private userStats: UserStats | undefined = undefined;
  private analytics: Analytics | undefined = undefined;
  private notifications: Map<number, Notification> = new Map();
  private activities: Map<number, Activity> = new Map();
  private currentUserId = 1;
  private currentMetricId = 1;
  private currentNotificationId = 1;
  private currentActivityId = 1;

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Initialize default user
    const defaultUser: User = {
      id: this.currentUserId++,
      username: "admin",
      password: "admin123",
      email: "admin@dashboard.com",
      role: "admin",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      createdAt: new Date(),
    };
    this.users.set(defaultUser.id, defaultUser);

    // Initialize metrics
    const defaultMetrics: Omit<Metric, 'id'>[] = [
      { name: "Total Users", value: "24,567", change: "12.5", icon: "users", color: "blue", updatedAt: new Date() },
      { name: "Revenue", value: "$45,231", change: "8.2", icon: "dollar-sign", color: "green", updatedAt: new Date() },
      { name: "Active Sessions", value: "1,847", change: "-3.1", icon: "chart-line", color: "orange", updatedAt: new Date() },
      { name: "Conversion Rate", value: "3.24%", change: "0.8", icon: "percentage", color: "purple", updatedAt: new Date() },
    ];

    defaultMetrics.forEach(metric => {
      const fullMetric: Metric = { ...metric, id: this.currentMetricId++ };
      this.metrics.set(fullMetric.id, fullMetric);
    });

    // Initialize user stats
    this.userStats = {
      id: 1,
      newRegistrations: 342,
      activeUsers: 1847,
      avgSessionTime: "4m 32s",
      updatedAt: new Date(),
    };

    // Initialize analytics
    this.analytics = {
      id: 1,
      pageViews: 156200,
      uniqueVisitors: 42700,
      chartData: [
        { name: 'Mon', value: 2400 },
        { name: 'Tue', value: 1398 },
        { name: 'Wed', value: 9800 },
        { name: 'Thu', value: 3908 },
        { name: 'Fri', value: 4800 },
        { name: 'Sat', value: 3800 },
        { name: 'Sun', value: 4300 },
      ],
      timeRange: "7d",
      updatedAt: new Date(),
    };

    // Initialize notifications
    const defaultNotifications: Omit<Notification, 'id'>[] = [
      {
        title: "System Maintenance Scheduled",
        message: "Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM EST.",
        type: "info",
        isRead: false,
        userId: 1,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      },
      {
        title: "Backup Completed Successfully",
        message: "Daily backup process completed. All data has been secured.",
        type: "success",
        isRead: false,
        userId: 1,
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      },
      {
        title: "High CPU Usage Detected",
        message: "Server CPU usage is currently at 85%. Consider scaling resources.",
        type: "warning",
        isRead: false,
        userId: 1,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      },
    ];

    defaultNotifications.forEach(notification => {
      const fullNotification: Notification = { ...notification, id: this.currentNotificationId++ };
      this.notifications.set(fullNotification.id, fullNotification);
    });

    // Initialize activities
    const defaultActivities: Omit<Activity, 'id'>[] = [
      {
        userId: 1,
        action: "updated the user analytics dashboard",
        createdAt: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      },
      {
        userId: 1,
        action: "created a new notification template",
        createdAt: new Date(Date.now() - 32 * 60 * 1000), // 32 minutes ago
      },
      {
        userId: 1,
        action: "deployed the latest user stats module",
        createdAt: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      },
    ];

    defaultActivities.forEach(activity => {
      const fullActivity: Activity = { ...activity, id: this.currentActivityId++ };
      this.activities.set(fullActivity.id, fullActivity);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      ...insertUser,
      id: this.currentUserId++,
      role: insertUser.role || "user",
      avatar: insertUser.avatar || null,
      createdAt: new Date(),
    };
    this.users.set(user.id, user);
    return user;
  }

  async getMetrics(): Promise<Metric[]> {
    return Array.from(this.metrics.values());
  }

  async updateMetric(id: number, metric: Partial<InsertMetric>): Promise<Metric | undefined> {
    const existing = this.metrics.get(id);
    if (!existing) return undefined;
    
    const updated: Metric = { ...existing, ...metric, updatedAt: new Date() };
    this.metrics.set(id, updated);
    return updated;
  }

  async getUserStats(): Promise<UserStats | undefined> {
    return this.userStats || undefined;
  }

  async updateUserStats(stats: Partial<InsertUserStats>): Promise<UserStats> {
    this.userStats = {
      ...this.userStats!,
      ...stats,
      updatedAt: new Date(),
    };
    return this.userStats;
  }

  async getAnalytics(timeRange?: string): Promise<Analytics | undefined> {
    return this.analytics || undefined;
  }

  async updateAnalytics(analyticsData: Partial<InsertAnalytics>): Promise<Analytics> {
    this.analytics = {
      ...this.analytics!,
      ...analyticsData,
      updatedAt: new Date(),
    };
    return this.analytics;
  }

  async getNotifications(userId?: number): Promise<Notification[]> {
    const allNotifications = Array.from(this.notifications.values());
    if (userId) {
      return allNotifications.filter(n => n.userId === userId);
    }
    return allNotifications;
  }

  async createNotification(notification: InsertNotification): Promise<Notification> {
    const newNotification: Notification = {
      ...notification,
      id: this.currentNotificationId++,
      type: notification.type || "info",
      isRead: notification.isRead || false,
      userId: notification.userId || null,
      createdAt: new Date(),
    };
    this.notifications.set(newNotification.id, newNotification);
    return newNotification;
  }

  async markNotificationAsRead(id: number): Promise<boolean> {
    const notification = this.notifications.get(id);
    if (!notification) return false;
    
    notification.isRead = true;
    this.notifications.set(id, notification);
    return true;
  }

  async markAllNotificationsAsRead(userId?: number): Promise<boolean> {
    const notifications = await this.getNotifications(userId);
    notifications.forEach(notification => {
      notification.isRead = true;
      this.notifications.set(notification.id, notification);
    });
    return true;
  }

  async getActivities(limit: number = 10): Promise<Activity[]> {
    const activities = Array.from(this.activities.values())
      .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime())
      .slice(0, limit);
    
    return activities;
  }

  async createActivity(activity: InsertActivity): Promise<Activity> {
    const newActivity: Activity = {
      ...activity,
      id: this.currentActivityId++,
      createdAt: new Date(),
    };
    this.activities.set(newActivity.id, newActivity);
    return newActivity;
  }
}

export const storage = new MemStorage();
