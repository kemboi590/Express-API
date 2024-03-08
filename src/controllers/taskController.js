import sql from "mssql";
import config from "./../db/config.js";

//CRUD - CREATE, READ, UPDATE, DELETE.

//READ
export const GetTodos = async (req, res) => {
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool.request().query("SELECT * FROM todo");
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//CREATE
export const CreateTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("title", sql.VarChar, title)
      .input("description", sql.VarChar, description)
      .query(
        "INSERT INTO todo (title, description) VALUES (@title, @description)"
      );
    res.json("Todo Created successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//UPDATE
export const UpdateTodo = async (req, res) => {
  try {
    const { id } = req.params;  //2
    const { title, description } = req.body;
    const pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("id", sql.VarChar, id)
      .input("title", sql.VarChar, title)
      .input("description", sql.VarChar, description)
      .query(
        "UPDATE todo SET title = @title, description = @description WHERE todo_id = @id"
      );
    res.status(200).json("Todo updated successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//DELETE
export const DeleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM todo WHERE todo_id = @id");
    res.json("Todo Deleted successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
