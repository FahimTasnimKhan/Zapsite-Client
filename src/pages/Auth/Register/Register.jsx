import React from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../../hooks/UseAuth";
import { Link } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser } = UseAuth();

  const handleRegistration = (data) => {
    console.log("Data:", data);
    registerUser(data.email, data.password)
      .then((res) => {
        console.log(res.user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  return (
    <div className="my-20">
      <form onSubmit={handleSubmit(handleRegistration)}>
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h3 className="text-3xl text-center">Welcome To Zap Shift</h3>
            <p className="text-center">Please Register Your Account</p>
            <fieldset className="fieldset">
              {/* Email */}
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="input"
                placeholder="Email"
              />
              {errors.email && (
                <p role="alert" className="text-red-500 text-sm">
                  {errors.email.message}
                </p>
              )}

              {/* Password */}
              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  maxLength: {
                    value: 10,
                    message: "Password cannot exceed 10 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                  },
                })}
                aria-invalid={errors.password ? "true" : "false"}
                className="input"
                placeholder="Password"
              />

              {errors.password && (
                <p role="alert" className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p role="alert" className="text-red-500">
                  Password must have at least one upper character, one lower
                  character, one number and at least one special character
                </p>
              )}

              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>

              <button className="btn btn-neutral mt-4">Register</button>
            </fieldset>
            <p>
              Already Have an Account?
              <Link className="text-blue-500" to={"/login"}>
                Login
              </Link>
            </p>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
