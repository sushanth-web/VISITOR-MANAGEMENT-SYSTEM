import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/admin/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>

        <input
          className="w-full px-4 py-3 rounded bg-gray-100 border mb-4"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full px-4 py-3 rounded bg-gray-100 border mb-4"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-500 text-white py-3 rounded hover:bg-indigo-700"
        >
          Login
        </button>

        <div className="text-center mt-4 text-sm">
          <Link to="/forgot-password" className="text-indigo-600">
            Forgot Password?
          </Link>
        </div>

        <div className="text-center mt-2 text-sm">
          <Link to="/signup" className="text-indigo-600">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}