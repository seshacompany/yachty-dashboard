import type { GetUsersParams, UsersData } from "../types";
import usersMockData from "@/data/response/response_users.json";

export const getUsers = async (
  params: GetUsersParams = {}
): Promise<UsersData> => {
  let items = [...usersMockData.data.items];

  if (params.role) {
    items = items.filter((user) => user.role === params.role);
  }

  if (params.status) {
    items = items.filter((user) => user.status === params.status);
  }

  if (params.email) {
    const searchEmail = params.email.toLowerCase();
    items = items.filter((user) =>
      user.email?.toLowerCase().includes(searchEmail)
    );
  }

  const page = params.page ?? 1;
  const limit = params.limit ?? 10;
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / limit) || 1;
  const startIndex = (page - 1) * limit;
  const paginatedItems = items.slice(startIndex, startIndex + limit);

  return {
    items: paginatedItems as UsersData["items"],
    meta: {
      page,
      limit,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
};
