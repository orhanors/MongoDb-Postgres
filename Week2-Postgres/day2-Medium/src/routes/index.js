const router = require("express").Router();

const authorRouter = require("./author");
const articleRouter = require("./article");
const categoryRouter = require("./category");
const reviewRouter = require("./reviews");

router.use("/authors", authorRouter);
router.use("/articles", articleRouter);
router.use("/categories", categoryRouter);
router.use("/reviews", reviewRouter);
module.exports = router;
