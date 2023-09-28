const { PosteoModel } = require("../models/Posteos");

const createPosteo = async (req, res) => {
  console.log(req.body);
  const { title, content, image } = req.body;

  await PosteoModel.create({ title, content, image });

  res.redirect("/");
};

const updatePosteo = async (req, res) => {
  const posteoId = req.params.id;
  const { title, content, image } = req.body;

  const posteo = await PosteoModel.findByPk(posteoId);

  await posteo.update({ title, content, image });

  res.redirect("/");
};

const listPosteos = async (req, res) => {
  const allPosteos = await PosteoModel.findAll();

  res.json(allPosteos);
};

module.exports = { createPosteo, listPosteos, updatePosteo };