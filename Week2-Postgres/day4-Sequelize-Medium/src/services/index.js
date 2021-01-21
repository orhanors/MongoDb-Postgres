const router = require("express").Router();
const articleRoute = require("./article");
const authorRoute = require("./author");
const reactionRoute = require("./reaction");
router.use("/articles", articleRoute);
router.use("/authors", authorRoute);
router.use("/reactions", reactionRoute);
module.exports = router;
