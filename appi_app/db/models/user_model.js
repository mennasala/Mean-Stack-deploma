const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

//const User = mongoose.model("User",
const userScema = mongoose.Schema(
  {
    fName: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      minLength: 5,
      maxLength: 25,
    },
    lName: {
      type: String,
      trim: true,
      lowercase: true,
      minLength: 5,
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
      default:false
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
    },
    phoneNumber: {
      type: String,
      vaidate(value) {
        if (!validator.isMobilePhone(value, "ar-EG")) {
          throw new Error("invalid phone Numbers");
        }
      },
    },
    adresses: [
      {
        adressType: {
          type: String,
          trim: true,
          required: true,
        },
        details: {},
      },
    ],
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true } //عشان كل ما اعمل سيف هيسجل الوقت والتاريخ
);
userScema.virtual("myPosts", {
  ref: "Post",
  localField: "_id",
  foreignField: "userId",
});
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
userScema.methods.toJSON = function () {
  const data = this.toObject();
  delete data.__v;
  delete data.password;
  delete data.tokens;
  return data;
};
userScema.methods.generateToken = async function () {
  const userData = this;
  const token = jwt.sign({ _id: userData._id }, process.env.tokenPass);
  userData.tokens = userData.tokens.concat({ token });
  await userData.save();
  return token;
};
const User = mongoose.model("User", userScema);

module.exports = User;
