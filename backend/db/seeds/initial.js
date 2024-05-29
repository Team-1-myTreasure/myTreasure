exports.seed = async function (knex) {
  await knex("host").del();
  await knex("host").insert([
    {
      name: "bird-man",
      email: "birdbirdbird@gmali.com",
    },
  ]);
};
