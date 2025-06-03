// frontend/src/components/Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        username,
        password,
      }, {
        withCredentials: true,
      });
      const token = response.data.accessToken;
      localStorage.setItem("accessToken", token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="container mt-6">
      <div className="column is-half is-offset-one-quarter">
        <h1 className="title has-text-centered">Login</h1>
        {error && <p className="notification is-danger">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="control">
            <button className="button is-primary is-fullwidth">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;