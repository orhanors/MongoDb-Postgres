const {
	articlePostController,
	articleGetController,
	articleGetByIdController,
	articleDeleteController,
	articlePutController,
} = require("../controller/articleController");
const {
	articleBodyValidator,
	validatorResult,
} = require("../middlewares/validator");

const articleRouter = require("express").Router();

articleRouter.get("/", articleGetController);
articleRouter.get("/articleId", articleGetByIdController);
articleRouter.post(
	"/",
	articleBodyValidator,
	validatorResult,
	articlePostController
);
articleRouter.put("/", articlePutController);
articleRouter.delete("/", articleDeleteController);

module.exports = articleRouter;
