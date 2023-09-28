const { Router } = require("express");
const {
    createPosteo,
    listPosteos,
    updatePosteo,
    mostrarFormularioEdicion,
} = require("../controllers/posteos.controllers");

const router = Router();

router.get("/", listPosteos);
router.post("/", createPosteo);
router.get("/edit/:id", mostrarFormularioEdicion);
router.post("/:id", updatePosteo);

module.exports = router;
