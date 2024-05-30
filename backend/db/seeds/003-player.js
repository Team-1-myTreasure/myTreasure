exports.seed = async function (knex) {
  await knex("player").del();
  await knex("player").insert([
    {
      player_id: 1,
      product_id: 1,
      player_name: "yudai",
      goal_time_unix: 1717029192,
      progress_state: 1,
    },
  ]);
};
