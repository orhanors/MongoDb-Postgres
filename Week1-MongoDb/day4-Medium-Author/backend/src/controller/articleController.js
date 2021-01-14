const db = require("../models");
const mongoose = require("mongoose");
exports.articlePostController = async (req, res, next) => {
	try {
		const newArticle = new db.Article({ ...req.body });
		await newArticle.save();
		res.status(201).json({ success: true, data: newArticle });
	} catch (error) {
		console.log("Article POST controller error", error);
		next(error);
	}
};
exports.articleGetByAuthorIdController = async (req, res, next) => {
	try {
		const { authorId } = req.params;
		const articles = await db.Article.find({
			author: mongoose.Types.ObjectId(authorId),
		}).populate("author");

		if (articles)
			return res.status(200).json({ success: true, data: articles });

		const err = new Error("Author id not found");
		err.httpStatusCode = 404;
		next(err);
	} catch (error) {
		console.log("Article GetByAuthorId controller error", error);
		next(error);
	}
};
exports.articleGetController = async (req, res, next) => {
	try {
		const allArticles = await db.Article.find().populate("author");
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
		next(error);
	}
};

exports.articleGetByIdController = async (req, res, next) => {
	try {
		const { articleId } = req.params;

		const foundArticle = await db.Article.findOne({
			_id: articleId,
		}).populate("authors");

		if (foundArticle)
			return res.status(200).json({ success: true, data: foundArticle });
		const err = new Error("Article Not Found");
		err.httpStatusCode = 404;
		next(err);
	} catch (error) {
		console.log("Article GETById controller error", error);
		next(error);
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

		const err = new Error("Article Not Found");
		err.httpStatusCode = 404;
		next(err);
	} catch (error) {
		console.log("Article PUT controller error", error);
		next(error);
	}
};

exports.articleDeleteController = async (req, res, next) => {
	try {
		const { articleId } = req.params;
		const deletedUser = await db.Article.findByIdAndDelete(articleId);

		if (deletedUser)
			return res.status(201).json({ success: true, data: "OK" });

		const err = new Error("Article Not Found");
		err.httpStatusCode = 404;
		next(err);
	} catch (error) {
		console.log("Article DELETE controller error", error);
		next(error);
	}
};
