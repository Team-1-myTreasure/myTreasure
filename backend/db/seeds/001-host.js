exports.seed = async function (knex) {
  await knex("host").del();
  await knex("host").insert([
    {
      id: 1,
      name: "bird-man",
      hashed_password: "",
      salt: "",
    },
  ]);
};
