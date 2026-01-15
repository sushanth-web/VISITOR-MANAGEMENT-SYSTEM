import { useState } from "react"
import api from "../services/api"

export default function AddPreRegistration() {
  const [form, setForm] = useState({
    name: "",
    gender: "",
    age: "",
    designation: "",
    mobile_no: "",
    employee_name: "",
    employee_email:"",
    email: "",
    address: "",
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }


 const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    await api.post(
      "/register/preregister",
      form,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )

    alert("PreRegistration Successful and an Email is sent to the Employee")
    window.location.href = "/preregister"
  } catch (err) {
  console.log("STATUS:", err.response?.status)
  console.log("DATA:", err.response?.data)
  console.log("FULL ERROR:", err)
  alert(err.response?.data || "Failed to PreRegister")
}

}


  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Pre Registration Form
        </h2>

        <input name="name" placeholder="Name" onChange={handleChange} required className="input" />
        <input name="gender" placeholder="Gender" onChange={handleChange} required className="input mt-3" />
        <input name="age" type="number" placeholder="Age" onChange={handleChange} required className="input mt-3" />
        <input name="designation" placeholder="Designation" onChange={handleChange} required className="input mt-3" />
        <input name="mobile_no" placeholder="Mobile Number" onChange={handleChange} required className="input mt-3" />
        <input name="employee_name" placeholder="Employee Name" onChange={handleChange} required className="input mt-3" />
        <input name="employee_email" type="email" placeholder="Employee Email" onChange={handleChange} required className="input mt-3" />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="input mt-3" />
        <input name="address" placeholder="Address" onChange={handleChange} required className="input mt-3" />

        <button
          type="submit"
          className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold"
        >
          Save PreRegistration
        </button>
      </form>
    </div>
  )
}
