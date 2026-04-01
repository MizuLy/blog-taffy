import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import axios from "axios";

const API = "http://localhost:8880/api/auth/register";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(API, { name, email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex justify-around items-center bg-black px-52">
      <div className="flex justify-center items-center ">
        <img
          src="/Taffy-nobg.png"
          alt=""
          className="max-w-xl h-screen object-cover"
        />
      </div>
      <div className="bg-black rounded-2xl shadow-2xl shadow-gray-700 p-8 w-full max-w-md">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome To Taffy
          </h1>
          <p className="text-gray-500">Register to continue to Taffy</p>
        </div>

        {/* Form */}
        <form className="space-y-3" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-100 mb-2"
            >
              Name
            </label>
            <input
              type="name"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your username"
              required
              className="focus:outline-none w-full px-4 py-2 placeholder-gray-500 text-white bg-gray-800 border-gray-500 border rounded-lg focus:ring-2 focus:ring-gray-300 focus:shadow-md focus:shadow-white focus:border-transparent transition"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-100 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="focus:outline-none w-full px-4 py-2 placeholder-gray-500 text-white bg-gray-800 border-gray-500 border rounded-lg focus:ring-2 focus:ring-gray-300 focus:shadow-md focus:shadow-white focus:border-transparent transition"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-100 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="focus:outline-none w-full px-4 py-2 placeholder-gray-500 text-white bg-gray-800 border-gray-500 border rounded-lg focus:ring-2 focus:ring-gray-300 focus:shadow-md focus:shadow-white focus:border-transparent transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <IoMdEye size={25} />
                ) : (
                  <IoMdEyeOff size={25} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-300 text-sm mt-6">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-white font-semibold hover:underline hover:text-gray-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
