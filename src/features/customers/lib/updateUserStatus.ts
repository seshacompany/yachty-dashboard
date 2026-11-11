import type { UpdateUserStatusRequest, UpdateUserStatusResponse } from "../types";

export const updateUserStatus = async (
  _id: string,
  _payload: UpdateUserStatusRequest
): Promise<UpdateUserStatusResponse> => {
  return {
    success: true,
    message: "تم تحديث حالة المستخدم بنجاح",
    data: { id: _id, ..._payload },
  };
};
