import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { ErrorMessage, OAuthButton, PasswordInput } from "../components";
import { useAppDispatch } from "./../app/hooks";
import { login } from "../features/userSlice";
const schema = z.object({
  email: z.string().email().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});
export type SigninForm = z.infer<typeof schema>;
const Signin = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SigninForm>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (formData: SigninForm) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (response.status === 200) {
      dispatch(login(data.data));
      navigate("/home");
    } else {
      setError("root", { message: data.message });
    }
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
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

            <div className="form-control mt-6">
              <button disabled={isSubmitting} className="btn btn-primary">
                {isSubmitting ? (
                  <span className="loading loading-bars loading-sm"></span>
                ) : (
                  "Sign in"
                )}
              </button>
              <OAuthButton />
              <span className="mt-1 text-bold">
                Don't have an account?{" "}
                <Link className="underline" to="/sign-up">
                  Sign up
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

export default Signin;
