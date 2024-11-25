module.exports = (sequelize, DataTypes) => {
  const ToDoLists = sequelize.define("ToDoLists", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    owner: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
  });

  ToDoLists.associate = (models) => {
    ToDoLists.belongsTo(models.Users, {
      foreignKey: "owner",
      onDelete: "CASCADE",
    });
    ToDoLists.hasMany(models.ToDos, {
      foreignKey: "listId",
      onDelete: "CASCADE",
    });
    ToDoLists.hasMany(models.FinishedToDos, {
      foreignKey: "listId",
      onDelete: "CASCADE",
    });
  };

  return ToDoLists;
};
