import { UserRoundX } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage, Loading, PasswordInput } from "..";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import useFetch from "../../app/custom-hooks/useFetch";
import { User } from "../../../types";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/userSlice";
import { useAppDispatch } from "../../app/hooks";
const schema = z
  .object({
    oldPassword: z.string().min(1, "Required field"),
    newPassword: z
      .string()
      .min(8, "Password should have at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password should have at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
type ChangePasswordForm = z.infer<typeof schema>;
type AccountInfoFormProps = {
  user: User | null;
};
const AccountInfoForm = ({ user }: AccountInfoFormProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { fetchData } = useFetch<{ message: string }>();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordForm>({ resolver: zodResolver(schema) });

  const onFormSubmit = async (data: ChangePasswordForm) => {
    const url = `/api/users/update/${user?._id}`;
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      }),
    };

    const { error: fetchError } = await fetchData(url, options);

    if (fetchError) {
      setError("root", { message: fetchError.message });
    } else {
      toast("Password updated succefully ✔", {
        position: "top-right",
      });
    }
  };

  const onDeleteAccount = async () => {
    const url = `/api/users/delete/${user?._id}`;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { error: fetchError } = await fetchData(url, options);

    if (fetchError) {
      setError("root", { message: fetchError.message });
    } else {
      dispatch(logout());
      navigate("/sign-in");
    }
  };
  return (
    <React.Fragment>
      <form className="card-body" onSubmit={handleSubmit(onFormSubmit)}>
        <PasswordInput
          register={register}
          placeHolder="************"
          name="oldPassword"
          error={errors.oldPassword}
          label="Current Password"
        />

        <PasswordInput<ChangePasswordForm>
          register={register}
          placeHolder="************"
          name="newPassword"
          error={errors.newPassword}
          label="New Password"
        />

        <PasswordInput<ChangePasswordForm>
          register={register}
          placeHolder="************"
          name="confirmPassword"
          error={errors.confirmPassword}
          label="Confirm Password"
        />
        {errors.root && <ErrorMessage message={errors.root.message} />}
        <div className="form-control mt-6">
          <button
            disabled={isSubmitting}
            className="btn btn-outline btn-primary "
          >
            {isSubmitting ? <Loading /> : "Confirm"}
          </button>
        </div>
      </form>
      <a
        className="text-red-600 flex cursor-pointer hover:text-red-800"
        onClick={onDeleteAccount}
      >
        <UserRoundX className="mx-2 hover:underline" /> Delete Account
      </a>
    </React.Fragment>
  );
};

export default AccountInfoForm;
