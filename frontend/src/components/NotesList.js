import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils";

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
    } else {
      getNotes(token);
    }
  }, []);

  const getNotes = async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/notes`);
      setNotes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/delete-Notes/${id}`);
      getNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.delete(
        `${API_BASE_URL}/logout`,
        {},
        {
          withCredentials: true, // penting supaya cookie refreshToken dikirim
        }
      );
      localStorage.removeItem("accessToken");
      navigate("/login");
    } catch (error) {
      console.error("Logout gagal:", error);
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <div className="is-flex is-justify-content-space-between is-align-items-center mb-4">
          <h1 className="title">Notes kamu hehe</h1>
          <Link to="/add" className="button is-success">
            + Add Note
          </Link>
          <button onClick={handleLogout} className="button is-danger">Logout</button>
        </div>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Author</th>
              <th>Content</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note, index) => (
              <tr key={note.id}>
                <td>{index + 1}</td>
                <td>{note.judul}</td>
                <td>{note.author}</td>
                <td>{note.isi}</td>
                <td>
                  <Link to={`/edit/${note.id}`} className="button is-small is-info mr-2">
                    Edit
                  </Link>
                  <button onClick={() => deleteNote(note.id)} className="button is-small is-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NoteList;
