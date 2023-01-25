const mongoose = require("mongoose");

const BuildingSchema = mongoose.Schema({
  projectId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  buildingNumber: {
    type: Number,
  },
  buildingArea: {
    type: String,
  },
  numOfFloors: {
    type: Number,
  },
  //   numOfUnits: {
  //     type: Number,
  //     default: this.numOfFloors * 4,
  //   },
  images: [],
});
BuildingSchema.methods.toJSON = function () {
  const data = this.toObject();
  delete data.__v;
  return data;
};
const Building = mongoose.model("Building", BuildingSchema);
module.exports = Building;
