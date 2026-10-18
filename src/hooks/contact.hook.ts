import { useMutation } from "@tanstack/react-query";
import { createContactApi } from "@/api/contact.api";
import { IContactPayload } from "@/types/contact.type";

export const useCreateContact = () => {
  return useMutation({
    mutationFn: (payload: IContactPayload) => createContactApi(payload),
  });
};