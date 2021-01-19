const router = require("express").Router();

const Model = require("../../helpers/model");
const ApiError = require("../../classes/ApiError");
const Categories = new Model("categories");

router.get("/", async (req, res, next) => {
	try {
		const response = await Categories.findOne();
		res.json({ data: response });
	} catch (e) {
		console.log(e);
		next(e);
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		const { rows } = await Categories.findById(req.params.id);
		if (!rows[0]) throw new ApiError(404, "Author");
		res.json({ data: rows[0] });
	} catch (e) {
		console.log(e);
		next(e);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const response = await Categories.save(req.body);
		res.json({ data: response });
	} catch (e) {
		console.log(e);
		next(e);
	}
});

router.put("/:id", async (req, res, next) => {
	try {
		const response = await Categories.findByIdAndUpdate(
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
		const response = await Categories.findByIdAndDelete(req.params.id);
		if (response.rowCount === 0) throw new ApiError(404, "Author");
		res.json({ data: "OK" });
	} catch (e) {
		console.log(e);
		next(e);
	}
});

module.exports = router;
