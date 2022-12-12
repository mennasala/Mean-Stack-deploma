const router = require("express").Router();
const bookController = require("../controller/book_controller");

router.get("/", bookController.allBooks);

router.get("/add", bookController.addBook);
router.post("/addMyLogic", bookController.addMyLogic);

router.get("/edit/:id", bookController.editBooks);
router.post("/edit/:id", bookController.editBooksLogic);

router.get("/single/:id", bookController.single);
router.get("/delete/:id", bookController.del);

router.get("/search", bookController.search);
router.post("/search", bookController.searchLogic);

router.get("/sort/name", bookController.sortBooksByName);
router.get("/sort/number_pages", bookController.sortBooksByNumOfPages);

module.exports = router;
