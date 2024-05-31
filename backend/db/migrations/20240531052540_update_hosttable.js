/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table("host", function (table) {
    table.string("salt");
    table.string("password");
    table.dropColumn("email");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.table("host", function (table) {
    table.dropColumn("salt");
    table.dropColumn("password");
    table.string("email").notNullable();
  });
};
