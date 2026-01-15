import { useState } from "react"
import api from "../services/api"

export default function Signup() {
  const [name, setName] = useState("")
  const [userName, setUserName] = useState("")
  const [mobileNo, setMobileNo] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignup = async () => {
    try {
      await api.post("/admin/signup", {
        name,
        user_name: userName,
        mobile_no: mobileNo,
        email,
        password,
      })
      alert("Account created successfully")
      window.location.href = "/"
    } catch (err) {
      alert("Signup failed: " + (err.response?.data?.message || err.message))
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>

        <input
          className="w-full px-4 py-3 rounded bg-gray-100 border mb-4"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full px-4 py-3 rounded bg-gray-100 border mb-4"
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
        />

        <input
          className="w-full px-4 py-3 rounded bg-gray-100 border mb-4"
          placeholder="Mobile Number"
          onChange={(e) => setMobileNo(e.target.value)}
        />

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
          onClick={handleSignup}
          className="w-full bg-indigo-500 text-white py-3 rounded hover:bg-indigo-700"
        >
          Create Account
        </button>

        <div className="text-center mt-4 text-sm">
          <a href="/" className="text-indigo-600">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  )
}
