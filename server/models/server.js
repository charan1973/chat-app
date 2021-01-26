'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Server extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
      Server.belongsTo(models.User, {
        onDelete: "SET NULL",
        foreignKey: 'creatorId',
        as: 'server_from_creator'
      })
      Server.hasMany(models.Group, {
        as: 'server_to_groups',
        foreignKey: 'serverId'
      })
      Server.hasMany(models.Channel, {
        as: 'server_to_channels',
        foreignKey: 'serverId'
      })
      Server.hasMany(models.UserJoinedServer, {
        as: 'server_to_joined',
        foreignKey: 'server'
      })
    }

  };
  Server.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    serverName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    serverDescription: {
      type: DataTypes.STRING
    },
    creatorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id"
      }
    },
    server_image_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    server_image_public_id: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Server',
    tableName: 'servers'
  });
  return Server;
};