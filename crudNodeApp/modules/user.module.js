heads = [
  { key: "id", default: Date.now() },
  { key: "name", default: null },
  { key: "age", default: null },
  { key: "email", default: null },
  { key: "status", default: false },
];
const { argv } = require("yargs");
const deal = require("./deal.module");
class User {
  static add(data) {
    console.log(data);
    const user = {};
    heads.forEach((head) => {
      if (head.default != null) user[head.key] = head.default;
      else user[head.key] = data[head.key];
    });
    console.log(user);
    const all = deal.readFromJson();
    all.push(user);
    deal.writeToJson(all);
  }
  static showAll() {
    const data = deal.readFromJson();
    data.forEach((el) => console.log(el));
  }
  static showSingle(data) {
    const fileData = deal.readFromJson();
    const singeUser = fileData.find((el) => {
      return el.id == data.id;
    });
    console.log(singeUser);
  }
  static edit(data) {
    const fileData = deal.readFromJson();
    const idx = fileData.findIndex((el) => {
      return el.id == data.id;
    });

    fileData[idx] = data;
    deal.writeToJson(fileData);
  }
  static del(data) {
    const fileData = deal.readFromJson();
    const idx = fileData.findIndex((el) => {
      return el.id == data.id;
    });
    //console.log(data.id);
    //console.log(idx);
    delete fileData[idx];
    //console.log(fileData);
    deal.writeToJson(fileData);
  }
}
module.exports = User;
