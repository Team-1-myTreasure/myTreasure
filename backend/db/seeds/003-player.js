exports.seed = async function (knex) {
  await knex("player").del();
  await knex("player").insert([
    {
      player_id: 1,
      product_id: 1,
      player_name: "yudai",
      goal_time: "2022-07-01 23:59:59",
      progress_state: 1,
    },
  ]);
};
