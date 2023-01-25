require("dotenv").config();
const app = require("./app/app");

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
