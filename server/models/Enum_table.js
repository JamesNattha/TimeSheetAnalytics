module.exports = (sequelize, DataTypes) => {
    const Enum_table = sequelize.define(
      "Enum_table",
      {
        enum_id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        enum_code: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        enum_type: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        name_th: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        name_eng: {
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
        tableName: "enum_table",
        timestamps: true,
        createdAt: "created_date",
        updatedAt: "updated_date",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
    return Enum_table;
  };
  