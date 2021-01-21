const router = require("express").Router();
const Author = require("../../db").Author;
const ApiError = require("../../classes/ApiError");

const {
	auhtorBodyValidator,
	validatorResult,
} = require("../../middlewares/validator");

router.post(
	"/",
	auhtorBodyValidator,
	validatorResult,
	async (req, res, next) => {
		try {
			const content = req.body;
			const newArticle = await Author.create(content);
			res.status(201).json({ data: newArticle });
		} catch (error) {
			console.log("Author POST error: ", error);
			next(error);
		}
	}
);

router.get("/", async (req, res, next) => {
	try {
		const allAuthors = await Author.findAll();
		res.status(200).json({ data: allAuthors });
	} catch (error) {
		console.log("Author GET error: ", error);
		next(error);
	}
});

router.get("/:authorId", async (req, res, next) => {
	try {
		const foundAuthor = await Author.findByPk(req.params.authorId);

		if (!foundAuthor) throw new ApiError(404, "Author");
		res.status(200).json({ data: foundAuthor });
	} catch (error) {
		console.log("Author GETById error: ", error);
		next(error);
	}
});

router.put(
	"/:authorId",
	auhtorBodyValidator,
	validatorResult,
	async (req, res, next) => {
		try {
			const updatedAuthor = await Author.update(req.body, {
				returning: true,
				plain: true,
				where: { id: req.params.authorId },
			});
			console.log("UPPFDAFIDAS: ", updatedAuthor);
			if (!updatedAuthor) throw new ApiError(404, "Author");
			res.status(201).json({ data: updatedAuthor[1] });
		} catch (error) {
			console.log("Author PUT error: ", error);
			if (error.name == "TypeError")
				return next(new ApiError(404, "Author"));
			next(error);
		}
	}
);

router.delete("/:authorId", async (req, res, next) => {
	try {
		Author.destroy({ where: { id: req.params.authorId } }).then(
			(rowsDeleted) => {
				if (rowsDeleted > 0)
					return res.status(200).json({ data: "OK" });
				next(new ApiError(404, "Author"));
			}
		);
	} catch (error) {
		console.log("Author DELETE error: ", error);
		next(error);
	}
});
module.exports = router;
