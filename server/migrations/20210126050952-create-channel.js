"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("channels", {
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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("channels");
  },
};
