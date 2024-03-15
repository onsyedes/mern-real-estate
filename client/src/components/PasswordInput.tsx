import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
type PasswordInputProps<T extends FieldValues> = {
  error: FieldError | undefined;
  register: UseFormRegister<T>;
  placeHolder: string;
  name: Path<T>;
  label: string;
};
const PasswordInput = <T extends FieldValues>({
  register,
  placeHolder,
  name,
  error,
  label,
}: PasswordInputProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordDisplay = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="form-control ">
      <label className="label">
        <span className="label-text">{label}</span>
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
