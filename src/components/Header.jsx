import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Menu, X } from "lucide-react";
import logo from "../assets/expenses.png";
import { useAuthContext } from "../context/AuthContext";
import { FaUser } from "react-icons/fa";

function Header() {
  const { user, logoutUser } = useAuthContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Brand Name */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src={logo}
              alt="Pocket Guard Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 transition-shadow duration-300 hover:drop-shadow-[0_2px_10px_rgba(255,255,255,0.7)]"
            />
            <h1
              className="text-2xl sm:text-3xl font-serif font-bold tracking-wide
              bg-gradient-to-r from-cyan-200 via-white to-cyan-400 bg-clip-text text-transparent hover:drop-shadow-[0_2px_10px_rgba(255,255,255,0.7)]"
            >
              Pocket Guard
            </h1>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6">
            <Link
              to="/dashboard"
              className="text-white hover:text-gray-200 transition-transform transform hover:scale-105 duration-200"
            >
              Dashboard
            </Link>
            <Link
              to="/reports"
              className="text-white hover:text-gray-200 transition-transform transform hover:scale-105 duration-200"
            >
              Reports
            </Link>
            <Link
              to="/categories"
              className="text-white hover:text-gray-200 transition-transform transform hover:scale-105 duration-200"
            >
              Categories
            </Link>
            <Link
              to="/settings"
              className="text-white hover:text-gray-200 transition-transform transform hover:scale-105 duration-200"
            >
              Settings
            </Link>
          </nav>

          {/* Desktop Auth Section */}
          {!user ? (
            <div className="hidden md:flex space-x-4">
              <Link
                to="/login"
                className="my-auto text-white hover:text-gray-200 transition-transform hover:scale-105 duration-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
              >
                Signup
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              {/* Avatar + Username */}
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => navigate("/dashboard/user-profile")}
              >
                {user.avatar ? (
                            <img
                              src={user.avatar}
                              alt="Profile"
                              className="w-11 h-11 rounded-full border-4 border-blue-400 object-cover shadow-md"
                            />
                          ) : (
                            <div className="w-11 h-11 flex items-center justify-center rounded-full border-4 border-blue-400 bg-gray-700 shadow-md">
                              <FaUser className="text-2xl text-gray-300" />
                            </div>
                          )}
                <span className="text-white font-medium">
                  {user.username || user.name || "User"}
                </span>
              </div>

              {/* Logout Button */}
              <button
                onClick={logoutUser}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          )}

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-blue-950 via-blue-900 to-blue-800 shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden z-50 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setMenuOpen(false)}>
            <X size={28} className="text-white cursor-pointer" />
          </button>
        </div>

        <div className="flex flex-col items-start px-6 space-y-4">
          <Link
            to="/dashboard"
            className="text-white hover:text-gray-200 transition"
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/reports"
            className="text-white hover:text-gray-200 transition"
            onClick={() => setMenuOpen(false)}
          >
            Reports
          </Link>
          <Link
            to="/categories"
            className="text-white hover:text-gray-200 transition"
            onClick={() => setMenuOpen(false)}
          >
            Categories
          </Link>
          <Link
            to="/settings"
            className="text-white hover:text-gray-200 transition"
            onClick={() => setMenuOpen(false)}
          >
            Settings
          </Link>

          {/* Mobile Auth */}
          {!user ? (
            <>
              <Link
                to="/login"
                className="text-white hover:text-gray-200 transition"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition w-full text-center"
                onClick={() => setMenuOpen(false)}
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <div
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/dashboard/user-profile");
                }}
              >
                {user.avatar ? (
                            <img
                              src={user.avatar}
                              alt="Profile"
                              className="w-10 h-10 rounded-full border-4 border-blue-400 object-cover shadow-md"
                            />
                          ) : (
                            <div className="w-10 h-10 flex items-center justify-center rounded-full border-4 border-blue-400 bg-gray-700 shadow-md">
                              <FaUser className="text-5xl text-gray-300" />
                            </div>
                          )}
                <span className="text-white font-medium">
                  {user.username || user.name || "User"}
                </span>
              </div>

              <button
                onClick={() => {
                  logoutUser();
                  setMenuOpen(false);
                }}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition w-full text-center cursor-pointer"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
