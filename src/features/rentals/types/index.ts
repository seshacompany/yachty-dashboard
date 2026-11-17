export type RentalStatus = "pending" | "approved" | "rejected" | "suspended";

export type RentalDecisionStatus = "approved" | "rejected" | "suspended";

export type RentalMedia = {
  url: string;
  public_id: string;
};

export type RentalOwnerProfile = {
  full_name: string;
  address: string | null;
  identity_documents_submitted: boolean;
};

export type RentalOwnerCompany = {
  company_name: string;
  registration_number: string | null;
  address: string | null;
  identity_documents_submitted: boolean;
};

export type RentalOwner = {
  id: string;
  role: string;
  admin_type: string | null;
  email: string;
  phone: string | null;
  status: string;
  email_verified: boolean;
  email_verified_at: string | null;
  approved_at: string | null;
  suspended_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  profile: RentalOwnerProfile | null;
  company: RentalOwnerCompany | null;
};

export type RentalItem = {
  id: string;
  owner_user_id: string;
  status: RentalStatus | string;
  approved_by: string | null;
  approved_at: string | null;
  rejection_reason: string | null;
  published_at: string | null;
  boat_type: string;
  brand: string;
  model: string;
  year_built: number;
  max_passengers: number;
  length_ft: number;
  engine_count: number;
  horsepower_per_engine: number;
  cruising_speed_knots: number;
  cabins: number;
  heads: number;
  location: string;
  description: string | null;
  media: RentalMedia[];
  equipment_features: string[];
  daily_price: number;
  currency: string;
  captain_included: boolean;
  fuel_included: boolean;
  departure_point: string | null;
  deposit_type: string | null;
  deposit_value: number | null;
  deposit_currency: string | null;
  created_at: string;
  updated_at: string;
  boat_license_images_submitted: boolean;
  boat_license_images: RentalMedia[];
  owner: RentalOwner;
};

export type RentalsMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
};

export type RentalsResponse = {
  success: boolean;
  message: string;
  data: RentalItem[];
  meta: RentalsMeta;
};

export type GetRentalsParams = {
  page?: number;
  limit?: number;
  brand?: string;
  location?: string;
  status?: RentalStatus;
};

export type RentalDecisionPayload = {
  status: RentalDecisionStatus;
  rejection_reason?: string;
};

export type RentalDecisionResponse = {
  success: boolean;
  message: string;
  data?: RentalItem;
};

export function getRentalOwnerName(owner?: RentalOwner | null): string {
  if (!owner) return "—";
  if (owner.company?.company_name) return owner.company.company_name;
  if (owner.profile?.full_name) return owner.profile.full_name;
  return owner.email || "—";
}
