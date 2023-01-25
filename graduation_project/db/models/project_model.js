const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  projectType: {
    type: String,
  },
  projectName: {
    type: String,
  },
  images: [],
});
projectSchema.methods.toJSON = function () {
  const data = this.toObject();
  delete data.__v;
  return data;
};
const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
