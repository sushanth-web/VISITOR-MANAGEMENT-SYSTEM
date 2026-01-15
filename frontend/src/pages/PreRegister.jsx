import { useEffect, useState } from 'react'
import api from '../services/api'

export default function PreRegister() {
    const [preregister, setPreregister] = useState([])
    const [showLogout, setShowLogout] = useState(false);


    useEffect(() => {
       api
         .get("/get/preregister/details", {
           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
         })
         .then((res) => setPreregister(res.data));
     }, []);
    

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    const isActive = (path) => window.location.pathname === path;

    // DELETE EMPLOYEE FUNCTION
      const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this pre registration?")) {
          try {
            await api.delete(`/delete/preregister/details/${id}`, {
              headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            // Remove from local state
            setPreregister(preregister.filter((v) => v._id !== id));
          } catch (err) {
            console.error("Failed to delete pre registration:", err);
          }
        }
      };


    return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {/* Sidebar */}
      <div className="w-64 bg-indigo-600 text-white flex flex-col justify-between">
        <div>
          <div className="p-6 text-2xl font-bold text-center border-b border-indigo-500">
            Pre Registrations
          </div>
          <nav className="mt-6">
            <a
              href="/dashboard"
              className={`block py-3 px-6 transition-colors ${
                isActive("/dashboard") ? "bg-indigo-500 font-semibold" : "hover:bg-indigo-500"
              }`}
            >
              Dashboard
            </a>
            <a
              href="/visitors"
              className={`block py-3 px-6 transition-colors ${
                isActive("/visitors") ? "bg-indigo-500 font-semibold" : "hover:bg-indigo-500"
              }`}
            >
              Visitors
            </a>
            <a
              href="/employees"
              className={`block py-3 px-6 transition-colors ${
                isActive("/employees") ? "bg-indigo-500 font-semibold" : "hover:bg-indigo-500"
              }`}
            >
              Employees
            </a>
            <a
              href="/preregister"
              className={`block py-3 px-6 transition-colors ${
                isActive("/preregister") ? "bg-indigo-500 font-semibold" : "hover:bg-indigo-500"
              }`}
            >
              Pre-Registrations
            </a>
            <a
              href="/checkinout"
              className={`block py-3 px-6 transition-colors ${
                isActive("/checkinout") ? "bg-indigo-500 font-semibold" : "hover:bg-indigo-500"
              }`}
            >
              Check In / Out
            </a>
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

      {/* Main content */}
      <div className="p-6 flex-1 overflow-y-auto">

  <div className="flex justify-between items-center mb-6">
  <h1 className="text-3xl font-bold text-gray-800">Pre Registrations</h1>

  <a
    href="/add-preregistration"
    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold shadow"
  >
    + Pre Registration
  </a>
</div>


  <div className="overflow-x-auto">
    <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
      <thead className="bg-indigo-600 text-white text-sm uppercase">
        <tr>
          <th className="px-6 py-3 text-center">PreRegister ID</th>
          <th className="px-6 py-3 text-center">Name</th>
          <th className="px-6 py-3 text-center">Gender</th>
          <th className="px-6 py-3 text-center">Age</th>
          <th className="px-6 py-3 text-center">Designation</th>
          <th className="px-6 py-3 text-center">Mobile NO</th>
          <th className="px-6 py-3 text-center">Employee Name</th>
          <th className="px-6 py-3 text-center">Employee Email</th>
          <th className="px-6 py-3 text-center">Email</th>
          <th className="px-6 py-3 text-center">Address</th>
          <th className="px-6 py-3 text-center">Delete/Edit</th>
        </tr>
      </thead>
      <tbody className="text-gray-700 text-sm">
        {preregister.map((v, index) => (
          <tr
            key={v._id}
            className={`${
              index % 2 === 0 ? "bg-gray-50" : "bg-white"
            } hover:bg-indigo-100 transition-colors`}
          >

            <td className="px-6 py-4 text-center">{v.visitor_id}</td>
            <td className="px-6 py-4 text-center">{v.name}</td>
            <td className="px-6 py-4 text-center">{v.gender}</td>
            <td className="px-6 py-4 text-center">{v.age}</td>
            <td className="px-6 py-4 text-center">{v.designation}</td>
            <td className="px-6 py-4 text-center">{v.mobile_no}</td>
            <td className="px-6 py-4 text-center">{v.employee_name}</td>
            <td className="px-6 py-4 text-center">{v.employee_email}</td>
            <td className="px-6 py-4 text-center">{v.email}</td>
            <td className="px-6 py-4 text-center">{v.address}</td>
            <td className="px-6 py-4 text-center flex justify-center gap-3">
            
            <button
                onClick={() => handleDelete(v._id)}
                className="text-red-500 hover:text-red-700"
                title="Delete PreRegistration"
            >
                🗑️
            </button>
            <button
                onClick={() => window.location.href = `/edit-preregister/${v._id}`}
                className="text-indigo-600 hover:text-indigo-800"
                title="Edit PreRegistration"
            >
                ✏️
            </button>
            
            </td>

                  
          </tr>
        ))}
      </tbody>
    </table>
  </div>
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