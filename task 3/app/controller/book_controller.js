const dealHelper = require("../helper/deal_with_data_json_helper");
const dataHelper = require("../helper/functions_helper");
const { param } = require("../src");
class Book {
  static allBooks = (req, res) => {
    const books = dealHelper.readFromJson();
    res.render("all_books", {
      pageTitle: "all Books",
      books,
      hasBook: books.length,
    });
  };
  static addBook = (req, res) => {
    res.render("add_book", {
      pageTitle: "add Books",
    });
  };
  static addMyLogic = (req, res) => {
    console.log(req.method);
    let book = { id: Date.now(), ...req.body };
    const all = dealHelper.readFromJson();
    all.push(book);
    dealHelper.writeToJson(all);
    res.redirect("/");
  };
  static editBooks = (req, res) => {
    const all = dealHelper.readFromJson();
    const result = dataHelper.getId(all, "id", req.params.id);
    res.render("edit", {
      pageTitle: "edit page",
      result: all[result],
    });
  };
  static editBooksLogic = (req, res) => {
    const all = dealHelper.readFromJson();
    const result = dataHelper.getId(all, "id", req.params.id);
    //console.log(req.params.id);
    if (result == -1)
      return res.render("err404", { pageTitle: "invalid", err: "invalid id" });
    const newBook = { id: req.params.id, ...req.body };
    all[result] = newBook;
    dealHelper.writeToJson(all);
    res.redirect(`/single/${req.params.id}`);
  };
  static single = (req, res) => {
    const all = dealHelper.readFromJson();
    const result = dataHelper.getId(all, "id", req.params.id);
    if (result == -1)
      return res.render("err404", { pageTitle: "invalid", err: "invalid id" });
    res.render("single", {
      pageTitle: "single page",
      result: all[result],
    });
  };
  static del = (req, res) => {
    const all = dealHelper.readFromJson();
    const result = dataHelper.getId(all, "id", req.params.id);
    if (result == -1)
      return res.render("err404", { pageTitle: "invalid", err: "invalid id" });
    if (result != -1) all.splice(result, 1);
    dealHelper.writeToJson(all);
    res.redirect("/");
  };
  static search = (req, res) => {
    res.render("search", {
      pageTitle: "search Books",
    });
  };
  static searchLogic = (req, res) => {
    const book_Name = req.body;
    const condition = new RegExp(book_Name.bookName);
    const all = dealHelper.readFromJson();
    const result = all.filter(function (el) {
      return condition.test(el.bookName);
    });
    res.render("result_search", {
      pageTitle: "search Books",
      books: result,
      hasBook: result.length,
    });
  };
  static sortBooksByName = (req, res) => {
    let all = dealHelper.readFromJson();
    all = all.sort(function (a, b) {
      const x = a.bookName,
        y = b.bookName;
      if (x > y) {
        return 1;
      }
      if (x < y) {
        return -1;
      }
      return 0;
    });
    dealHelper.writeToJson(all);
    res.redirect("/");
  };
  static sortBooksByNumOfPages = (req, res) => {
    let all = dealHelper.readFromJson();
    all = all.sort(function (a, b) {
      return a.numberOfPages - b.numberOfPages;
    });
    dealHelper.writeToJson(all);
    res.redirect("/");
  };
}

module.exports = Book;
