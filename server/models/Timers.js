module.exports = (sequelize, DataTypes) => {
  const Timers = sequelize.define(
    "Timers",
    {
      timer_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      work_id: {
        type: DataTypes.UUID, // Use FLOAT data type for float values
        allowNull: true,
      },
      stopwatch: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      timestamps: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      sum_time: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0, // Use the current timestamp as the default
      },
      action_status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: 0,
      },
      created_by: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      // options
      tableName: "Timers",
      timestamps: true,
      charset: "utf8",
      createdAt: "created_date", // Specify the custom column name for createdAt
      updatedAt: "updated_date",
      collate: "utf8_general_ci",
    }
  );
  Timers.associate = (models) => {
    Timers.belongsTo(models.Works, {
      foreignKey: "work_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Timers.belongsTo(models.Mondays, {
      foreignKey: "work_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };
  return Timers;
};
