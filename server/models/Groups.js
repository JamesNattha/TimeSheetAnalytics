module.exports = (sequelize, DataTypes) => {
  const Groups = sequelize.define(
    "Groups",
    {
      group_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      group_code: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      group_name: {
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
      is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      is_all: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      // options
      tableName: "Groups",
      timestamps: true,
      charset: "utf8",
      createdAt: "created_date", // Specify the custom column name for createdAt
      updatedAt: "updated_date",
      collate: "utf8_general_ci",
    }
  );

  Groups.associate = (models) => {
    Groups.hasMany(models.Profiles, {
      // foreignKey: { field: "group_id", allowNull: true },
      foreignKey: "group_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Groups.hasMany(models.Projects, {
      foreignKey: "group_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Groups;
};
