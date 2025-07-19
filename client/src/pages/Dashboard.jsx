// client/src/pages/Dashboard.jsx
import React from "react";
import { Code2, UserRound, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const sections = [
  { title: "DSA Tracker", icon: <Code2 size={24} />, to: "/dsatracker" },
  { title: "HR Notes", icon: <UserRound size={24} />, to: "/hrnotes" },
  { title: "Company Tracker", icon: <Building2 size={24} />, to: "/companytracker" }
];

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("userInfo") || "{}");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-8">
      <h1 className="text-4xl font-bold mb-6">Welcome, {user.name || "Buddy"}!</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {sections.map((sec) => (
          <Link key={sec.title} to={sec.to} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition flex items-center gap-4">
            <div className="bg-blue-50 p-3 rounded-full">{sec.icon}</div>
            <h2 className="text-lg font-semibold">{sec.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
