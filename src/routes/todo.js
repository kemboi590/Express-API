import {
  CreateTodo,
  GetTodos,
  DeleteTodo,
  UpdateTodo,
} from "../controllers/taskController.js";
import { loginRequired } from "../controllers/userController.js";

//http://localhost:8082/todo
const tasks = (app) => {
  app.post("/todo",loginRequired, CreateTodo).get("/todo",loginRequired, GetTodos);
  app.delete("/todo/:id",loginRequired, DeleteTodo).put("/todo/:id",loginRequired, UpdateTodo);
};

export default tasks;
