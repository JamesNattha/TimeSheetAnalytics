module.exports = (sequelize, DataTypes) => {
    const SubClients = sequelize.define(
      "SubClients",
      {
        subclient_id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        client_incharge: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        client_nickname: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        client_phone: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        client_detail: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        email: {
          type: DataTypes.STRING(255),
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
        tableName: "SubClients",
        timestamps: true,
      charset: "utf8",
      createdAt: "created_date", // Specify the custom column name for createdAt
      updatedAt: "updated_date",
        collate: "utf8_general_ci",
      }
    );
  
    SubClients.associate = (models) => {
      SubClients.belongsTo(models.Clients, {
        foreignKey: "client_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    };
    return SubClients;
  };
  