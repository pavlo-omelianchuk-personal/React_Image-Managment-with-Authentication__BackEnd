const bcrypt = require("bcryptjs");
const db = require("_helpers/db");
const Image = db.Image;

module.exports = {
  getAll,
  getById,
  create,
  delete: _delete,
};

async function getAll() {
  return await Image.find();
}

async function getById(id) {
  return await Image.findById(id);
}

async function create(imageParam) {
  const image = new Image(imageParam);

  // save image
  await image.save();
}

async function _delete(id) {
  await Image.findByIdAndRemove(id);
}
