const mongoose = require("mongoose");

const unitSchema = mongoose.Schema({
  buildingtId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  unitName: {
    type: String,
  },
  unitPrice: {
    type: Number,
  },
  unitAvailability: {
    type: Boolean,
  },
  images: [],
});
unitSchema.methods.toJSON = function () {
  const data = this.toObject();
  delete data.__v;
  return data;
};
const Unit = mongoose.model("Unit", unitSchema);
module.exports = Unit;
