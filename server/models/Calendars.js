module.exports = (sequelize, DataTypes) => {
  const Calendars = sequelize.define(
    "Calendars",
    {
      calendar_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      calendar_title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      text_color: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      calendar_type: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      all_day: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      color: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      detail: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      created_by: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      // options
      tableName: "Calendars",
      timestamps: true,
      charset: "utf8",
      createdAt: "created_date", // Specify the custom column name for createdAt
      updatedAt: "updated_date",
      collate: "utf8_general_ci",
    }
  );
  return Calendars;
};
