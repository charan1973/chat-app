"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserJoinedServer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        as: 'from_user',
        foreignKey: "user"
      })
      this.belongsTo(models.Server, {
        as: 'from_server',
        foreignKey: "server"
      })
    }
  }
  UserJoinedServer.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      user: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "users", key: "id" },
      },
      server: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "servers", key: "id" },
      },
    },
    {
      sequelize,
      modelName: "UserJoinedServer",
      tableName: "user_joined_servers"
    }
  );
  return UserJoinedServer;
};
