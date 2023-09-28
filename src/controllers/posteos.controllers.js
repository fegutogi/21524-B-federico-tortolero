const { PosteoModel } = require("../models/Posteos");

const createPosteo = async (req, res) => {
  console.log(req.body);
  const { title, content, image } = req.body;

  await PosteoModel.create({ title, content, image });

  res.redirect("/");
};

const updatePosteo = async (req, res) => {
  const posteoId = req.body.posteoId;
  const { title, content, image } = req.body;

  const posteo = await PosteoModel.findByPk(posteoId);

  await posteo.update({ title, content, image });

  res.redirect("/");
};

const listPosteos = async (req, res) => {
  const allPosteos = await PosteoModel.findAll();

  res.json(allPosteos);
};

const mostrarFormularioEdicion = async (req, res) => {
  try {
    // Obtén el ID del posteo seleccionado desde la solicitud
    const posteoId = req.query.posteoId;

    // Busca el posteo seleccionado por ID
    const posteo = await PosteoModel.findByPk(posteoId);

    if (!posteo) {
      // Maneja el caso en el que el posteo no se encuentra
      res.status(404).send("No se encontró el posteo para editar.");
      return;
    }

    // Obtener la lista de todos los posteos para mostrarla en el formulario
    const listaDePosteos = await PosteoModel.findAll();

    res.render("edit", {
      title: "Editar Posteo",
      posteo,
      listaDePosteos,
    });
  } catch (error) {
    console.error("Error al mostrar el formulario de edición:", error);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = { createPosteo, listPosteos, updatePosteo, mostrarFormularioEdicion };