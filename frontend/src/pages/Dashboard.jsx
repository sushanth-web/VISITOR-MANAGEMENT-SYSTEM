import { useState, useEffect } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [showLogout, setShowLogout] = useState(false);

  const [visitors, setVisitors] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [preRegs, setPreRegs] = useState([]);

  const [search, setSearch] = useState("");

  /* Fetch all data */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        };

        const [v, e, p] = await Promise.all([
          api.get("/get/visitors/details", { headers }),
          api.get("/get/employees/details", { headers }),
          api.get("/get/preregister/details", { headers }),
        ]);

        setVisitors(v.data);
        setEmployees(e.data);
        setPreRegs(p.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const isActive = (path) => window.location.pathname === path;

  /* Highlight matched text */
  const highlight = (text) => {
    if (!search) return text;

    const regex = new RegExp(`(${search})`, "gi");
    return text.replace(regex, `<mark class="bg-yellow-300">$1</mark>`);
  };

  /* Filter function */
  const filterData = (list) =>
    list.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(search.toLowerCase())
      )
    );

  const matchedVisitors = filterData(visitors);
  const matchedEmployees = filterData(employees);
  const matchedPreRegs = filterData(preRegs);

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
              <a
                key={path}
                href={path}
                className={`block py-3 px-6 ${
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

      {/* Main content */}
      <div className="flex-1 p-8 relative">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

          {/* 🔍 Search Bar */}
          <div className="relative w-96">
            <input
              type="text"
              placeholder="Search visitors, employees, pre-registrations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* Search Results */}
            {search && (
              <div className="absolute z-10 bg-white w-full mt-2 max-h-80 overflow-y-auto shadow-lg rounded p-3 space-y-3">
                {[
                  ["Visitors", matchedVisitors],
                  ["Employees", matchedEmployees],
                  ["Pre-Registrations", matchedPreRegs],
                ].map(([title, list]) =>
                  list.length > 0 ? (
                    <div key={title}>
                      <h3 className="text-sm font-semibold text-indigo-600 mb-1">
                        {title}
                      </h3>
                      {list.map((item) => (
                        <div
                          key={item._id}
                          className="text-sm text-gray-700 border-b py-1"
                          dangerouslySetInnerHTML={{
                            __html: highlight(
                              `${item.name || ""} ${item.email || ""} ${
                                item.mobile_no || ""
                              }`
                            ),
                          }}
                        />
                      ))}
                    </div>
                  ) : null
                )}

                {matchedVisitors.length +
                  matchedEmployees.length +
                  matchedPreRegs.length ===
                  0 && (
                  <p className="text-sm text-gray-500">No results found</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6">
          {[
            ["Total Visitors", visitors.length],
            ["Total Employees", employees.length],
            ["Total Pre-Registrations", preRegs.length],
          ].map(([label, value]) => (
            <div
              key={label}
              className="bg-white rounded-lg shadow p-6 flex flex-col items-center"
            >
              <h2 className="text-lg font-semibold text-gray-600">{label}</h2>
              <p className="text-3xl font-bold text-indigo-600 mt-2">{value}</p>
            </div>
          ))}
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
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded"
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
