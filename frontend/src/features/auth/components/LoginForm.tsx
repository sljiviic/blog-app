import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUserSchema, type LoginUserDTO } from "../types/auth.types";
import Input from "./Input";
import { LuLock, LuMail } from "react-icons/lu";
import { useLoginMutation } from "../hooks/useLoginMutation";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(loginUserSchema),
  });

  const loginMutation = useLoginMutation();

  const onSubmit = (credentials: LoginUserDTO) => {
    loginMutation.mutate(credentials, { onSuccess: () => reset() });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {loginMutation.isError && (
        <p className="text-sm text-red-500">{loginMutation.error.message}</p>
      )}
      <Input
        type="text"
        label="Email adress"
        name="email"
        register={register}
        errors={errors}
        icon={LuMail}
        placeholder="you@example.com"
      />
      <Input
        type="password"
        label="Password"
        name="password"
        register={register}
        errors={errors}
        icon={LuLock}
        placeholder="Create a password"
      />
      <button
        type="submit"
        className="w-full py-2.5 px-5 mt-2 text-center text-white font-medium text-base bg-indigo-600 rounded-lg cursor-pointer hover:bg-indigo-700 disabled:bg-indigo-700 disabled:cursor-not-allowed transition-colors"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? "Loading..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
