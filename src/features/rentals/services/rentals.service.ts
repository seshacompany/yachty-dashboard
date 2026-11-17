import { Axios } from "@/lib/axios";
import { getAccessToken } from "@/lib/tokenStorage";
import type {
  GetRentalsParams,
  RentalDecisionPayload,
  RentalDecisionResponse,
  RentalsResponse,
} from "../types";

const getAuthHeaders = () => {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : undefined;
};

const buildRentalsQueryParams = (params: GetRentalsParams) => {
  const clean: Record<string, string | number> = {};
  if (params.page) clean.page = params.page;
  if (params.limit) clean.limit = params.limit;
  if (params.brand?.trim()) clean.brand = params.brand.trim();
  if (params.location?.trim()) clean.location = params.location.trim();
  if (params.status) clean.status = params.status;
  return clean;
};

export const getRentals = async (
  params: GetRentalsParams = {},
): Promise<RentalsResponse> => {
  const response = await Axios.get<RentalsResponse>("/admin/rentals", {
    params: buildRentalsQueryParams(params),
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const updateRentalDecision = async (
  id: string,
  payload: RentalDecisionPayload,
): Promise<RentalDecisionResponse> => {
  const response = await Axios.patch<RentalDecisionResponse>(
    `/admin/rentals/${id}/decision`,
    payload,
    { headers: getAuthHeaders() },
  );
  return response.data;
};
