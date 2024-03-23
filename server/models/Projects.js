module.exports = (sequelize, DataTypes) => {
  const Projects = sequelize.define(
    "Projects",
    {
      project_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      client_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      project_code: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      project_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      mondayhd_id: {
        type: DataTypes.STRING(36),
        allowNull: true,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      finish_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      due_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      group_id: {
        type: DataTypes.UUID,
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
      tableName: "Project",
      timestamps: true,
      createdAt: "created_date",
      updatedAt: "updated_date",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  Projects.associate = (models) => {
    Projects.belongsTo(models.Clients, {
      foreignKey: "client_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Projects.belongsTo(models.Groups, {
      foreignKey: "group_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Projects.hasMany(models.Works, {
      foreignKey: "project_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };
  return Projects;
};
