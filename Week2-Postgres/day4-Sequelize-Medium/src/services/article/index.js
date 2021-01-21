const router = require("express").Router();
const Article = require("../../db").Article;
const Author = require("../../db").Author;
const ApiError = require("../../classes/ApiError");

const {
	auhtorBodyValidator,
	validatorResult,
} = require("../../middlewares/validator");

router.post("/", async (req, res, next) => {
	try {
		const content = req.body;
		const newArticle = await Article.create(content);
		res.status(201).json({ data: newArticle });
	} catch (error) {
		console.log("Article POST error: ", error);
		next(error);
	}
});

router.get("/", async (req, res, next) => {
	try {
		const allArticles = await Article.findAll({
			include: Author,
		});
		res.status(200).json({ data: allArticles });
	} catch (error) {
		console.log("Article GET error: ", error);
		next(error);
	}
});

router.get("/:articleId", async (req, res, next) => {
	try {
		const foundArticle = await Article.findByPk(req.params.articleId);

		if (!foundArticle) throw new ApiError(404, "Article");
		res.status(200).json({ data: foundArticle });
	} catch (error) {
		console.log("Article GETById error: ", error);
		next(error);
	}
});

router.put("/:articleId", async (req, res, next) => {
	try {
		const updatedArticle = await Article.update(req.body, {
			returning: true,
			plain: true,
			where: { id: req.params.articleId },
		});
		console.log("UPPFDAFIDAS: ", updatedArticle);
		if (!updatedArticle) throw new ApiError(404, "Article");
		res.status(201).json({ data: updatedArticle[1] });
	} catch (error) {
		console.log("Article PUT error: ", error);
		if (error.name == "TypeError")
			return next(new ApiError(404, "Article"));
		next(error);
	}
});

router.delete("/:articleId", async (req, res, next) => {
	try {
		Article.destroy({ where: { id: req.params.articleId } }).then(
			(rowsDeleted) => {
				if (rowsDeleted > 0)
					return res.status(200).json({ data: "OK" });
				next(new ApiError(404, "Article"));
			}
		);
	} catch (error) {
		console.log("Article DELETE error: ", error);
		next(error);
	}
});
module.exports = router;
