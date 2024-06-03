const knex = require("knex");
const knexConfig = require("../../knexfile");
const environment = process.env.DATABASE_URL ? "production" : "development";
const db = knex(knexConfig[environment]);

module.exports = db;
