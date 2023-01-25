// const multer = require("multer");
// const path = require("path");

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // console.log(req);
//     cb(null, "public");
//   },
//   filename: (req, file, cb) => {
//     const extention = file.mimetype.split("/")[1];
//     cb(null, `images/${Date.now()}.${extention}`);
//   },
// });

// // const multerStorage = multer.memoryStorage();
// const multerFilter = (req, file, cb) => {
//   if (!file) throw new Error("No file Uploaded");
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//     return cb(new Error("only.png, .jpj, .jpeg format allowed"));
//   }
// };
// const upload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
// });

// module.exports = upload;

const multer = require("multer");
const path = require("path");

// add image to profile
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/");
  },
  filename: (req, file, cb) => {
    const extention = path.extname(file.originalname);
    const newImageName = Date.now() + "image" + extention;
    cb(null, newImageName);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("only.png, .jpj, .jpeg format allowed"));
    }
  },
});

module.exports = upload;
