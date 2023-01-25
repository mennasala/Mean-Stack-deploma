const mongoose = require("mongoose");

const roleScema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
});
// roleScema.virtual("myUserRole", {
//   ref: "User",
//   localField: "_id",
//   foreignField: "roleId",
// });
// urlsSchema.virtual("myUrlRole", {
//   ref: "Url",
//   localField: "_id",
//   foreignField: "roles.roleId",
// });
roleScema.methods.toJSON = function () {
  const data = this.toObject();
  delete data.__v;
  return data;
};
const Role = mongoose.model("Role", roleScema);
module.exports = Role;
