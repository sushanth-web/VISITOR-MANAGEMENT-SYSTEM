import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"

export default function ChangePassword() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")

  const handleChangePassword = async () => {
    try {
      await api.post("/admin/change/password", {
        email,
        otp,
        newPassword,
      })

      alert("Password updated successfully")
      navigate("/")
    } catch (error) {
      alert("Invalid OTP or error")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow w-96">
        <h1 className="text-2xl font-bold text-center mb-6">
          Change Password
        </h1>

        <input
          className="w-full px-4 py-3 rounded bg-gray-100 border mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full px-4 py-3 rounded bg-gray-100 border mb-3"
          placeholder="OTP"
          onChange={(e) => setOtp(e.target.value)}
        />

        <input
          type="password"
          className="w-full px-4 py-3 rounded bg-gray-100 border mb-4"
          placeholder="New Password"
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button
          onClick={handleChangePassword}
          className="w-full bg-indigo-500 text-white py-3 rounded hover:bg-indigo-700"
        >
          Update Password
        </button>
      </div>
    </div>
  )
}