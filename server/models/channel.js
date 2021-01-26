"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Channel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Channel.belongsTo(models.Group, {
        onDelete: "CASCADE",
        foreignKey: "groupId",
        as: 'channel_group'
      })
      Channel.belongsTo(models.Server, {
        onDelete: "CASCADE",
        foreignKey: "serverId",
        as: 'channel_server'
      })
      Channel.belongsTo(models.User, {
        onDelete: "CASCADE",
        foreignKey: "creatorId",
        as: 'channel_creator'
      })
    }
  }
  Channel.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      channelName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      groupId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "groups",
          key: "id",
        },
      },
      serverId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "servers",
          key: "id",
        },
      },
      creatorId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Channel",
      tableName: "channels"
    }
  );
  return Channel;
};
