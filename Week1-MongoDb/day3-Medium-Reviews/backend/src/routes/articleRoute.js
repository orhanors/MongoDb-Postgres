const {
	articlePostController,
	articleGetController,
	articleGetByIdController,
	articleDeleteController,
	articlePutController,
} = require("../controller/articleController");

const {
	articleReviewGetController,
	articleReviewGetByIdController,
	articleReviewPostController,
	articleReviewPutController,
	articleReviewDeleteController,
} = require("../controller/articleReviewController");
const {
	articleBodyValidator,
	validatorResult,
	reviewBodyValidator,
} = require("../middlewares/validator");

const articleRouter = require("express").Router();

// *** ARTICLE ***
articleRouter.get("/", articleGetController);
articleRouter.get("/:articleId", articleGetByIdController);
articleRouter.post(
	"/",
	articleBodyValidator,
	validatorResult,
	articlePostController
);
articleRouter.put("/", articlePutController);
articleRouter.delete("/", articleDeleteController);

// *** EMBEDDED REVİEWS ***

//returns all the reviews for the specified article
articleRouter.get("/:articleId/reviews", articleReviewGetController);

//returns a single review for the specified article
articleRouter.get(
	"/:articleId/reviews/:reviewId",
	articleReviewGetByIdController
);

//adds a new review for the specified article
articleRouter.post(
	"/:articleId",
	reviewBodyValidator,
	validatorResult,
	articleReviewPostController
);

//edit the review belonging to the specified article
articleRouter.put(
	"/:articleId/reviews/:reviewId",
	reviewBodyValidator,
	validatorResult,
	articleReviewPutController
);

//delete the review belonging to the specified article
articleRouter.delete(
	"/:articleId/reviews/:reviewId",
	articleReviewDeleteController
);

module.exports = articleRouter;
