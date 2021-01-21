module.exports = (sequelize, DataTypes) => {
	const Author = sequelize.define(
		"author",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			firstName: { type: DataTypes.STRING, allowNull: false },
			lastName: { type: DataTypes.STRING, allowNull: false },
			email: { type: DataTypes.STRING, allowNull: false },
			username: { type: DataTypes.STRING, allowNull: false },
		},
		{ timestamps: false }
	);

	Author.associate = (models) => {
		Author.hasMany(models.Reaction);
		Author.hasOne(models.Article);
	};
	return Author;
};
