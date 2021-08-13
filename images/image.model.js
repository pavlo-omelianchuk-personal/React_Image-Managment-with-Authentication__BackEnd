const mongoose = require("mongoose");
const SchemaImg = mongoose.Schema;

const schemaImg = new SchemaImg({
  filename: { type: String, unique: true, required: true },
  path: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
});

schemaImg.set("toJSON", {
  virtuals: true,
  versionKey: false,
});

module.exports = mongoose.model("Image", schemaImg);
