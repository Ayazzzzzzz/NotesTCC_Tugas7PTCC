import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const User = db.define("notes", {
        judul: DataTypes.STRING,
        author : DataTypes.STRING,
        isi : DataTypes.STRING,
    }
);

db.sync().then(() => console.log("Database Syncronized"));

export default User;
