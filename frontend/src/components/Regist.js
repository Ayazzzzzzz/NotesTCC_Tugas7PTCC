import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../utils";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      return setError("Password dan konfirmasi password tidak sama!");
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/add-user`, {
        username: form.username,
        password: form.password,
      });
      setSuccess("Registrasi berhasil! 🎉");
      setForm({ username: "", password: "", confirmPassword: "" });
    } catch (err) {
      if (err.response) {
        setError(err.response.data.msg || "Terjadi kesalahan saat registrasi.");
      } else {
        setError("Gagal terhubung ke server.");
      }
    }
  };

  return (
    <div className="container">
      <div className="column is-half is-offset-one-quarter">
        <h1 className="title has-text-centered mt-6">Register Akun</h1>

        <form onSubmit={handleSubmit} className="box">
          {error && <div className="notification is-danger">{error}</div>}
          {success && <div className="notification is-success">{success}</div>}

          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                className="input"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Konfirmasi Password</label>
            <div className="control">
              <input
                className="input"
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="field is-grouped is-grouped-right">
            <div className="control">
              <button className="button is-link" type="submit">
                Daftar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
