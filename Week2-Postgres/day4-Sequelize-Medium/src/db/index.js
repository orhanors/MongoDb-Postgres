const { Sequelize, DataTypes } = require("sequelize");
const Author = require("./models/author");
const Article = require("./models/article");
const Category = require("./models/category");
const Reaction = require("./models/reaction");

const { PGDATABASE, PGUSER, PGPASSWORD, PGHOST } = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
	host: PGHOST,
	dialect: "postgres",
});

const models = {
	Author: Author(sequelize, DataTypes),
	Article: Article(sequelize, DataTypes),
	Reaction: Reaction(sequelize, DataTypes),
	Category: Category(sequelize, DataTypes),
};

Object.keys(models).forEach((modelName) => {
	if ("associate" in models[modelName]) {
		models[modelName].associate(models);
	}
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

sequelize
	.authenticate()
	.then(() => console.log("Connected to DB..."))
	.catch((e) => console.log("DB connection error: ", e));

module.exports = models;
