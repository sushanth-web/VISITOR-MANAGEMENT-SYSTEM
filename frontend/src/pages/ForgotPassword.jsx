import { useState } from "react";
import api from "../services/api";

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // Step 1: send OTP, Step 2: reset password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const sendOTP = async () => {
    try {
      await api.post("/admin/forgot/password", { email: email.trim() });
      alert("OTP sent to your email");
      setStep(2); // move to OTP/password reset step
    } catch (err) {
      alert(err.response?.data || "Failed to send OTP");
    }
  };

  const resetPassword = async () => {
    try {
      await api.post("/admin/change/password", {
        email: email.trim(),
        otp: otp.trim(),
        password: newPassword,
      });
      alert("Password updated successfully");
      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow w-96">
        {step === 1 && (
          <>
            <h1 className="text-2xl font-bold text-center mb-6">
              Forgot Password
            </h1>
            <input
              className="w-full px-4 py-3 rounded bg-gray-100 border mb-4"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={sendOTP}
              className="w-full bg-indigo-500 text-white py-3 rounded hover:bg-indigo-700"
            >
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="text-2xl font-bold text-center mb-6">
              Reset Password
            </h1>
            <input
              className="w-full px-4 py-3 rounded bg-gray-100 border mb-4"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <input
              type="password"
              className="w-full px-4 py-3 rounded bg-gray-100 border mb-4"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              onClick={resetPassword}
              className="w-full bg-indigo-500 text-white py-3 rounded hover:bg-indigo-700"
            >
              Reset Password
            </button>
          </>
        )}

        <div className="text-center mt-4 text-sm">
          <a href="/" className="text-indigo-600">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}
