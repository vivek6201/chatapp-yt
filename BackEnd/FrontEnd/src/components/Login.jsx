import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "./context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
function Login() {
  const [authUser, setAuthUser] = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    // console.log(userInfo);
    await axios
      .post("/api/auth/login", userInfo)
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          toast.success("Logged in successful");

          localStorage.setItem("ChatUser", JSON.stringify(response.data.user));
          setAuthUser(response.data.user);
        }
      })
      .catch((err) => {
        if (err.response) {
          toast.error("Error: " + err.response.data.error);
        }
      });
  };
  return (
    <>
      <div>
        <div className="flex h-screen justify-center items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            action=""
            className="space-y-3 border rounded-lg  px-6 py-2 min-w-96"
          >
            <p className="text-center text-2xl">
              Text <span className="text-green-500 font-bold">App</span>
            </p>
            <h1 className="text-white font-bold text-xl">Login</h1>
            <br />
            {/* Email field */}
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="email"
                className="grow"
                placeholder="Email"
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
                {...register("password", { required: true })}
              />
            </label>
            {errors.password && <span>This field is required</span>}

            <div className="flex justify-between px-3">
              <p>
                New user?{" "}
                <Link
                  to="/register"
                  className="text-blue-500 underline cursor-pointer"
                >
                  Signup
                </Link>
              </p>
              <button className=" bg-green-500 text-white rounded-lg px-3 py-1">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
