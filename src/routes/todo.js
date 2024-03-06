import { CreateTodo } from "../controllers/taskController.js";

const tasks = (app) => {
  app.post("/todo", CreateTodo);
};

export default tasks;
