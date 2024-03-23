module.exports = (sequelize, DataTypes) => {
  const Clients = sequelize.define(
    "Clients",
    {
      client_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      client_code: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      client_name: {
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
      tableName: "Clients",
      timestamps: true,
      charset: "utf8",
      createdAt: "created_date", // Specify the custom column name for createdAt
      updatedAt: "updated_date",
      collate: "utf8_general_ci",
    }
  );

  Clients.associate = (models) => {
    Clients.hasMany(models.Projects, {
      foreignKey: "client_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Clients.hasMany(models.SubClients, {
      foreignKey: "client_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  
  return Clients;
};
