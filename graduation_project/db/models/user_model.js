const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { float } = require("webidl-conversions");
const { ObjectId } = require("bson");
const userScema = mongoose.Schema(
  {
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      default: ObjectId("63d940572d4f3d1dc4f7ceda"),
      ref: "Role",
    },
    roleName: {
      type: String,
      default: "regular-user",
    },
    fName: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      minLength: 3,
      maxLength: 25,
    },
    lName: {
      type: String,
      trim: true,
      lowercase: true,
      minLength: 3,
      maxLength: 25,
      required: true,
    },
    age: {
      type: Number,
      min: 21,
      max: 60,
      default: 21,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      unique: true,
      vaidate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("invalid Email");
        }
      },
    },
    status: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
      //match: "",
    },
    gender: {
      type: String,
      trim: true,
      lowercase: true,
      enum: ["male", "female"],
    },
    dOfBirth: {
      type: Date,
      default: Date.now(),
    },
    phoneNumber: {
      type: String,
      required: true,
      vaidate(value) {
        if (!validator.isMobilePhone(value, "ar-EG")) {
          throw new Error("invalid phone Numbers");
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    boughts: [
      {
        unitId: {
          type: mongoose.Schema.Types.ObjectId,
        },
        unitPrice: {
          type: Number,
        },
        howMuchPaid: {
          type: Number,
        },
        howMuchRemain: {
          type: Number,
        },
        numberOfRemainingInstallments: {
          type: Number,
        },
        amountToPay: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);
userScema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 8);
  }
});
userScema.statics.loginUser = async (email, password) => {
  const userData = await User.findOne({ email });
  if (!userData) throw new Error("invalid Email");
  const validatePassword = await bcryptjs.compare(password, userData.password);
  if (!validatePassword) throw new Error("invalid password");
  return userData;
};
userScema.methods.generateToken = async function () {
  const userData = this;
  const token = jwt.sign({ _id: userData._id }, process.env.tokenPass);
  userData.tokens = userData.tokens.concat({ token });
  await userData.save();
  return token;
};
userScema.methods.toJSON = function () {
  const data = this.toObject();
  delete data.__v;
  delete data.password;
  delete data.tokens;
  return data;
};
const User = mongoose.model("User", userScema);

module.exports = User;
