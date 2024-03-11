import express from "express";
import config from "./src/db/config.js";
import tasks from "./src/routes/todo.js";
import user from "./src/routes/user.js";
import bodyParser from "body-parser";
const app = express(); //invoke express

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

tasks(app);
user(app)


app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

app.listen(config.port || 5000, () => {
  console.log(`Server is Running on port ${config.port}`);
});
