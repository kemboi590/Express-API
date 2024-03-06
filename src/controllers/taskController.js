import sql from "mssql"
import config from './../db/config.js';

export const CreateTodo = async(req, res) => {
    try {
        const { title, description } = req.body;
        const pool = await sql.connect(config.sql);
        await pool
        .request()
        .input("title", sql.VarChar, title)
        .input("description", sql.VarChar, description)
        .query("INSERT INTO todo (title, description) VALUES (@title, @description)");
        res.json("Todo Created successfully");
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
