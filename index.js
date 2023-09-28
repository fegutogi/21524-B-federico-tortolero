const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("node:path");

const { sequelize } = require("./database");

const { PosteoModel } = require("./src/models/Posteos");

const app = express();

const { mostrarFormularioEdicion } = require("./src/controllers/posteos.controllers");

// Conectamos los controllers
app.use(express.json());

// Habilitamos el envío desde un formulario de html
app.use(express.urlencoded({ extended: false }));

// Middlewares
app.use(cors());
app.use(morgan("dev"));

app.use(express.static(__dirname + "/public"));

app.set("views", __dirname + "/src/views");

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const posteos = await PosteoModel.findAll();

  res.render("index", {
    title: "Lista de Posteos",
    listaDePosteos: posteos.reverse(),
  });
});

app.get("/new", async (req, res) => {
  res.render("new");
});

app.get("/edit", mostrarFormularioEdicion);

app.get("/edit/:id", async (req, res) => {
  try {
    const posteoId = req.params.id;
    const posteo = await PosteoModel.findByPk(posteoId);
    const listaDePosteos = await PosteoModel.findAll();

    if (!posteo) {
      return res.send("No se encontró el posteo para editar");
    }

    res.render("edit", {
      title: "Editar Posteo",
      posteo,
      listaDePosteos,
    });
  } catch (error) {
    console.error("Error al mostrar el formulario de edición:", error);
    res.status(500).send("Error interno del servidor");
  }
});

app.get("/delete/:id", async (req, res) => {
  try {
    const posteoId = req.params.id;
    const posteo = await PosteoModel.findByPk(posteoId);

    if (!posteo) {
      return res.send("No se encontró el posteo para eliminar");
    }

    await posteo.destroy();
    res.redirect("/");
  } catch (error) {
    console.error("Error al eliminar el posteo:", error);
    res.status(500).send("Error interno del servidor");
  }
});


app.use("/posteos", require("./src/routes/posteos.routers"));

app.listen(4282, () => {
  sequelize
    .sync({ force: false })
    .then(() => console.log("db online"))
    .catch((err) => console.log(err));
  console.log("server on port 4282");
});