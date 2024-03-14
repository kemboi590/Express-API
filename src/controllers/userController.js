import sql from "mssql";
import config from "./../db/config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// register user
export const registerUser = async (req, res) => {
  const { first_name, last_name, email_address, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  // console.log(hashedPassword);
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input("email_address", sql.VarChar, email_address)
      .query("SELECT * FROM Users WHERE email_address = @email_address");
    const user = result.recordset[0];
    if (user) {
      return res.status(409).json({ error: "User already exist" });
    } else {
      await pool
        .request()
        .input("first_name", sql.VarChar, first_name)
        .input("last_name", sql.VarChar, last_name)
        .input("email_address", sql.VarChar, email_address)
        .input("hashedPassword", sql.VarChar, hashedPassword)
        .query(
          "INSERT INTO Users (first_name,last_name,email_address,password) VALUES (@first_name, @last_name, @email_address, @hashedPassword)"
        );
      return res.status(201).json({ message: "User created Successfully" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//login a user
export const loginUser = async (req, res) => {
  const { email_address, password } = req.body;
  try {
    const pool = await sql.connect(config.sql);
    let result = await pool
      .request()
      .input("email_address", sql.VarChar, email_address)
      .query("SELECT * FROM Users WHERE email_address = @email_address");
    const user = result.recordset[0];
    // console.log(user);
    if (!user) {
      return res.status(401).json({ error: "User does net exist" }); // user is not registered
    } else {
      //user is available
      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ error: "Incorrect password" });
      } else {
        // the password is correct
        const token = `JWT ${jwt.sign(
          //unique string given to a user / authentication, keep user logged in
          {
            email_address: user.email_address,
            user_id: user.user_id,
            first_name: user.first_name,
            last_name: user.last_name,
          },
          config.jwt_secret,
          { expiresIn: "30d" }
        )}`;
        res.status(200).json({
          //user login success
          email_address: user.email_address,
          user_id: user.user_id,
          first_name: user.first_name,
          last_name: user.last_name,
          token: token,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// loginRequred
export const loginRequired = (req, res, next) => {
  if (req.user) {
    //todo
    next(); //passing control to the next middleware/ actions
  } else {
    return res.status(401).json({ message: "Unauthorized user!" });
  }
};
