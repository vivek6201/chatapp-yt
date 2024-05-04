import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "./context/AuthProvider";
import { Link } from "react-router-dom";
function Register() {
  const [authUser, setAuthUser] = useAuth();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Watch the 'password' and 'confirmPassword' fields
  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  // Custom validation rule to check if passwords match
  const validatePasswordMatch = (value) => {
    return value === password || "Passwords do not match";
  };

  const onSubmit = async (data) => {
    const userInfo = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    // console.log(userInfo);
    await axios
      .post("/api/auth/signup", userInfo)
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          alert("Signup successful");
        }
        localStorage.setItem("ChatUser", JSON.stringify(response.data));
        setAuthUser(response.data);
      })
      .catch((err) => {
        if (err.response) {
          alert("Error: " + err.response.data.error);
        }
      });
  };
  return (
    <>
      <div>
        <div className="flex h-screen items-center justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            action=""
            className="space-y-3 border rounded-lg px-6 py-2 min-w-96"
          >
            <p className="text-center text-2xl">
              Text <span className="text-green-500 font-bold">App</span>
            </p>
            <h1 className="text-white font-bold text-xl">Signup</h1>
            <br />
            {/* Fullname field */}
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="Fullname"
                name="fullName"
                {...register("fullName", { required: true })}
              />
            </label>
            {errors.fullName && <span>This field is required</span>}

            {/* Email field */}
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="email"
                className="grow"
                placeholder="Email"
                name="email"
                {...register("email", { required: true })}
              />
            </label>
            {errors.email && <span>This field is required</span>}

            {/* password field */}
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="password"
                className="grow"
                placeholder="Password"
                name="password"
                {...register("password", { required: true })}
              />
            </label>
            {errors.password && <span>This field is required</span>}

            {/* Confirm password field */}
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="password"
                className="grow"
                placeholder="Confirm Password"
                name="confirmPassword"
                {...register("confirmPassword", {
                  required: true,
                  validate: validatePasswordMatch,
                })}
              />
            </label>
            {errors.confirmPassword && (
              <span>{errors.confirmPassword.message}</span>
            )}

            {/* button part */}
            <div className="flex justify-between px-3">
              <p>
                Have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-500 underline cursor-pointer"
                >
                  Login
                </Link>
              </p>
              <input
                type="submit"
                value="Signup"
                className=" bg-green-500 text-white rounded-lg px-3 py-1"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
