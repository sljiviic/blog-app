import { useMutation } from "@tanstack/react-query";
import authService from "../api/auth";
import { useNavigate } from "react-router";

export const useAuth = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  const requireAuth = (action: () => void) => {
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }
    action();
  };

  return { isAuthenticated, requireAuth };
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
    },
  });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
    },
  });
};
