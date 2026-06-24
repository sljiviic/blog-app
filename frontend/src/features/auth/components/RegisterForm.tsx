import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUserSchema, type RegisterUserDTO } from "../types/auth.types";
import { useRegisterMutation } from "../hooks/useRegisterMutation";
import Input from "./Input";
import { LuLock, LuMail } from "react-icons/lu";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerUserSchema),
  });

  const registerMutation = useRegisterMutation();

  const onSubmit = (credentials: RegisterUserDTO) => {
    registerMutation.mutate(credentials);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="flex gap-3 items-stretch">
        {registerMutation.isError && (
          <p className="text-sm text-red-500">
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
        className="w-full py-2.5 px-5 mt-2 text-center text-white font-medium text-base bg-indigo-600 rounded-lg cursor-pointer hover:bg-indigo-700 disabled:bg-indigo-700 disabled:cursor-not-allowed transition-colors"
        disabled={registerMutation.isPending}
      >
        {registerMutation.isPending ? "Loading..." : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm;
