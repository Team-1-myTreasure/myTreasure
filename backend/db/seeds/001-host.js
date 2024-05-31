exports.seed = async function (knex) {
  await knex.raw("TRUNCATE TABLE host CASCADE");
  await knex("host").insert([
    {
      id: 1,
      name: "bird-man",
      email: "birdbirdbird@gmali.com",
    },
  ]);
};
