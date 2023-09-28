const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("node:path");

const { sequelize } = require("./database");

const { PosteoModel } = require("./src/models/Posteos");

const app = express();

// Conectamos los controllers
app.use(express.json());

// Habilitamos el envío desde un formulario de html
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(morgan("dev"));

app.set("views", __dirname + "/src" + "/views");

app.use(express.static(__dirname + "/public"));

app.set("view engine", "posteos_db");

app.get("/", async (req, res) => {
  const posteos = await PosteoModel.findAll();

  res.render("/index", {
    title: "Pagina princial",
    listaDePosteos: posteos.reverse(),
  });
});

app.get("/new", async (req, res) => {
  res.render("new");
});

app.get("/edit/:id", async (req, res) => {
  const posteoId = req.params.id;

  const posteo = await PosteoModel.findByPk(posteoId);

  res.render("edit", { posteo });
});

app.use("/posteos", require("./src/routes/posteos.routers"));

app.listen(4282, () => {
  sequelize
    .sync({ force: false })
    .then(() => console.log("db online"))
    .catch((err) => console.log(err));
  console.log("server on port 4282");
});