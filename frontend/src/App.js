import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddNote from "./components/AddNote";
import NotesList from "./components/NotesList";
import EditNote from "./components/EditNote";
import Register from "./components/Regist";
import Login from "./components/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NotesList />} />
        <Route path="/add" element={<AddNote />} />
        <Route path="/edit/:id" element={<EditNote />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
// ayo coba