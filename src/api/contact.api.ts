import apiClient from "@/lib/apiClient";
import { IContactPayload } from "@/types/contact.type";

export const createContactApi = async (payload: IContactPayload) => {
  return await apiClient("/contacts", {
    method: "POST",
    body: payload,
  });
};
