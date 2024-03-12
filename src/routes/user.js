// CRUD

import { registerUser, loginUser } from "../controllers/userController.js";

const user = (app) => {
  app.route("/auth/register").post(registerUser);
  app.route("/auth/login").post(loginUser);
};

export default user;
