import type {
  CreateStaffPayload,
  StaffActionResponse,
  StaffData,
  StaffItem,
  StaffQueryParams,
  UpdateStaffPayload,
} from "../types";
import staffMockData from "@/data/response/response_staff.json";
import staffMeMockData from "@/data/response/response_staff_me.json";

export const getStaff = async (
  params: StaffQueryParams = {}
): Promise<StaffData> => {
  let items = [...staffMockData.data.items];

  if (params.search) {
    const s = params.search.toLowerCase();
    items = items.filter(
      (staff) =>
        staff.firstName?.toLowerCase().includes(s) ||
        staff.lastName?.toLowerCase().includes(s) ||
        staff.email?.toLowerCase().includes(s) ||
        staff.phone?.toLowerCase().includes(s)
    );
  }

  if (params.status) {
    items = items.filter((staff) => staff.status === params.status);
  }

  if (params.jobTitle) {
    items = items.filter((staff) => staff.jobTitle === params.jobTitle);
  }

  const page = params.page ?? 1;
  const limit = params.limit ?? 10;
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / limit) || 1;
  const startIndex = (page - 1) * limit;
  const paginatedItems = items.slice(startIndex, startIndex + limit);

  return {
    items: paginatedItems as unknown as StaffItem[],
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

export const getStaffById = async (id: string): Promise<StaffItem> => {
  const found = staffMockData.data.items.find((item) => item.id === id);
  if (found) {
    return found as unknown as StaffItem;
  }
  return staffMockData.data.items[0] as unknown as StaffItem;
};

export const getStaffMe = async (): Promise<StaffItem> => {
  return staffMeMockData.data as unknown as StaffItem;
};

export const createStaff = async (
  payload: CreateStaffPayload
): Promise<StaffActionResponse> => {
  return {
    success: true,
    message: "تم إنشاء الموظف بنجاح",
    data: {
      id: "mock-staff-id-" + Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...payload,
    } as unknown as StaffItem,
  };
};

export const updateStaff = async (
  id: string,
  payload: UpdateStaffPayload
): Promise<StaffActionResponse> => {
  return {
    success: true,
    message: "تم تحديث بيانات الموظف بنجاح",
    data: {
      id,
      updatedAt: new Date().toISOString(),
      ...payload,
    } as unknown as StaffItem,
  };
};

export const deleteStaff = async (id: string): Promise<StaffActionResponse> => {
  return {
    success: true,
    message: "تم حذف الموظف بنجاح",
    data: { id } as unknown as StaffItem,
  };
};
