import express from "express";
import config from "./src/db/config.js";
import tasks from "./src/routes/todo.js";
import user from "./src/routes/user.js";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
const app = express(); //invoke express

// Middlewares jwt
app.use((req, res, next) => {
  if (
    req.headers &&  //checking if headers is available in the request
    req.headers.authorization &&   //checking if headers authorization is available in the request
    req.headers.authorization.split(" ")[0] === "JWT"  // if we split the token and find the fiets element = "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1], // checking second part of the token
      config.jwt_secret,  //checking the secret
      (err, decode) => {
        if (err) req.user = undefined; //set user to null/ not available
        req.user = decode;  // it has been verified
        next();  
      }
    );
  } else {
    req.user = undefined;
    next(); 
  }
});

// in-built middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

tasks(app);
user(app);

app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

app.listen(config.port || 5000, () => {
  console.log(`Server is Running on port ${config.port}`);
});
