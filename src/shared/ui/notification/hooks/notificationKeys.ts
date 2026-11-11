export const notificationKeys = {
  all: ["notifications"] as const,
  lists: () => [...notificationKeys.all, "list"] as const,
  list: (params?: { limit?: number }) =>
    [...notificationKeys.lists(), params] as const,
};
