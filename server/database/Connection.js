const typeorm = require("typeorm");
const Entities = require("./Entities");
require('dotenv').config()

const Connection = typeorm.createConnection({
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: Entities.list()
});

module.exports = Connection;