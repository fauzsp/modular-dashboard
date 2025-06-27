export const typeDefs = `#graphql
  type User {
    id: ID!
    username: String!
    email: String!
    role: String!
    avatar: String
    createdAt: String!
  }

  type Metric {
    id: ID!
    name: String!
    value: String!
    change: String
    icon: String!
    color: String!
    updatedAt: String!
  }

  type UserStats {
    id: ID!
    newRegistrations: Int!
    activeUsers: Int!
    avgSessionTime: String!
    updatedAt: String!
  }

  type ChartDataPoint {
    name: String!
    value: Int!
  }

  type Analytics {
    id: ID!
    pageViews: Int!
    uniqueVisitors: Int!
    chartData: [ChartDataPoint!]
    timeRange: String!
    updatedAt: String!
  }

  type Notification {
    id: ID!
    title: String!
    message: String!
    type: String!
    isRead: Boolean!
    userId: Int
    createdAt: String!
  }

  type Activity {
    id: ID!
    userId: Int!
    user: User
    action: String!
    createdAt: String!
  }

  type Query {
    metrics: [Metric!]!
    userStats: UserStats
    analytics(timeRange: String): Analytics
    notifications(userId: Int): [Notification!]!
    activities(limit: Int): [Activity!]!
    user(id: ID!): User
  }

  type Mutation {
    markNotificationAsRead(id: ID!): Boolean!
    markAllNotificationsAsRead(userId: Int): Boolean!
    createNotification(title: String!, message: String!, type: String!, userId: Int): Notification!
  }

  type Subscription {
    notificationAdded: Notification!
    userStatsUpdated: UserStats!
    metricsUpdated: [Metric!]!
  }
`;
