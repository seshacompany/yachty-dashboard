export type NotificationType =
  | "REVIEW"
  | "PAYMENT"
  | "SUPPORT"
  | "REPORT"
  | string;

export type NotificationItem = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  readAt: string | null;
  createdAt: string;
};

export type NotificationMeta = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type NotificationsData = {
  items: NotificationItem[];
  unreadCount: number;
  meta: NotificationMeta;
};

export type NotificationResponse = {
  success: boolean;
  message: string;
  data: NotificationsData;
};

export type GetNotificationsParams = {
  page?: number;
  limit?: number;
};

export type NotificationMutationResponse = {
  success: boolean;
  message: string;
  data?: unknown;
};
