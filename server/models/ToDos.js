module.exports = (sequelize, DataTypes) => {
  const ToDos = sequelize.define("ToDos", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AddDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    FinishDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    finished: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
    },
    listId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "ToDoLists",
        key: "id",
      },
    },
  });

  ToDos.associate = (models) => {
    ToDos.belongsTo(models.ToDoLists, {
      foreignKey: "listId",
      onDelete: "CASCADE",
    });
  };

  return ToDos;
};
