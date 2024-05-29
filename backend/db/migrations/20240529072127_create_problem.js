/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("problem", function (table) {
    table.increments("problem_id").primary();
    table.text("distination_name").notNullable();
    table.decimal("distination_latitude", null, null).notNullable();
    table.decimal("distination_longtitude", null, null).notNullable();
    table.text("question").notNullable();
    table.text("correct_answer").notNullable();
    table.text("incorrect_answer").notNullable();
    table.text("next_distination_hint").notNullable();
    table.integer("question_number").notNullable();

    table.integer("product_id");
    table.foreign("product_id").references("product.product_id");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("problem");
};
