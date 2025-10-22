import React, { useState } from "react";
import { loginUser } from "../services/AuthService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";
import { saveLoginData } from "../services/LocaStorageSrevice";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

function Login() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { setUser, setAccessToken } = useAuthContext();
  const navigate = useNavigate();

  const submitData = async (event) => {
    event.preventDefault();
    if (loginData.email.trim() === "") {
      toast.error("Email required!!");
      return;
    }
    if (loginData.password.trim() === "") {
      toast.error("Password required!!");
      return;
    }

    try {
      const responseData = await loginUser(loginData);
      saveLoginData(responseData);
      setUser(responseData.user);
      setAccessToken(responseData.accessToken);
      toast.success("Login success");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      if (error.status === 403) toast.error(error.response.data.message);
      else toast.error("Error in login");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 ">
      {/* Login Card */}
      <div
        className="w-[350px] sm:w-[400px] md:w-[450px] lg:w-[500px]
                   shadow-2xl rounded-2xl p-10 bg-zinc-100 border-t-4 border-blue-900 hover:scale-102"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 hover:scale-102">
          Login Here
        </h1>

        <form noValidate onSubmit={submitData}>
          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              type="email"
              name="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="mt-2 relative">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              type={showPassword ? "text" : "password"}
              name="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
              placeholder="Enter your password"
              required
            />

            {/* 👁️ Eye icon */}
            <span
              className="absolute right-3 top-[38px] cursor-pointer text-gray-600 hover:text-blue-600 select-none"
              onMouseDown={() => setShowPassword(true)}
              onMouseUp={() => setShowPassword(false)}
              onMouseLeave={() => setShowPassword(false)}
              onTouchStart={() => setShowPassword(true)}
              onTouchEnd={() => setShowPassword(false)}
            >
              {showPassword ? (
                <MdVisibilityOff size={20} />
              ) : (
                <MdVisibility size={20} />
              )}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-2 mt-4">
            <button
              type="submit"
              className="bg-blue-700 text-white px-4 rounded py-2 hover:bg-blue-600 transition hover:scale-105 cursor-pointer"
            >
              Login
            </button>
            <button
              type="button"
              className="bg-orange-700 text-white px-4 rounded py-2 hover:bg-orange-600 transition hover:scale-105 cursor-pointer"
              onClick={() => setLoginData({ email: "", password: "" })}
            >
              Reset
            </button>
          </div>
          {/* Signup redirect line */}
<div className="flex justify-center mt-4">
  <p className="text-gray-600 text-sm">
    Don’t have an account?{" "}
    <span
      onClick={() => navigate("/signup")}
      className="text-indigo-600 hover:underline cursor-pointer font-medium"
    >
      Sign up
    </span>
  </p>
</div>
        </form>
      </div>
    </div>
  );
}

export default Login;
