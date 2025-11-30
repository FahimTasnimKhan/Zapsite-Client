import { useForm } from "react-hook-form";
import UseAuth from "../../../hooks/UseAuth";
import { Link, Navigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser, user } = UseAuth();
  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((res) => console.log(res.user))
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
        <h3 className="text-3xl text-center">Welcome Back</h3>
        <p className="text-center">Please Login</p>
        <fieldset className="fieldset">
          {/* Email field */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true, maxLength: 20 })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p role="alert" className="text-red-500">
              Email is required
            </p>
          )}
          {/* Password field */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
              maxLength: {
                value: 20,
                message: "Password cannot be more than 20 characters",
              },
              minLength: {
                value: 6,
                message: "Password must be more than 6 characters",
              },
            })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p role="alert" className="text-red-500">
              Password is required
            </p>
          )}
          {errors.password?.type === "minLength" && (
            <p role="alert" className="text-red-500">
              Password must be more than 6 characters
            </p>
          )}
          {errors.password?.type === "maxLength" && (
            <p role="alert" className="text-red-500">
              Password must be less than 20 characters
            </p>
          )}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
        <p>
          New to Zap Shift{" "}
          <Link className="text-blue-500" to={"/register"}>
            Register Now
          </Link>
        </p>
        <SocialLogin></SocialLogin>
      </form>
      {user ? <Navigate to={"/"}></Navigate> : ""}
    </div>
  );
};

export default Login;
