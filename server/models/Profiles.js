module.exports = (sequelize, DataTypes) => {
  const Profiles = sequelize.define(
    "Profiles",
    {
      profile_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      picture: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      token: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      super_img: {
        type: DataTypes.BLOB("long"),
        allowNull: true,
      },
      // role: {
      //   type: DataTypes.UUID,
      //   allowNull: false,
      // },
      // level: {
      //   type: DataTypes.UUID,
      //   allowNull: true,
      // },
      // gender: {
      //   type: DataTypes.UUID,
      //   allowNull: true,
      // },
      role: {
        type: DataTypes.ENUM(
          "super_admin",
          "admin",
          "management",
          "manager",
          "employee"
        ),
        allowNull: false,
      },
      level: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      gender: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      invite: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      verified: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      created_by: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      updated_by: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      tableName: "Profiles",
      timestamps: true,
      charset: "utf8",
      createdAt: "created_date", // Specify the custom column name for createdAt
      updatedAt: "updated_date",
      collate: "utf8_general_ci",
    }
  );

  Profiles.associate = (models) => {
    Profiles.belongsTo(models.Users, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Profiles.belongsTo(models.Departments, {
      // foreignKey: { field: "department_id", allowNull: true },
      foreignKey: "department_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Profiles.belongsTo(models.Groups, {
      // foreignKey: { field: "group_id", allowNull: true },
      foreignKey: "group_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Profiles.belongsTo(models.Positions, {
      // foreignKey: { field: "position_id", allowNull: true },
      foreignKey: "position_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Profiles.hasMany(models.Addresses, {
      foreignKey: "profile_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Profiles;
};
