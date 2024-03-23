module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: 0,
      },
      created_by: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      updated_by: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      first_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      last_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      nick_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      // address: {
      //   type: DataTypes.TEXT,
      //   allowNull: true,
      // },
      birthday: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      starting_working_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      user_phone: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      // options
      tableName: "Users",
      timestamps: true,
      charset: "utf8",
      createdAt: "created_date", // Specify the custom column name for createdAt
      updatedAt: "updated_date",
      collate: "utf8_general_ci",
    }
  );

  Users.associate = (models) => {
    Users.hasMany(models.TimeSheetHDs, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Users.hasMany(models.Profiles, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };
  return Users;
};
