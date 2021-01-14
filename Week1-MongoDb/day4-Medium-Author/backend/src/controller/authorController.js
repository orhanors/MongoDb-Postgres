const db = require("../models");

exports.authorGetController = async (req, res, next) => {
	try {
		const allAuthors = await db.Author.find().populate("Articles");

		if (allAuthors)
			return res.status(200).json({ success: true, data: allAuthors });
		next(error);
	} catch (error) {
		console.log("Author GET controller error", error);
		next(error);
	}
};

exports.authorGetByIdController = async (req, res, next) => {
	try {
		const { authorId } = req.params;

		//Calling static method,populates articles of author
		const author = await db.Author.findAndPopulateArticles(authorId);

		if (author)
			return res.status(200).json({ success: true, data: author });

		const err = new Error("Author Not Found!");
		err.httpStatusCode = 404;
		next(err);
	} catch (error) {
		console.log("Author GETById controller error", error);
		next(error);
	}
};

exports.authorPostController = async (req, res, next) => {
	try {
		const newAuthor = new db.Author({ ...req.body });
		await newAuthor.save();
		res.status(201).json({ success: true, data: newAuthor });
	} catch (error) {
		console.log("Author POST controller error", error);
		next(error);
	}
};

exports.authorPutController = async (req, res, next) => {
	try {
		const { authorId } = req.params;

		//When I do $set,it's changing coming fields and keeping old fields
		const editedAuthor = await db.Author.findByIdAndUpdate(
			authorId,
			{
				$set: { ...req.body },
			},
			{ runValidators: true, new: true }
		);

		if (!editedAuthor) {
			const err = new Error("Author Not Found");
			err.httpStatusCode = 404;
			next(err);
		}
		res.status(200).json({ success: true, data: editedAuthor });
	} catch (error) {
		console.log("Author PUT controller error", error.name);
		const err = new Error();
		if (error.name == "CastError") {
			err.message = "Author Not Found";
			err.httpStatusCode = 404;
			next(err);
		} else {
			next(err);
		}
	}
};

exports.authorDeleteController = async (req, res, next) => {
	try {
		const { authorId } = req.params;
		const author = await db.Author.findByIdAndDelete(authorId);

		if (author) return res.status(200).json({ success: true, data: "OK" });

		res.status(404).json({ success: false, errors: "Not Found" });
	} catch (error) {
		console.log("Author DELETE controller error", error);
		next(error);
	}
};
