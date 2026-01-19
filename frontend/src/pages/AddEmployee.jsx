import { useState } from "react"
import api from "../services/api"

export default function AddEmployee() {
  const [form, setForm] = useState({
    name: "",
    gender: "",
    age: "",
    designation: "",
    department: "",
    mobile_no: "",
    email: "",
    address: "",
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await api.post("/register/employee", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      alert("Employee added successfully")
      window.location.href = "/employees"
    } catch (error) {
      console.error("Failed to add employee:", error)
      alert("Failed to add employee")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Add New Employee
        </h2>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
          className="input"
        />
        <input
          name="gender"
          placeholder="Gender"
          onChange={handleChange}
          required
          className="input mt-3"
        />
        <input
          name="age"
          type="number"
          placeholder="Age"
          onChange={handleChange}
          required
          className="input mt-3"
        />
        <input
          name="designation"
          placeholder="Designation"
          onChange={handleChange}
          required
          className="input mt-3"
        />
        <input
          name="department"
          placeholder="Department"
          onChange={handleChange}
          required
          className="input mt-3"
        />
        <input
          name="mobile_no"
          placeholder="Mobile Number"
          onChange={handleChange}
          required
          className="input mt-3"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="input mt-3"
        />
        <input
          name="address"
          placeholder="Address"
          onChange={handleChange}
          required
          className="input mt-3"
        />

        <button
          type="submit"
          className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold"
        >
          Save Employee
        </button>
      </form>
    </div>
  )
}
