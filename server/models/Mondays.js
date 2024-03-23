module.exports = (sequelize, DataTypes) => {
  const Mondays = sequelize.define(
    "Mondays",
    {
      work_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      work_code: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      work_level: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      project_subid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      monday_id: {
        type: DataTypes.STRING(255),
        primaryKey: true,
        allowNull: false,
      },
      users_type: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      monday_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      owner: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      monday_status: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      point: {
        type: DataTypes.INTEGER,
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
      tableName: "Mondays",
      timestamps: true,
      charset: "utf8",
      createdAt: "created_date", // Specify the custom column name for createdAt
      updatedAt: "updated_date",
      collate: "utf8_general_ci",
    }
  );

  Mondays.associate = (models) => {
    Mondays.belongsTo(models.Monday_header, {
      foreignKey: "project_subid",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Mondays.hasMany(models.Timers, {
      foreignKey: "work_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Mondays;
};
