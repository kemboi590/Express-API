import {
  CreateTodo,
  GetTodos,
  DeleteTodo,
  UpdateTodo,
} from "../controllers/taskController.js";

//http://localhost:8082/todo
const tasks = (app) => {
  app.post("/todo", CreateTodo).get("/todo", GetTodos);
  app.delete("/todo/:id", DeleteTodo).put("/todo/:id", UpdateTodo);
};

export default tasks;
