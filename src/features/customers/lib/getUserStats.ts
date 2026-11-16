import usersMockData from "@/data/response/response_users.json";

export type UserStatistics = {
  totalUsers: number;
  regularUsers: number;
  companyUsers: number;
  activeUsers: number;
};

export const getUserStats = async (): Promise<UserStatistics> => {
  const items = usersMockData.data;

  return {
    totalUsers: usersMockData.meta.total ?? items.length,
    regularUsers: items.filter((u) => u.role === "user").length,
    companyUsers: items.filter((u) => u.role === "company").length,
    activeUsers: items.filter((u) => u.status === "approved").length,
  };
};
