'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Group.belongsTo(models.Server, {
        as: 'group_from_server',
        foreignKey: 'serverId',
        onDelete: 'CASCADE'
      })
      Group.belongsTo(models.User, {
        as: 'group_from_creator',
        foreignKey: 'creatorId',
        onDelete: 'SET NULL'
      })
      Group.hasMany(models.Channel, {
        as: 'group_to_channels',
        foreignKey: 'groupId'
      })
    }
  };
  Group.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    groupName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    serverId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "servers",
        key: "id"
      }
    },
    creatorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'Group',
    tableName: 'groups'
  });
  return Group;
};