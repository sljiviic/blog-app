import { type IconType } from "react-icons";
import {
  useState,
  type ComponentPropsWithoutRef,
  type HTMLInputTypeAttribute,
} from "react";
import type {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { twMerge } from "tailwind-merge";

type InputProps<T extends FieldValues> = ComponentPropsWithoutRef<"input"> & {
  type: HTMLInputTypeAttribute;
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  icon?: IconType;
  className?: string;
};

const Input = <T extends FieldValues>({
  type,
  label,
  name,
  register,
  errors,
  icon: Icon,
  className,
  ...rest
}: InputProps<T>) => {
  const [showPassword, setShowPassowrd] = useState(false);
  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-heading mb-2"
      >
        {label}
      </label>

      {/* Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {Icon && <Icon className="stroke-[1.5] h-5 w-5 text-muted" />}
        </div>
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          id={name}
          {...register(name)}
          className={twMerge(
            "block w-full rounded-lg ring-1 ring-border-strong py-3",
            Icon ? "pl-10" : "pl-3",
            type === "password" ? "pr-10" : "pr-3",
            "text-heading font-semibold placeholder-muted transition-shadow focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm",
            className,
          )}
          {...rest}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => {
              setShowPassowrd((prev) => !prev);
            }}
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
          >
            {showPassword ? (
              <LuEyeOff className="stroke-[1.5] h-5 w-5 text-muted" />
            ) : (
              <LuEye className="stroke-[1.5] h-5 w-5 text-muted" />
            )}
          </button>
        )}
      </div>

      {/* Error */}
      {errorMessage && (
        <p className="text-sm text-danger mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
