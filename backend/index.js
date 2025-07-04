import express from "express";
import cors from "cors";
import NotesRoutes from "./routes/NotesRoutes.js";
import UserRoute from "./routes/UserRoutes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import sequelize from "./config/database.js";

const app = express();
app.set("view engine", "ejs");

app.use(cookieParser());

app.use(
  cors({
    origin: [
  "http://localhost:3000",
  "https://notes-ayazzz-dot-g-07-450802.uc.r.appspot.com"
], 
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => res.render("index"));

app.use(UserRoute);
app.use(NotesRoutes);

app.listen(5000, () => console.log("Server connected"));
