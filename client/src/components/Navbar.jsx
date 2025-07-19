import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <nav className="bg-white shadow-md py-3 px-6 flex justify-between items-center">
      <Link to="/" className="text-xl font-semibold text-blue-700">
        InterviewPrep Buddy
      </Link>

      <div className="space-x-4">
        {isLoggedIn && (
          <>
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
              Dashboard
            </Link>
            <Link to="/dsatracker" className="text-gray-700 hover:text-blue-600 font-medium">
              DSA Tracker
            </Link>
            <Link to="/hrnotes" className="text-gray-700 hover:text-blue-600 font-medium">
              HR Notes
            </Link>
            <Link to="/companytracker" className="text-gray-700 hover:text-blue-600 font-medium">
              Company Tracker
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-600 font-medium hover:text-red-800"
            >
              Logout
            </button>
          </>
        )}
        {!isLoggedIn && (
          <>
            <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">
              Login
            </Link>
            <Link to="/register" className="text-gray-700 hover:text-blue-600 font-medium">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
