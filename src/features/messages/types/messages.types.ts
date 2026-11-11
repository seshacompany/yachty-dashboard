export type TicketStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";

export type TicketCategory =
  | "ACCOUNT"
  | "PROPERTY"
  | "PAYMENT"
  | "SUBSCRIPTION"
  | "TECHNICAL"
  | "COMPLAINT"
  | "OTHER";

export type TicketPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type CommunicationChannel = "EMAIL" | "WHATSAPP";

export type SortOrder = "ASC" | "DESC";

export type TicketItem = {
  id: string;
  ticketNumber: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  subject: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  message: string;
  closedAt: string | null;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
};

// Aliases for compatibility
export type messagesType = TicketItem;
export type reviewItemType = {
  id: string;
  image: string;
  name: string;
  position: string;
  stars: number;
  description: string;
  status: "pending" | "active" | "inactive" | "suspended" | "deleted";
  createdAt: string;
  updatedAt: string;
};

export type PaginationMeta = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type TicketsData = {
  items: TicketItem[];
  meta: PaginationMeta;
};

export type PaginatedResponse<T> = {
  success: boolean;
  message: string;
  data: {
    items: T[];
    meta: PaginationMeta;
  };
};

export type TicketsApiResponse = PaginatedResponse<TicketItem>;

export type SingleTicketApiResponse = {
  success: boolean;
  message: string;
  data: TicketItem;
};

export type UpdateStatusPayload = {
  status: TicketStatus;
};

export type SendMessagePayload = {
  channel: CommunicationChannel;
  message: string;
};

export type MessagesQueryParams = {
  search?: string;
  status?: TicketStatus;
  category?: TicketCategory;
  priority?: TicketPriority;
  sortOrder?: SortOrder;
  page?: number;
  limit?: number;
};

export type TicketActionResponse = {
  success: boolean;
  message: string;
  data?: unknown;
};
