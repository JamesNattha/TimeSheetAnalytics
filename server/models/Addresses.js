module.exports = (sequelize, DataTypes) => {
    const Addresses = sequelize.define(
      "Addresses",
      {
        address_id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        information: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        province: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        district: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        sub_district: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        postcode: {
          type: DataTypes.STRING(255),
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
        tableName: "Addresses",
        timestamps: true,
        charset: "utf8",
        createdAt: "created_date", // Specify the custom column name for createdAt
        updatedAt: "updated_date",
        collate: "utf8_general_ci",
      }
    );
  
    Addresses.associate = (models) => {
        Addresses.belongsTo(models.Profiles, {
        foreignKey: "profile_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    };
  
    return Addresses;
  };
  