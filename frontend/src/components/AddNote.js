import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils";


const AddNote = () => {
  const [judul, setJudul] = useState("");
  const [author, setAuthor] = useState("");
  const [isi, setIsi] = useState("");
  const navigate = useNavigate();

  const saveNote = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/add-Notes`, {
        judul,
        author,
        isi,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
      <h1 className="title">Add Your Note</h1>
        <form onSubmit={saveNote}>
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
              Save Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNote;