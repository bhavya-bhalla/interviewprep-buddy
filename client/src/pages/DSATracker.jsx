import React, { useState, useEffect } from "react";
import axios from "../utils/axiosConfig";

function DSATracker() {
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Pending");

  const fetchData = async () => {
    const res = await axios.get("/api/dsa");
    setQuestions(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async () => {
    await axios.post("/api/dsa", { title, status });
    fetchData();
    setTitle("");
    setStatus("Pending");
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/dsa/${id}`);
    fetchData();
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🧠 DSA Tracker</h1>

      {questions.map((q) => (
        <div key={q._id} className="flex justify-between items-center bg-gray-100 rounded p-3 mb-3">
          <div>
            <p className="font-medium">{q.title}</p>
            <p className="text-sm text-gray-500">{q.status}</p>
          </div>
          <button onClick={() => handleDelete(q._id)} className="text-red-500 hover:text-red-700">🗑️</button>
        </div>
      ))}

      <input
        className="w-full border p-2 mb-3"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select
        className="w-full border p-2 mb-3"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>Pending</option>
        <option>Solved</option>
        <option>Revisit</option>
      </select>
      <button onClick={handleAdd} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        ➕ Add DSA Question
      </button>
    </div>
  );
}

export default DSATracker;
