import type {
  GetNotificationsParams,
  NotificationItem,
  NotificationMutationResponse,
  NotificationsData,
} from "../types";
import notificationsMockData from "@/data/response/response_notifaction.json";

export const notificationApi = {
  getNotifications: async (
    params: GetNotificationsParams = {}
  ): Promise<NotificationsData> => {
    const items = [...notificationsMockData.data.items];
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / limit) || 1;
    const startIndex = (page - 1) * limit;
    const paginatedItems = items.slice(startIndex, startIndex + limit);

    return {
      items: paginatedItems as unknown as NotificationItem[],
      unreadCount: items.filter((item) => !item.isRead).length,
      meta: {
        page,
        limit,
        totalItems,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  },

  readAll: async (): Promise<NotificationMutationResponse> => {
    return {
      success: true,
      message: "تم تحديد جميع الإشعارات كمقروءة",
    };
  },

  clearAll: async (): Promise<NotificationMutationResponse> => {
    return {
      success: true,
      message: "تم حذف جميع الإشعارات",
    };
  },

  readOne: async (id: string): Promise<NotificationMutationResponse> => {
    return {
      success: true,
      message: "تم تحديد الإشعار كمقروء",
      data: { id },
    };
  },

  deleteOne: async (id: string): Promise<NotificationMutationResponse> => {
    return {
      success: true,
      message: "تم حذف الإشعار بنجاح",
      data: { id },
    };
  },
};
