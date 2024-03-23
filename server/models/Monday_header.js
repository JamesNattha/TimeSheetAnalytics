module.exports = (sequelize, DataTypes) => {
  const Monday_header = sequelize.define(
    "Monday_header",
    {
      project_subid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      mondayhd_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      mondayhd_name: {
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
        default: true,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: true,
      },
    },
    {
      // options
      tableName: "Monday_header",
      timestamps: true,
      charset: "utf8",
      createdAt: "created_date", // Specify the custom column name for createdAt
      updatedAt: "updated_date",
      collate: "utf8_general_ci",
    }
  );

  Monday_header.associate = (models) => {
    Monday_header.hasMany(models.Mondays, {
      foreignKey: "project_subid",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };
  return Monday_header;
};
