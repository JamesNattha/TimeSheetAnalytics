module.exports = (sequelize, DataTypes) => {
  const TimeSheetDTs = sequelize.define(
    "TimeSheetDTs",
    {
      timesheetdt_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      work_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      work_type: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      work_code: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      project_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      work_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      detail: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      start_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      total: {
        type: DataTypes.INTEGER,
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
      is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      // options
      tableName: "TimeSheetDTs",
      timestamps: true,
      charset: "utf8",
      createdAt: "created_date", // Specify the custom column name for createdAt
      updatedAt: "updated_date",
      collate: "utf8_general_ci",
    }
  );

  TimeSheetDTs.associate = (models) => {
    TimeSheetDTs.belongsTo(models.TimeSheetHDs, {
      foreignKey: "timesheethd_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    TimeSheetDTs.belongsTo(models.Works, {
      foreignKey: "work_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return TimeSheetDTs;
};
