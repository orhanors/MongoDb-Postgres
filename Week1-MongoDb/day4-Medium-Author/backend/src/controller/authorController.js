const db = require("../models");

exports.authorGetController = async (req, res, next) => {
	try {
		const allAuthors = await db.Author.find().populate("Articles");

		if (allAuthors)
			return res.status(200).json({ success: true, data: allAuthors });
		res.status(500).json({
			success: false,
			errors: "Internal Server Error",
		});
	} catch (error) {
		console.log("Author GET controller error", error);
		res.status(500).json({
			success: false,
			errors: "Internal Server Error",
		});
	}
};

exports.authorGetByIdController = async (req, res, next) => {
	try {
		const { authorId } = req.params;

		//Calling static method,populates articles of author
		const author = await db.Author.findAndPopulateArticles(authorId);

		//TODO If there is an error, it's directly going to catch statement
		if (author)
			return res.status(200).json({ success: true, data: author });
		res.status(404).json({ success: false, errors: "Author Not Found!" });
	} catch (error) {
		console.log("Author GETById controller error", error);
		res.status(500).json({
			success: false,
			errors: "Internal Server Error",
		});
	}
};

exports.authorPostController = async (req, res, next) => {
	try {
		const newAuthor = new db.Author({ ...req.body });
		await newAuthor.save();
		res.status(201).json({ success: true, data: newAuthor });
	} catch (error) {
		console.log("Author POST controller error", error);
		res.status(500).json({
			success: false,
			errors: "Internal Server Error",
		});
	}
};

exports.authorPutController = async (req, res, next) => {
	try {
		const { authorId } = req.params;

		//When I do $set,it's changing coming fields and keeping old fields
		const edited = await db.Author.findByIdAndUpdate(
			authorId,
			{
				$set: { ...req.body },
			},
			{ runValidators: true, new: true }
		);
		console.log("edited is ", edited);
		//TODO Create a pre hook to check this error
		if (!edited)
			return res
				.send(404)
				.json({ success: false, errors: "Author Not Found" });

		res.status(200).json({ success: true, data: edited });
	} catch (error) {
		console.log("Author PUT controller error", error);
		//Check error here
		res.status(500).json({
			success: false,
			errors: "Internal Server Error",
		});
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
		res.status(500).json({
			success: false,
			errors: "Internal Server Error",
		});
	}
};
