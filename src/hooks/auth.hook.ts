import { useMutation, useQuery } from "@tanstack/react-query";
import {
  forgotPasswordApi,
  getMe,
  googleOAuth,
  loginUser,
  resetPasswordApi,
  userLogout,
  userRegistraition,
  verifyAccount,
} from "@/api/auth.api";

export const useRegistration = () => {
  return useMutation({
    mutationFn: userRegistraition,
  });
};

export const useVerifyAccount = () => {
  return useMutation({
    mutationFn: verifyAccount,
  });
};

export const useLoginUser = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};

export const useLogoutUser = () => {
  return useMutation({
    mutationFn: userLogout,
  });
};

export const useGoogleOAuth = () => {
  return useMutation({
    mutationFn: googleOAuth,
  });
};

export function useGetMe() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    retry: false,
  });
}



export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPasswordApi,
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPasswordApi,
  });
};