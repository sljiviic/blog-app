import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUserSchema, type LoginUserDTO } from "../types/auth.types";
import Input from "../../../components/Input";
import { LuLock, LuMail } from "react-icons/lu";
import { useLoginMutation } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import Spinner from "@/components/Spinner";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(loginUserSchema),
  });

  const navigate = useNavigate();
  const loginMutation = useLoginMutation();

  const onSubmit = (credentials: LoginUserDTO) => {
    loginMutation.mutate(credentials, {
      onSuccess: () => {
        reset();
        navigate("/");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {loginMutation.isError && (
        <p className="text-sm text-danger">{loginMutation.error.message}</p>
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
        className="flex justify-center items-center w-full py-2.5 px-5 mt-2 text-center text-white font-medium text-base bg-primary rounded-lg cursor-pointer hover:bg-primary-hover disabled:bg-primary-hover disabled:cursor-not-allowed transition-colors"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? (
          <Spinner className="w-5 h-5 border-2 text-white" />
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
