// HRNotes.jsx
import React, { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";

const HRNotes = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get("/api/hr");
      setNotes(data);
    } catch (err) {
      console.error(err);
    }
  };

  const addNote = async () => {
    try {
      await axios.post("/api/hr", { question, answer });
      setQuestion("");
      setAnswer("");
      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`/api/hr/${id}`);
      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">📝 HR Notes</h2>
      <input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Question" className="input" />
      <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Answer" className="input my-2" />
      <button onClick={addNote} className="btn btn-primary mb-4">Add Note</button>
      <ul>
        {notes.map((note) => (
          <li key={note._id} className="mb-3 border p-3 rounded shadow">
            <strong>{note.question}</strong>
            <p>{note.answer}</p>
            <button className="btn btn-danger mt-2" onClick={() => deleteNote(note._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HRNotes;
