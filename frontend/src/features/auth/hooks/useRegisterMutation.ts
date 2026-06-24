import { useMutation } from "@tanstack/react-query";
import authService from "../api/auth";

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
    },
  });
};
