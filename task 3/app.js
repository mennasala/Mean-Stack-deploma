require("dotenv").config();
const app = require("./app/src.js");

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT} successfully`);
});
