module.exports = (sequelize, DataTypes) => {
	const Reaction = sequelize.define(
		"reaction",
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			text: { type: DataTypes.STRING, allowNull: false },
			rate: { type: DataTypes.STRING, allowNull: false },
		},
		{ timestamps: false }
	);

	Reaction.associate = (models) => {
		Reaction.belongsTo(models.Author);
		Reaction.belongsTo(models.Article);
	};
	return Reaction;
};
