import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { SignupForm } from "../pages/Signup";
import ErrorMessage from "./ErrorMessage";
import { SigninForm } from "../pages/Signin";
type PasswordInputProps = {
  error: FieldError | undefined;
  register: UseFormRegister<SignupForm | SigninForm>;
  placeHolder: string;
  name: Exclude<keyof SignupForm, "email" | "username"> | keyof SigninForm;
};
const PasswordInput = ({
  register,
  placeHolder,
  name,
  error,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordDisplay = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="form-control ">
      <label className="label">
        <span className="label-text">Password</span>
      </label>
      <label
        className={`input input-bordered flex items-center gap-2 ${
          error && "input-error"
        }`}
      >
        <input
          {...register(name)}
          type={showPassword ? "text" : "password"}
          className="grow "
          placeholder={placeHolder}
        />
        {showPassword ? (
          <Eye onClick={togglePasswordDisplay} />
        ) : (
          <EyeOff onClick={togglePasswordDisplay} />
        )}
      </label>
      {error && <ErrorMessage message={error?.message} />}
    </div>
  );
};

export default PasswordInput;
