const router = require("express").Router();

const Model = require("../../helpers/model");
const ApiError = require("../../classes/ApiError");
const Articles = new Model("articles");

router.get("/", async (req, res, next) => {
	try {
		const response = await Articles.findOne();
		res.json({ data: response });
	} catch (e) {
		console.log(e);
		next(e);
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		const { rows } = await Articles.findById(req.params.id);
		if (!rows[0]) throw new ApiError(404, "Author");
		res.json({ data: rows[0] });
	} catch (e) {
		console.log(e);
		next(e);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const response = await Articles.save(req.body);
		res.json({ data: response });
	} catch (e) {
		console.log(e);
		next(e);
	}
});

router.put("/:id", async (req, res, next) => {
	try {
		const response = await Articles.findByIdAndUpdate(
			req.params.id,
			req.body
		);

		if (response.rowCount === 0) throw new ApiError(404, "Author");
		res.json({ data: response });
	} catch (e) {
		console.log(e);
		next(e);
	}
});

router.delete("/:id", async (req, res, next) => {
	try {
		const response = await Articles.findByIdAndDelete(req.params.id);
		if (response.rowCount === 0) throw new ApiError(404, "Author");
		res.json({ data: "OK" });
	} catch (e) {
		console.log(e);
		next(e);
	}
});

module.exports = router;
