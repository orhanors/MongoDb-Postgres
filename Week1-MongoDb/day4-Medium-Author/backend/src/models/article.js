const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema(
	{
		headLine: { type: String, required: true },
		subHead: { type: String },
		content: { type: String, required: true },
		category: { name: { type: String }, img: { type: String } },
		author: { name: { type: String }, img: { type: String } },
		cover: { type: String },
		reviews: [{ text: { type: String }, user: { type: String } }],
		claps: [{ type: mongoose.Schema.Types.ObjectId, ref: "author" }],
	},
	{ timestamps: true }
);

ArticleSchema.virtual("clapSize").get(function () {
	return this.claps.length;
});

const Article = mongoose.model("Article", ArticleSchema, "Articles");

module.exports = Article;
