import { storage } from "../storage";

export const resolvers = {
  Query: {
    metrics: async () => {
      return await storage.getMetrics();
    },
    userStats: async () => {
      return await storage.getUserStats();
    },
    analytics: async (_: any, { timeRange }: { timeRange?: string }) => {
      return await storage.getAnalytics(timeRange);
    },
    notifications: async (_: any, { userId }: { userId?: number }) => {
      return await storage.getNotifications(userId);
    },
    activities: async (_: any, { limit }: { limit?: number }) => {
      const activities = await storage.getActivities(limit);
      return activities;
    },
    user: async (_: any, { id }: { id: string }) => {
      return await storage.getUser(parseInt(id));
    },
  },

  Mutation: {
    markNotificationAsRead: async (_: any, { id }: { id: string }) => {
      return await storage.markNotificationAsRead(parseInt(id));
    },
    markAllNotificationsAsRead: async (_: any, { userId }: { userId?: number }) => {
      return await storage.markAllNotificationsAsRead(userId);
    },
    createNotification: async (_: any, args: any) => {
      return await storage.createNotification(args);
    },
  },

  Activity: {
    user: async (activity: any) => {
      return await storage.getUser(activity.userId);
    },
  },
};
