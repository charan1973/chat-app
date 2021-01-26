"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("servers", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      serverName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      serverDescription: {
        type: DataTypes.STRING,
      },
      creatorId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image_secure_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image_public_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image_asset_id: {
        type: DataTypes.STRING,
        allowNull: true,
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
    await queryInterface.dropTable("servers");
  },
};
