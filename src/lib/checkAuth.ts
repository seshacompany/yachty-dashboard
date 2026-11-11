import type { AuthCheckResponse } from "@/types/typesLayouts";
import staffMeMock from "@/data/response/response_staff_me.json";

export const checkAuth = async (): Promise<AuthCheckResponse> => {
  return {
    id: staffMeMock.data.id,
    name: `${staffMeMock.data.firstName} ${staffMeMock.data.lastName}`,
    email: staffMeMock.data.email,
    role: "admin",
    createdAt: staffMeMock.data.createdAt,
    updatedAt: staffMeMock.data.updatedAt,
    staff: {
      id: staffMeMock.data.id,
      employee_name: `${staffMeMock.data.firstName} ${staffMeMock.data.lastName}`,
      email: staffMeMock.data.email,
      area: "All",
      job_title: staffMeMock.data.jobTitle || "Admin",
      progress: null,
      status: staffMeMock.data.status,
      sales_requests: true,
      purchase_requests: true,
      developer_requests: true,
      rental_requests: true,
      consultation_requests: true,
      installment_requests: true,
      phone_number: staffMeMock.data.phone || "",
      orders_number: 0,
      av_time_res: null,
    },
  };
};
