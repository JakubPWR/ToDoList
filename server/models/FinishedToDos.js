module.exports = (sequelize, DataTypes) => {
  const FinishedToDos = sequelize.define("FinishedToDos", {
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
      allowNull: false,
    },
    finished: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
    },
  });

  return FinishedToDos;
};
