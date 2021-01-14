const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
	name: { type: String, required: true },
	surname: { type: String, required: true },
	username: { type: String },
	articles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }],
});

AuthorSchema.static("findAndPopulateArticles", async function (authorId) {
	const authorWithArticles = await this.findById(authorId).populate(
		"articles"
	);
	if (!authorWithArticles) return false;
	return authorWithArticles;
});

const Author = mongoose.model("Author", AuthorSchema);
module.exports = Author;
