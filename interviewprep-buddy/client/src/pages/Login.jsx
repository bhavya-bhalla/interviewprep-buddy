import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // use login from context

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:7000/api/auth/login", {
      email,
      password,
    });

    const userData = {
      token: res.data.token,
      user: {
        _id: res.data._id,
        email: res.data.email,
        name: res.data.name,
      },
    };

    // Save both for compatibility
    localStorage.setItem("token", res.data.token); // ⬅️ for existing code relying on it
    localStorage.setItem("user", JSON.stringify(userData));
    login(userData); // ⬅️ updates context

    navigate("/dashboard");
  } catch (err) {
    console.error("Login Error:", err);
    alert("Login failed");
  }
};


  return (
    <div className="flex items-center justify-center h-[80vh]">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md p-8 rounded-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-blue-700">
          Login
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
