module.exports = (sequelize, DataTypes) => {
  const Works = sequelize.define(
    "Works",
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
      work_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      work_type: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      work_status: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      work_level: {
        type: DataTypes.STRING(255),
        allowNull: false,
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
      total: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      // stopwatch: {
      //   type: DataTypes.TIME,
      //   allowNull: true,
      // },
      // timestamps: {
      //   type: DataTypes.DATE,
      //   allowNull: true,
      // },
      // sum_time: {
      //   type: DataTypes.INTEGER,
      //   allowNull: true,
      //   defaultValue: 0, // Use the current timestamp as the default
      // },
      // action_status: {
      //   type: DataTypes.BOOLEAN,
      //   allowNull: true,
      //   defaultValue: 0,
      // },
      send_to: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      work_status: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      project_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      send_to: {
        type: DataTypes.STRING(255),
        allowNull: false,
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
      tableName: "Works",
      timestamps: true,
      createdAt: "created_date",
      updatedAt: "updated_date",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  Works.associate = (models) => {
    Works.belongsTo(models.Projects, {
      foreignKey: "project_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Works.belongsTo(models.Enum_table, {
      foreignKey: "work_type",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      as: "enum",
    });
    Works.hasMany(models.Timers, {
      foreignKey: "work_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      as: "timers",
    });
    Works.hasMany(models.TimeSheetDTs, {
      foreignKey: "work_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };
  return Works;
};
