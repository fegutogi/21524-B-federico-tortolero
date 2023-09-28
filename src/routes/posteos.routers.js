const { Router } = require("express");
const {
    createPosteo,
    listPosteos,
    updatePosteo,
} = require("../controllers/posteos.controllers");

const router = Router();

router.get("/", listPosteos);
router.post("/", createPosteo);
router.post("/:id", updatePosteo);

module.exports = router;
