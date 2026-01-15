import { useState, useEffect, useCallback } from "react";
import api from "../services/api";

export default function CheckInOut() {
  const [visitors, setVisitors] = useState([]);
  const [preregister, setPreregister] = useState([]);
  const [showLogout, setShowLogout] = useState(false);

  // Helpers to fetch data
  const fetchVisitors = useCallback(async () => {
    try {
      const res = await api.get("/get/visitors/details", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      setVisitors(res.data || [])
    } catch (err) {
      console.error("Error fetching visitors:", err)
    }
  }, [])

  const fetchPreregister = useCallback(async () => {
    try {
      const res = await api.get("/get/preregister/details", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      setPreregister(res.data || [])
    } catch (err) {
      console.error("Error fetching preregister:", err)
    }
  }, [])

  // Initial fetch
  useEffect(() => {
    fetchVisitors()
    fetchPreregister()
  }, [fetchVisitors, fetchPreregister])

  // Save check-in / check-out using latest state value
  const handleCheckUpdate = async (id, field, index, isPreRegister) => {
    const list = isPreRegister ? preregister : visitors
    const value = list[index]?.[field] || ""

    const url = isPreRegister
      ? `/update/preregister/${id}`
      : `/update/visitor/${id}`

    try {
      await api.patch(
        url,
        { [field]: value },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )

      // Refetch the updated list so data persists on navigation
      if (isPreRegister) {
        fetchPreregister()
      } else {
        fetchVisitors()
      }
    } catch (err) {
      console.error("Error updating check value:", err)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/"
  };

  const isActive = (path) => window.location.pathname === path;

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-600 text-white flex flex-col justify-between">
        <div>
          <div className="p-6 text-2xl font-bold text-center border-b border-indigo-500">
            Front Desk Panel
          </div>
          <nav className="mt-6">
            {[
              ["/dashboard", "Dashboard"],
              ["/visitors", "Visitors"],
              ["/employees", "Employees"],
              ["/preregister", "Pre-Registrations"],
              ["/checkinout", "Check In / Out"],
            ].map(([path, label]) => (
              <a
                key={path}
                href={path}
                className={`block py-3 px-6 transition-colors ${
                  isActive(path)
                    ? "bg-indigo-500 font-semibold"
                    : "hover:bg-indigo-500"
                }`}
              >
                {label}
              </a>
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

      {/* Main Content */}
      <div className="p-6 flex-1 overflow-y-auto">
        {/* VISITORS */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Visitors</h1>

        <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
          <thead className="bg-indigo-600 text-white text-sm uppercase">
            <tr>
              <th className="px-6 py-3 text-center">Visitor ID</th>
              <th className="px-6 py-3 text-center">Name</th>
              <th className="px-6 py-3 text-center">Check In</th>
              <th className="px-6 py-3 text-center">Check Out</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {visitors.map((v, index) => (
              <tr
                key={v._id}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="px-6 py-4 text-center">{v.visitor_id}</td>
                <td className="px-6 py-4 text-center">{v.name}</td>

                {/* Check In */}
                <td className="px-6 py-4 text-center">
                  <input
                    type="text"
                    placeholder="HH:MM"
                    value={v.check_in || ""}
                    onChange={(e) => {
                      const updated = [...visitors];
                      updated[index] = {
                        ...updated[index],
                        check_in: e.target.value,
                      };
                      setVisitors(updated);
                    }}
                    className="border px-2 py-1 rounded w-24 text-center"
                  />
                  <button
                    onClick={() =>
                      handleCheckUpdate(v._id, "check_in", index, false)
                    }
                    className="px-2 ml-2 py-1 rounded text-white
                               bg-indigo-600 hover:bg-indigo-700
                               active:bg-gray-400 transition-colors duration-150"
                    disabled={!visitors[index]?.check_in}
                  >
                    ➤
                  </button>
                </td>

                {/* Check Out */}
                <td className="px-6 py-4 text-center">
                  <input
                    type="text"
                    placeholder="HH:MM"
                    value={v.check_out || ""}
                    onChange={(e) => {
                      const updated = [...visitors];
                      updated[index] = {
                        ...updated[index],
                        check_out: e.target.value,
                      };
                      setVisitors(updated);
                    }}
                    className="border px-2 py-1 rounded w-24 text-center"
                  />
                  <button
                    onClick={() =>
                      handleCheckUpdate(v._id, "check_out", index, false)
                    }
                    className="px-2 ml-2 py-1 rounded text-white
                               bg-indigo-600 hover:bg-indigo-700
                               active:bg-gray-400 transition-colors duration-150"
                    disabled={!visitors[index]?.check_out}
                  >
                    ➤
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PREREGISTER */}
        <h1 className="text-3xl font-bold mt-8 text-gray-800">
          Pre Registered Visitors
        </h1>

        <table className="min-w-full bg-white shadow rounded-lg overflow-hidden mt-6">
          <thead className="bg-indigo-600 text-white text-sm uppercase">
            <tr>
              <th className="px-6 py-3 text-center">PreRegister ID</th>
              <th className="px-6 py-3 text-center">Name</th>
              <th className="px-6 py-3 text-center">Check In</th>
              <th className="px-6 py-3 text-center">Check Out</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {preregister.map((v, index) => (
              <tr
                key={v._id}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="px-6 py-4 text-center">{v.visitor_id}</td>
                <td className="px-6 py-4 text-center">{v.name}</td>

                {/* PreRegister Check In */}
                <td className="px-6 py-4 text-center">
                  <input
                    type="text"
                    placeholder="HH:MM"
                    value={v.check_in || ""}
                    onChange={(e) => {
                      const updated = [...preregister];
                      updated[index] = {
                        ...updated[index],
                        check_in: e.target.value,
                      };
                      setPreregister(updated);
                    }}
                    className="border px-2 py-1 rounded w-24 text-center"
                  />
                  <button
                    onClick={() =>
                      handleCheckUpdate(v._id, "check_in", index, true)
                    }
                    className="px-2 ml-2 py-1 rounded text-white
                               bg-indigo-600 hover:bg-indigo-700
                               active:bg-gray-400 transition-colors duration-150"
                    disabled={!preregister[index]?.check_in}
                  >
                    ➤
                  </button>
                </td>

                {/* PreRegister Check Out */}
                <td className="px-6 py-4 text-center">
                  <input
                    type="text"
                    placeholder="HH:MM"
                    value={v.check_out || ""}
                    onChange={(e) => {
                      const updated = [...preregister];
                      updated[index] = {
                        ...updated[index],
                        check_out: e.target.value,
                      };
                      setPreregister(updated);
                    }}
                    className="border px-2 py-1 rounded w-24 text-center"
                  />
                  <button
                    onClick={() =>
                      handleCheckUpdate(v._id, "check_out", index, true)
                    }
                    className="px-2 ml-2 py-1 rounded text-white
                               bg-indigo-600 hover:bg-indigo-700
                               active:bg-gray-400 transition-colors duration-150"
                    disabled={!preregister[index]?.check_out}
                  >
                    ➤
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Logout Modal */}
      {showLogout && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
            <p className="mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowLogout(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
