import dotenv from "dotenv";
import assert from "assert";
dotenv.config();

const { PORT, HOST, SQL_SERVER, SQL_USER, SQL_PASSWORD, SQL_DB } =
  process.env;

assert(PORT, "PORT is required");
assert(HOST, "HOST is required");

const config = {
  port: PORT,
  host: HOST,

  sql: {
    server: SQL_SERVER,
    user: SQL_USER,
    password: SQL_PASSWORD,
    database: SQL_DB,
    options: {
      encrypt: false,
      enableArithAbort: true,
    },
  },
};

export default config;
