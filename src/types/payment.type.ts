export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "CANCELLED";

export interface IPaymentUser {
  id: string;
  name: string;
  email: string;
}

export interface IPayment {
  id: string;
  amount: number;
  transactionId: string;
  status: PaymentStatus;
  paymentMethod?: string | null;
  serviceRequestId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user?: IPaymentUser;
  serviceRequest?: {
    id?: string;
    title: string;
    category?: string;
  };
}

export interface PaymentResponse {
  success: boolean;
  statusCode?: number;
  message?: string;
  data: IPayment[];
}