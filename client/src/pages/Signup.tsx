import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { PasswordInput, ErrorMessage } from "../components";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const schema = z
  .object({
    username: z.string().min(1, "Username is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords does not match",
  });
export type SignupForm = z.infer<typeof schema>;

const Signup = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<SignupForm> = async (formData) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            email: formData.email,
            password: formData.password,
            username: formData.username,
          },
        }),
      });
      const data = await response.json();

      if (response.status === 200) {
        toast("A validation link is sent to your Email.  🐱‍🏍", {
          position: "top-right",
        });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setError("root", { message: error?.message });
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Signup now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                {...register("username")}
                type="text"
                placeholder="username"
                className="input input-bordered"
              />
              {errors.username && (
                <ErrorMessage message={errors.username?.message} />
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email")}
                placeholder="email"
                className={`input input-bordered + ${
                  errors.email && "input-error"
                }`}
              />
            </div>
            {errors.email && <ErrorMessage message={errors.email?.message} />}
            <PasswordInput
              error={errors.password}
              register={register}
              name="password"
              placeHolder="Password"
            />

            <PasswordInput
              error={errors.confirmPassword}
              register={register}
              name="confirmPassword"
              placeHolder="Confirm password"
            />

            <div className="form-control mt-6">
              <button disabled={isSubmitting} className="btn btn-primary">
                {isSubmitting ? (
                  <span className="loading loading-bars loading-sm"></span>
                ) : (
                  "Sign up"
                )}
              </button>
              <span className="mt-1 text-bold">
                Have an account?{" "}
                <Link className="underline" to="/sign-in">
                  Sign in
                </Link>
              </span>
            </div>
            {errors.root && <ErrorMessage message={errors.root?.message} />}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
