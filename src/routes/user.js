// CRUD

import { registerUser } from "../controllers/userController.js";

const user = (app) => {
  app.route("/auth/register").post(registerUser);
};

export default user;