import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../utils";

const EditNote = () => {
  const [judul, setJudul] = useState("");
  const [author, setAuthor] = useState("");
  const [isi, setIsi] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
    } else {
      getNoteById(token);
    }
  }, []);
  
  const updateNote = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE_URL}/edit-Notes/${id}`, {
        judul,
        author,
        isi,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getNoteById = async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Notes/${id}`);
      setJudul(response.data.judul);
      setAuthor(response.data.author);
      setIsi(response.data.isi);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
      <h1 className="title">Edit Your Note</h1>
        <form onSubmit={updateNote}>
          <div className="field">
            <label className="label">Judul</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                placeholder="Judul"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Author</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Isi</label>
            <div className="control">
              <textarea
                className="textarea"
                value={isi}
                onChange={(e) => setIsi(e.target.value)}
                placeholder="Isi"
              ></textarea>
            </div>
          </div>
          <div className="field">
            <button type="submit" className="button is-success">
              Update Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNote;
