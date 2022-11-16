const { response } = require("express");
const { Pool } = require("pg");

const DB_HOST = process.env.DB_HOST || "containers-us-west-106.railway.app";
const DB_USER = process.env.DB_USER || "postgres";
const DB_PASSWORD = process.env.DB_PASSWORD || "tc6kn9W61183eshM1LX6";
const DB_NAME = process.env.DB_NAME || "railway";
const DB_PORT = process.env.DB_PORT || 7974;

const pool = new Pool({
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
});

const getUsers = async (req, res) => {
  const response = await pool.query("SELECT * FROM users ORDER BY id ASC");
  res.status(200).json(response.rows);
};

const getUserById = async (req, res) => {
  const id = parseInt(req.query.id);
  const response = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  res.json(response.rows);
};

const getLoginAuthentication = async (req, res) => {
  const email = req.params.email;
  const password = req.params.password;
  const responseOne = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  const responseTwo = await pool.query("SELECT * FROM users WHERE password = $1", [password]);

  await Promise.all([responseOne, responseTwo])
    .then((response) => {
      const responseEmail = response[0];
      const responsePassword = response[1];

      if (responseEmail.rowCount <= 0) {
        res.send("Este correo no esta registrado");
        return;
      }
      if (responsePassword.rowCount <= 0) {
        res.send("Contraseña incorrecta");
        return;
      }
      res.send("0");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({ reason: "unknown" });
    });
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const response = await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [
    name,
    email,
    password,
  ]);
  res.json({
    message: "User Added successfully",
    body: {
      user: { name, email, password },
    },
  });
};

const deleteUser = async (req, res) => {
  const id = parseInt(req.query.id);
  await pool.query("DELETE FROM users where id = $1", [id]);
  res.json(`User ${id} deleted Successfully`);
};

module.exports = {
  getUsers,
  getUserById,
  getLoginAuthentication,
  createUser,
  deleteUser,
};
