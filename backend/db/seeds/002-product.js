exports.seed = async function (knex) {
  await knex("product").del();
  await knex("product").insert([
    {
      product_id: 1,
      host_id: 1,
      product_name: "お宝探しゲーム",
    },
  ]);
};
