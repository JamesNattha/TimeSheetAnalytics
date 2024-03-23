module.exports = (sequelize, DataTypes) => {
  const TimeSheetHDs = sequelize.define(
    "TimeSheetHDs",
    {
      timesheethd_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      timesheet_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: 0,
      },
      created_by: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      updated_by: {
        type: DataTypes.UUID,
        allowNull: true,
      },
    },
    {
      // options
      tableName: "TimeSheetHDs",
      timestamps: true,
      charset: "utf8",
      createdAt: "created_date", // Specify the custom column name for createdAt
      updatedAt: "updated_date",
      collate: "utf8_general_ci",
    }
  );

  TimeSheetHDs.associate = (models) => {
    TimeSheetHDs.hasMany(models.TimeSheetDTs, {
      foreignKey: "timesheethd_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    TimeSheetHDs.belongsTo(models.Users, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return TimeSheetHDs;
};
