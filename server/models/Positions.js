module.exports = (sequelize, DataTypes) => {
    const Positions = sequelize.define(
      "Positions",
      {
        position_id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        position_code: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        position_name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        department_id: {
          type: DataTypes.UUID,
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
        }
      },
      {
        // options
        tableName: "Positions",
        timestamps: true,
        charset: "utf8",
        createdAt: "created_date", // Specify the custom column name for createdAt
        updatedAt: "updated_date",
        collate: "utf8_general_ci",
      }
    );

    Positions.associate = (models) => {

      Positions.belongsTo(models.Departments, {
        foreignKey: "department_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Positions.hasMany(models.Profiles, {
        // foreignKey: { field: "position_id", allowNull: true },
        foreignKey: "position_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
    
    return Positions;
  };
  