import apiClient from "@/lib/apiClient";
import {
  IForgotPasswordPayload,
  IResetPasswordPayload,
  LoginPayload,
  RegisterPayload,
  VerifyAccountPayload,
} from "@/types/auth.type";

export const userRegistraition = async (payload: RegisterPayload) => {
  return await apiClient("/auth/register", {
    method: "POST",
    body: payload,
  });
};

export const verifyAccount = async (payload: VerifyAccountPayload) => {
  return await apiClient("/auth/verify-email", {
    method: "POST",
    body: payload,
  });
};

export const loginUser = async (payload: LoginPayload) => {
  return await apiClient("/auth/login", {
    method: "POST",
    body: payload,
  });
};

export const userLogout = async () => {
  return await apiClient("/auth/logout", {
    method: "POST",
  });
};

export const getMe = async () => {
  return await apiClient("/users/me");
};

export const googleOAuth = async (payload: { idToken: string }) => {
  return await apiClient("/auth/google", {
    method: "POST",
    body: payload,
  });
};

export const forgotPasswordApi = async (payload: IForgotPasswordPayload) => {
  return await apiClient("/auth/forgot-password", {
    method: "POST",
    body: payload,
  });
};

export const resetPasswordApi = async (payload: IResetPasswordPayload) => {
  return await apiClient("/auth/reset-password", {
    method: "POST",
    body: payload,
  });
};