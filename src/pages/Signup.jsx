import React, { useState } from "react";
import { createUser } from "../services/UserService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState([]);
  const [creating, setCreating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setCreating(true);
    setErrors([]);

    try {
      const response = await createUser(formData);
      toast.success("User is created Successfully..");
      setFormData({ username: "", email: "", password: "", confirmPassword: "" });
      setCreating(false);
      navigate("/login");
    } catch (error) {
      if (error.status === 400) {
        setErrors(error.response.data);
        toast.error("Validation error");
      } else {
        toast.error("Server error");
      }
      setCreating(false);
    }
  };

  const passwordMismatch = formData.confirmPassword && formData.password !== formData.confirmPassword;

  return (
    <div className="signup-container flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div
        className="w-[350px] sm:w-[450px] md:w-[500px] lg:w-[550px] lg:mt-20
                   shadow-lg rounded-2xl p-8 bg-zinc-100 border-t-4 border-blue-900
                   transition-all hover:scale-103"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 hover:scale-103">
          Create Your Account
        </h2>

        {/* Display API validation errors */}
        {errors.length > 0 && (
          <div className="py-3">
            {errors.map((error, idx) => (
              <div key={idx} className="p-2 border-red-300 mb-2 border rounded">
                <p className="text-red-400">
                  {error.property.toUpperCase()}: {error.errorValue}
                </p>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 pr-10"
              placeholder="Enter a strong password"
              required
            />
            <span
              className="absolute right-3 top-[38px] cursor-pointer text-gray-600 hover:text-blue-600 select-none"
              onMouseDown={() => setShowPassword(true)}
              onMouseUp={() => setShowPassword(false)}
              onMouseLeave={() => setShowPassword(false)}
              onTouchStart={() => setShowPassword(true)}
              onTouchEnd={() => setShowPassword(false)}
            >
              {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-gray-700 mb-1">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 pr-10"
              placeholder="Re-enter your password"
              required
            />
            <span
              className="absolute right-3 top-[38px] cursor-pointer text-gray-600 hover:text-blue-600 select-none"
              onMouseDown={() => setShowConfirmPassword(true)}
              onMouseUp={() => setShowConfirmPassword(false)}
              onMouseLeave={() => setShowConfirmPassword(false)}
              onTouchStart={() => setShowConfirmPassword(true)}
              onTouchEnd={() => setShowConfirmPassword(false)}
            >
              {showConfirmPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
            </span>
            {/* Inline warning if passwords do not match */}
            {passwordMismatch && (
              <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
            )}
          </div>

          {/* Submit */}
          <div className="flex flex-col items-center mt-4">
            <button
              disabled={creating}
              type="submit"
              className="disabled:bg-gray-300 w-30 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 hover:scale-103 transition duration-300 cursor-pointer"
            >
              {creating ? "Creating user.." : "Sign Up"}
            </button>
          </div>
          {/* Already have an account */}
<div className="flex justify-center mt-4">
  <p className="text-gray-600 text-sm">
    Already have an account?{" "}
    <span
      onClick={() => navigate("/login")}
      className="text-indigo-600 hover:underline cursor-pointer font-medium"
    >
      Login
    </span>
  </p>
</div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
