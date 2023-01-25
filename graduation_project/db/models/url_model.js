const mongoose = require("mongoose");

const urlsSchema = mongoose.Schema({
  url: {
    type: String,
  },
  method: {
    type: String,
  },
  param: [],
  query: [],
  roles: [
    {
      roleId: {
        type: String,
        required: true,
      },
    },
  ],
});

urlsSchema.methods.toJSON = function () {
  const data = this.toObject();
  delete data.__v;
  return data;
};
const Url = mongoose.model("Url", urlsSchema);
module.exports = Url;
