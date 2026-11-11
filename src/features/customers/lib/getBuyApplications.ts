import type { requestBuyType } from "../types";

export type GetBuyApplicationsParams = {
  page?: number;
  limit?: number;
  id?: string;
  client_name?: string;
  status?: string;
  area?: string;
  unit_type?: string;
  purpose?: string;
};

export type BuyApplicationsStats = {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  completed: number;
};

export type CustomerStatistics = {
  totalCustomers: {
    label: string;
    value: number;
  };
  students: {
    label: string;
    value: number;
  };
  graduates: {
    label: string;
    value: number;
  };
  blockedCustomers: {
    label: string;
    value: number;
  };
  activeCustomers: {
    label: string;
    value: number;
  };
};

export type GetBuyApplicationsResponse = {
  data: requestBuyType[];
  totalPages: number;
  totalItems: number;
  stats: CustomerStatistics;
};

export const getBuyApplications = async (
  _params: GetBuyApplicationsParams = {}
): Promise<GetBuyApplicationsResponse> => {
  return {
    data: [],
    totalPages: 1,
    totalItems: 0,
    stats: {
      totalCustomers: { label: "إجمالي العملاء", value: 0 },
      students: { label: "الطلاب", value: 0 },
      graduates: { label: "الخريجين", value: 0 },
      blockedCustomers: { label: "العملاء المحظورين", value: 0 },
      activeCustomers: { label: "العملاء النشطين", value: 0 },
    },
  };
};
