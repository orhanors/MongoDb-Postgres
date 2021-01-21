const router = require("express").Router();
const Reaction = require("../../db").Reaction;
const Author = require("../../db").Author;
const Article = require("../../db").Article;
const ApiError = require("../../classes/ApiError");

router.post("/", async (req, res, next) => {
	try {
		const content = req.body;
		const newReaction = await Reaction.create(content);
		res.status(201).json({ data: newReaction });
	} catch (error) {
		console.log("Reaction POST error: ", error);
		next(error);
	}
});

router.get("/", async (req, res, next) => {
	try {
		const allReactions = await Reaction.findAll({
			include: [Author, Article],
		});
		res.status(200).json({ data: allReactions });
	} catch (error) {
		console.log("Reaction GET error: ", error);
		next(error);
	}
});

router.get("/:reactionId", async (req, res, next) => {
	try {
		const foundReaction = await Reaction.findByPk(req.params.reactionId);

		if (!foundReaction) throw new ApiError(404, "Reaction");
		res.status(200).json({ data: foundReaction });
	} catch (error) {
		console.log("Reaction GETById error: ", error);
		next(error);
	}
});

router.put("/:reactionId", async (req, res, next) => {
	try {
		const updatedReaction = await Reaction.update(req.body, {
			returning: true,
			plain: true,
			where: { id: req.params.reactionId },
		});
		console.log("UPPFDAFIDAS: ", updatedReaction);
		if (!updatedReaction) throw new ApiError(404, "Reaction");
		res.status(201).json({ data: updatedReaction[1] });
	} catch (error) {
		console.log("Reaction PUT error: ", error);
		if (error.name == "TypeError")
			return next(new ApiError(404, "Reaction"));
		next(error);
	}
});

router.delete("/:reactionId", async (req, res, next) => {
	try {
		Reaction.destroy({ where: { id: req.params.reactionId } }).then(
			(rowsDeleted) => {
				if (rowsDeleted > 0)
					return res.status(200).json({ data: "OK" });
				next(new ApiError(404, "Reaction"));
			}
		);
	} catch (error) {
		console.log("Reaction DELETE error: ", error);
		next(error);
	}
});
module.exports = router;
