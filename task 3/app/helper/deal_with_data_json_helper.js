const fs = require("fs");
class DealWithDataJson {
  static writeToJson = (data) => {
    fs.writeFileSync("model/books.json", JSON.stringify(data));
  };
  static readFromJson = () => {
    let data;
    try {
      data = JSON.parse(fs.readFileSync("model/books.json"));
    } catch (err) {
      data = [];
    }
    return data;
  };
}
module.exports = DealWithDataJson;
