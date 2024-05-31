/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table("host", function (table) {
    table.binary("salt");
    table.binary("hashed_password");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.table("host", function (table) {
    table.dropColumn("salt");
    table.dropColumn("hashed_password");
  });
};
