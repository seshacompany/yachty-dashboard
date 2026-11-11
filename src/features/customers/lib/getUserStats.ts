import type { UserStatistics } from "../types";
import usersMockData from "@/data/response/response_users.json";

export const getUserStats = async (): Promise<UserStatistics> => {
  const items = usersMockData.data.items;

  return {
    totalUsers: usersMockData.data.meta.totalItems ?? items.length,
    seekerUsers: items.filter((u) => u.role === "SEEKER").length,
    ownerUsers: items.filter((u) => u.role === "OWNER").length,
    activeUsers: items.filter((u) => u.status === "ACTIVE").length,
  };
};
