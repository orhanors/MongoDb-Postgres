module.exports = (sequelize, DataTypes) => {
	const Article = sequelize.define(
		"article",
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			headLine: { type: DataTypes.STRING, allowNull: false },
			subHead: { type: DataTypes.STRING, allowNull: false },
			content: { type: DataTypes.STRING, allowNull: false },
			cover: { type: DataTypes.STRING, allowNull: false },
		},
		{ timestamps: false }
	);

	Article.associate = (models) => {
		Article.hasMany(models.Reaction);
		Article.belongsTo(models.Author);
		Article.belongsTo(models.Category);
	};

	return Article;
};
