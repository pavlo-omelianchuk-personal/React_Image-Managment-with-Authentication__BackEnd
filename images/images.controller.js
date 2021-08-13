const express = require("express");
const router = express.Router();
const imageService = require("./image.service");

// routes
router.post("/", register);
router.get("/", getAll);
router.get("/current", getCurrent);
router.get("/:id", getById);
router.delete("/:id", _delete);

module.exports = router;

function register(req, res, next) {
  imageService
    .create(req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function getAll(req, res, next) {
  imageService
    .getAll()
    .then((images) => res.json(images))
    .catch((err) => next(err));
}

function getCurrent(req, res, next) {
  imageService
    .getById(req.image.sub)
    .then((image) => (image ? res.json(image) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function getById(req, res, next) {
  imageService
    .getById(req.params.id)
    .then((image) => (image ? res.json(image) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function _delete(req, res, next) {
  imageService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err));
}
