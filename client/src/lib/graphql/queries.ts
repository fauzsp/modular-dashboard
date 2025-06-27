import { gql } from '@apollo/client';

export const GET_METRICS = gql`
  query GetMetrics {
    metrics {
      id
      name
      value
      change
      icon
      color
      updatedAt
    }
  }
`;

export const GET_USER_STATS = gql`
  query GetUserStats {
    userStats {
      id
      newRegistrations
      activeUsers
      avgSessionTime
      updatedAt
    }
  }
`;

export const GET_ANALYTICS = gql`
  query GetAnalytics($timeRange: String) {
    analytics(timeRange: $timeRange) {
      id
      pageViews
      uniqueVisitors
      chartData {
        name
        value
      }
      timeRange
      updatedAt
    }
  }
`;

export const GET_NOTIFICATIONS = gql`
  query GetNotifications($userId: Int) {
    notifications(userId: $userId) {
      id
      title
      message
      type
      isRead
      userId
      createdAt
    }
  }
`;

export const GET_ACTIVITIES = gql`
  query GetActivities($limit: Int) {
    activities(limit: $limit) {
      id
      userId
      user {
        id
        username
        avatar
      }
      action
      createdAt
    }
  }
`;

export const MARK_NOTIFICATION_AS_READ = gql`
  mutation MarkNotificationAsRead($id: ID!) {
    markNotificationAsRead(id: $id)
  }
`;

export const MARK_ALL_NOTIFICATIONS_AS_READ = gql`
  mutation MarkAllNotificationsAsRead($userId: Int) {
    markAllNotificationsAsRead(userId: $userId)
  }
`;

export const NOTIFICATION_ADDED_SUBSCRIPTION = gql`
  subscription NotificationAdded {
    notificationAdded {
      id
      title
      message
      type
      isRead
      userId
      createdAt
    }
  }
`;

export const USER_STATS_UPDATED_SUBSCRIPTION = gql`
  subscription UserStatsUpdated {
    userStatsUpdated {
      id
      newRegistrations
      activeUsers
      avgSessionTime
      updatedAt
    }
  }
`;
