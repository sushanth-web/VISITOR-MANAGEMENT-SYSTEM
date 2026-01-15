import { useState } from "react"
import api from "../services/api"

export default function AddVisitor() {
  const [form, setForm] = useState({
    name: "",
    gender: "",
    age: "",
    designation: "",
    mobile_no: "",
    email: "",
    address: "",
  })

  //  profile image state
  const [profileImage, setProfileImage] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  //file change handler
  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // FormData logic (required for image upload)
      const formData = new FormData()
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key])
      })

      if (profileImage) {
        formData.append("profile_image", profileImage)
      }

      await api.post("/register/visitor", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })

      alert("Visitor added successfully")
      window.location.href = "/visitors"
    } catch (err) {
      console.error(err)
      alert("Failed to add visitor")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Add New Visitor
        </h2>

        {/*file input with handler */}
        <input
          type="file"
          name="profile_image"
          accept="image/*"
          onChange={handleFileChange}
          required
          className="mb-4"
        />

        <input name="name" placeholder="Name" onChange={handleChange} required className="input" />
        <input name="gender" placeholder="Gender" onChange={handleChange} required className="input mt-3" />
        <input name="age" type="number" placeholder="Age" onChange={handleChange} required className="input mt-3" />
        <input name="designation" placeholder="Designation" onChange={handleChange} required className="input mt-3" />
        <input name="mobile_no" placeholder="Mobile Number" onChange={handleChange} required className="input mt-3" />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="input mt-3" />
        <input name="address" placeholder="Address" onChange={handleChange} required className="input mt-3" />

        <button
          type="submit"
          className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold"
        >
          Save Visitor
        </button>
      </form>
    </div>
  )
}
