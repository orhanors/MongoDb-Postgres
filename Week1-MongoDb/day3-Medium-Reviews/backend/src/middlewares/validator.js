const { check, validationResult } = require("express-validator");

exports.articleBodyValidator = [
	check("headLine")
		.exists()
		.withMessage("Artitle title should be exist")
		.notEmpty()
		.withMessage("Article title shouldn't be empty"),

	check("content")
		.exists()
		.withMessage("Artitle content area should be exist")
		.notEmpty()
		.withMessage("Article content area shouldn't be empty"),

	check("category")
		.exists()
		.withMessage("Artitle category area should be exist")
		.notEmpty()
		.withMessage("Article category area shouldn't be empty"),
];

exports.reviewBodyValidator = [
	check("text")
		.exists()
		.withMessage("Review text should be exist")
		.notEmpty()
		.withMessage("Review text shouldn't be empty"),

	check("user")
		.exists()
		.withMessage("Review user should be exist")
		.notEmpty()
		.withMessage("Review user shouldn't be empty"),
];
exports.validatorResult = (req, res, next) => {
	const result = validationResult(req);
	const hasError = !result.isEmpty();

	if (hasError) {
		const errorMsg = result.array()[0].msg;
		return res.status(400).json({ success: false, errors: errorMsg });
	}
	next();
};
