// src/pages/CompanyTracker.jsx
import React, { useState, useEffect } from "react";
import axios from "../utils/axiosConfig";
import { Briefcase, Plus, Trash2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const CompanyTracker = () => {
  const { user } = useAuth();
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [filterStatus, setFilterStatus] = useState("All");
  const [apps, setApps] = useState([]);

  const fetchApps = async () => {
    if (!user?.token) return;
    try {
      const res = await axios.get("/company", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setApps(res.data);
    } catch (err) {
      console.error("Failed to fetch apps:", err?.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchApps();
  }, [user]);

  const handleAdd = async () => {
    const trimmedCompany = company.trim();
    const trimmedRole = role.trim();
    if (!trimmedCompany || !trimmedRole) return alert("All fields required!");
    if (!user?.token) return alert("You must be logged in!");

    const data = { company: trimmedCompany, role: trimmedRole, status };

    try {
      const res = await axios.post("/company", data, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setApps([res.data, ...apps]);
      setCompany("");
      setRole("");
      setStatus("Applied");
    } catch (err) {
      console.error("Add Error:", err?.response?.data || err.message);
      alert("Failed to add entry");
    }
  };

  const handleDelete = async (id) => {
    if (!user?.token) return alert("You must be logged in!");
    try {
      await axios.delete(`/company/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setApps(apps.filter((app) => app._id !== id));
    } catch (err) {
      console.error("Delete Error:", err?.response?.data || err.message);
      alert("Failed to delete");
    }
  };

  const filteredApps =
    filterStatus === "All"
      ? apps
      : apps.filter((app) => app.status === filterStatus);

  if (!user?.token) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-semibold text-red-500">
          Please login to access Company Tracker.
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-3xl font-bold flex items-center gap-2 mb-2">
        <Briefcase className="text-blue-600" /> Company Tracker
      </h2>

      {/* Filters */}
      <div className="my-4">
        <label className="font-semibold mr-2">Filter by Status:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border p-1 rounded"
        >
          <option>All</option>
          <option>Applied</option>
          <option>Interview</option>
          <option>Rejected</option>
          <option>Offer</option>
        </select>
      </div>

      {/* Form */}
      <div className="my-4 flex flex-col md:flex-row gap-2">
        <input
          type="text"
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded"
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Rejected</option>
          <option>Offer</option>
        </select>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
        >
          <Plus className="mr-1" /> Add
        </button>
      </div>

      {/* Cards */}
      <div className="space-y-2">
        {filteredApps.length === 0 ? (
          <p className="text-gray-500 text-sm text-center">No applications to show.</p>
        ) : (
          filteredApps.map((app) => (
            <div
              key={app._id}
              className="border rounded-lg p-3 flex justify-between items-center bg-gray-50 shadow-sm"
            >
              <div>
                <p className="font-semibold">{app.company}</p>
                <p className="text-sm text-gray-500">{app.role}</p>
                <span className="text-sm font-medium text-blue-600">
                  {app.status}
                </span>
              </div>
              <button
                onClick={() => handleDelete(app._id)}
                className="p-1 hover:bg-red-100 rounded"
                title="Delete"
              >
                <Trash2 className="text-red-500 hover:text-red-700" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CompanyTracker;
