import {
  createCheckoutSession,
  getPaymentById,
  getMyPayments,
  getAllPaymentsApi,
} from "@/api/payment.api";
import { useMutation, useQuery } from "@tanstack/react-query";

//  Create Checkout Session Mutation Hook
export const useCreateCheckoutSession = () => {
  return useMutation({
    mutationFn: (serviceRequestId: string) =>
      createCheckoutSession(serviceRequestId),
  });
};

//  Get Payment By ID Hook
export const useGetPaymentById = (paymentId: string) => {
  return useQuery({
    queryKey: ["payment", paymentId],
    queryFn: () => getPaymentById(paymentId),
    enabled: !!paymentId,
  });
};

export const useGetMyPayments = () => {
  return useQuery({
    queryKey: ["MY_PAYMENTS"],
    queryFn: async () => {
      const res = await getMyPayments();
      return res;
    },
  });
};

export const useGetAllPayments = () => {
  return useQuery({
    queryKey: ["ALL_PAYMENTS"],
    queryFn: async () => {
      const res = await getAllPaymentsApi();
      return res;
    },
  });
};
