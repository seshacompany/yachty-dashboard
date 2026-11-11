import type { RestoreUserResponse } from "../types";

export const restoreUser = async (_id: string): Promise<RestoreUserResponse> => {
  return {
    success: true,
    message: "تم استعادة المستخدم بنجاح",
    data: { id: _id },
  };
};
