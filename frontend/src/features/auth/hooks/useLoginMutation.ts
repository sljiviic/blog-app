import { useMutation } from "@tanstack/react-query";
import authService from "../api/auth";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
    },
  });
};
