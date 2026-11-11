import type {
  MessagesQueryParams,
  SendMessagePayload,
  TicketActionResponse,
  TicketItem,
  TicketsData,
  UpdateStatusPayload,
} from "../types";
import messagesMockData from "@/data/response/response_messages.json";

export const getTickets = async (
  params: MessagesQueryParams = {}
): Promise<TicketsData> => {
  let items = [...messagesMockData.data.items];

  if (params.search) {
    const s = params.search.toLowerCase();
    items = items.filter(
      (ticket) =>
        ticket.ticketNumber?.toLowerCase().includes(s) ||
        ticket.userName?.toLowerCase().includes(s) ||
        ticket.userEmail?.toLowerCase().includes(s) ||
        ticket.subject?.toLowerCase().includes(s) ||
        ticket.message?.toLowerCase().includes(s)
    );
  }

  if (params.status) {
    items = items.filter((ticket) => ticket.status === params.status);
  }

  if (params.category) {
    items = items.filter((ticket) => ticket.category === params.category);
  }

  if (params.priority) {
    items = items.filter((ticket) => ticket.priority === params.priority);
  }

  const page = params.page ?? 1;
  const limit = params.limit ?? 10;
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / limit) || 1;
  const startIndex = (page - 1) * limit;
  const paginatedItems = items.slice(startIndex, startIndex + limit);

  return {
    items: paginatedItems as unknown as TicketItem[],
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

export const getTicketById = async (id: string): Promise<TicketItem> => {
  const found = messagesMockData.data.items.find((item) => item.id === id);
  if (found) {
    return found as unknown as TicketItem;
  }
  return messagesMockData.data.items[0] as unknown as TicketItem;
};

export const updateTicketStatus = async (
  id: string,
  payload: UpdateStatusPayload
): Promise<TicketActionResponse> => {
  return {
    success: true,
    message: "تم تحديث حالة التذكرة بنجاح",
    data: { id, ...payload } as unknown as TicketItem,
  };
};

export const sendReplyMessage = async (
  id: string,
  payload: SendMessagePayload
): Promise<TicketActionResponse> => {
  return {
    success: true,
    message: "تم إرسال الرد بنجاح",
    data: { id, ...payload } as unknown as TicketItem,
  };
};
