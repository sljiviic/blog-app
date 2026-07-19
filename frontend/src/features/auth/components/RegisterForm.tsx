import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUserSchema, type RegisterUserDTO } from "../types/auth.types";
import { useRegisterMutation } from "../hooks/useAuth";
import Input from "../../../components/Input";
import { LuLock, LuMail } from "react-icons/lu";
import { useNavigate } from "react-router";
import Spinner from "@/components/Spinner";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerUserSchema),
  });

  const navigate = useNavigate();
  const registerMutation = useRegisterMutation();

  const onSubmit = (credentials: RegisterUserDTO) => {
    registerMutation.mutate(credentials, { onSuccess: () => navigate("/") });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="flex gap-3 items-stretch">
        {registerMutation.isError && (
          <p className="text-sm text-danger">
            {registerMutation.error.message}
          </p>
        )}
        <Input
          type="text"
          label="First name"
          name="firstName"
          register={register}
          errors={errors}
          placeholder="John"
        />
        <Input
          type="text"
          label="Last name"
          name="lastName"
          register={register}
          errors={errors}
          placeholder="Doe"
        />
      </div>
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
      <Input
        type="password"
        label="Confirm password"
        name="confirmPassword"
        register={register}
        errors={errors}
        icon={LuLock}
        placeholder="Confirm your password"
      />
      <button
        type="submit"
        className="flex justify-center items-center w-full py-2.5 px-5 mt-2 text-center text-white font-medium text-base bg-primary rounded-lg cursor-pointer hover:bg-primary-hover disabled:bg-primary-hover disabled:cursor-not-allowed transition-colors"
        disabled={registerMutation.isPending}
      >
        {registerMutation.isPending ? (
          <Spinner className="w-5 h-5 border-2 text-white" />
        ) : (
          "Register"
        )}
      </button>
    </form>
  );
};

export default RegisterForm;
