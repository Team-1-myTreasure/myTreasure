exports.seed = async function (knex) {
  await knex("problem").del();
  await knex("problem").insert([
    {
      problem_id: 1,
      distination_name: "ラグーナ蒲郡",
      distination_latitude: 34.808623368597864,
      distination_longtitude: 137.27308416141435,
      question: "バードマンの名字は？",
      correct_answer: "松鳥",
      incorrect_answer: "松島",
      next_distination_hint: "泳ぐ所の近く",
      question_number: 1,
      product_id: 1,
      product_id: 1,
    },
  ]);
};
