import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:7000/api/auth/register', formData);
      alert('Registration successful');
      navigate('/login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-8 rounded-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-blue-700">Register</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
