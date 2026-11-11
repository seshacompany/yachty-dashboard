import type { UpdateOrderType } from "../schemas/update.order";

export const updateOrder = async (id: string, orderData: UpdateOrderType) => {
  return {
    success: true,
    message: "تم تحديث الطلب بنجاح",
    data: { id, ...orderData },
  };
};
