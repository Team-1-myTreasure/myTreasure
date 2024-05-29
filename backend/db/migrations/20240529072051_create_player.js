/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("player", function (table) {
    table.increments("player_id").primary();
    table.integer("product_id");
    table.foreign("product_id").references("product.product_id");
    table.string("player_name").notNullable();
    table.timestamp("goal_time").notNullable();
    table.integer("progress_state").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("player");
};
