import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../services/api"

export default function Dashboard() {

  const navigate = useNavigate()

  const [showLogout, setShowLogout] = useState(false)
  const [visitors, setVisitors] = useState([])
  const [employees, setEmployees] = useState([])
  const [preRegs, setPreRegs] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    const fetchData = async () => {

      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }

      const [v, e, p] = await Promise.all([
        api.get("/get/visitors/details", { headers }),
        api.get("/get/employees/details", { headers }),
        api.get("/get/preregister/details", { headers }),
      ])

      setVisitors(v.data)
      setEmployees(e.data)
      setPreRegs(p.data)

    }

    fetchData()

  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  const isActive = (path) => window.location.pathname === path

  return (

    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}

      <div className="w-64 bg-indigo-600 text-white flex flex-col justify-between">

        <div>

          <div className="p-6 text-2xl font-bold text-center border-b border-indigo-500">
            Admin Panel
          </div>

          <nav className="mt-6">

            {[
              ["/dashboard", "Dashboard"],
              ["/visitors", "Visitors"],
              ["/employees", "Employees"],
              ["/preregister", "Pre-Registrations"],
              ["/checkinout", "Check In / Out"],
            ].map(([path, label]) => (

              <Link
                key={path}
                to={path}
                className={`block py-3 px-6 ${
                  isActive(path)
                    ? "bg-indigo-500 font-semibold"
                    : "hover:bg-indigo-500"
                }`}
              >
                {label}
              </Link>

            ))}

          </nav>

        </div>

        <div className="p-6 border-t border-indigo-500">

          <button
            onClick={() => setShowLogout(true)}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
          >
            Logout
          </button>

        </div>

      </div>

      {/* Main */}

      <div className="flex-1 p-8">

        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Dashboard
        </h1>

        <div className="grid grid-cols-3 gap-6">

          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h2 className="text-lg text-gray-600">
              Total Visitors
            </h2>
            <p className="text-3xl font-bold text-indigo-600 mt-2">
              {visitors.length}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h2 className="text-lg text-gray-600">
              Total Employees
            </h2>
            <p className="text-3xl font-bold text-indigo-600 mt-2">
              {employees.length}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h2 className="text-lg text-gray-600">
              Total PreRegistrations
            </h2>
            <p className="text-3xl font-bold text-indigo-600 mt-2">
              {preRegs.length}
            </p>
          </div>

        </div>

      </div>

    </div>
  )
}