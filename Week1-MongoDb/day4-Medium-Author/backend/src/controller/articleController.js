const db = require("../models");

exports.articlePostController = async (req, res, next) => {
	try {
		const newArticle = new db.Article({ ...req.body });
		await newArticle.save();
		res.status(201).json({ success: true, data: newArticle });
	} catch (error) {
		console.log("Article POST controller error", error);
		res.status(500).json({
			success: false,
			errors: "Internal Server Error",
		});
	}
};

exports.articleGetController = async (req, res, next) => {
	try {
		const allArticles = await db.Article.find();
		if (req.query?.author) {
			const { author } = req.query;
			const authorArticles = await db.Article.find({
				"author.name": "orhanors",
			});
			return res
				.status(200)
				.json({ success: true, data: authorArticles });
		}
		res.status(200).json({ success: true, data: allArticles });
	} catch (error) {
		console.log("Article GET controller error", error);
		res.status(500).json({
			success: false,
			errors: "Internal Server Error",
		});
	}
};

exports.articleGetByIdController = async (req, res, next) => {
	try {
		const { articleId } = req.params;

		const foundArticle = await db.Article.findById(articleId);

		if (foundArticle)
			return res.status(200).json({ success: true, data: foundArticle });
		res.status(404).json({ status: false, errors: "Article not found" });
	} catch (error) {
		console.log("Article GETById controller error", error);
		res.status(500).json({
			success: false,
			errors: "Internal Server Error",
		});
	}
};

exports.articlePutController = async (req, res, next) => {
	try {
		const { articleId } = req.params;

		const modifiedArticle = await db.Article.findByIdAndUpdate(
			articleId,
			req.body,
			{ new: true, runValidators: true }
		);

		if (foundArticle)
			return res
				.status(201)
				.json({ success: true, data: modifiedArticle });

		res.status(404).json({
			success: false,
			errors: "Article not found",
		});
	} catch (error) {
		console.log("Article PUT controller error", error);
		res.status(500).json({
			success: false,
			errors: "Internal Server Error",
		});
	}
};

exports.articleDeleteController = async (req, res, next) => {
	try {
		const { articleId } = req.params;
		const deletedUser = await db.Article.findByIdAndDelete(articleId);

		if (deletedUser)
			return res.status(201).json({ success: true, data: "OK" });

		res.status(404).json({
			success: false,
			errors: "Article not found",
		});
	} catch (error) {
		console.log("Article DELETE controller error", error);
		res.status(500).json({
			success: false,
			errors: "Internal Server Error",
		});
	}
};
