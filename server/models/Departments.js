module.exports = (sequelize, DataTypes) => {
  const Departments = sequelize.define(
    "Departments",
    {
      department_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      department_code: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      department_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
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
      // options
      tableName: "Departments",
      timestamps: true,
      charset: "utf8",
      createdAt: "created_date", // Specify the custom column name for createdAt
      updatedAt: "updated_date",
      collate: "utf8_general_ci",
    }
  );

  Departments.associate = (models) => {
    Departments.hasMany(models.Profiles, {
      // foreignKey: { field: "department_id", allowNull: true },
      foreignKey: "department_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Departments.hasMany(models.Positions, {
      foreignKey: "department_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Departments;
};
