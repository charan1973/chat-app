const { Server, UserJoinedServer, Channel, Group } = require("../models");
const { Op } = require("sequelize");
const uploader = require("../config/cloudinary.config");

exports.findServerById = (req, res, next, id) => {
  Server.findOne({ where: { id } }).then((data) => {
    if (data.dataValues.id) {
      req.server = data.dataValues;
      next();
    } else {
      res.json({ error: "Server not found" });
    }
  });
};

exports.createServer = async (req, res) => {
  const { serverName, serverDescription } = req.body;

  if (!serverName) return res.json({ error: "Server Name is required" });

  try {
    const newServer = await Server.create({
      ...req.body,
      creatorId: req.user.id,
    });
    res.json({ message: `${newServer.serverName} is created` });

    // Add the creator to user joined table after creation of the server
    UserJoinedServer.create({ server: newServer.id, user: req.user.id });

    //Create new group 'Text-Channel'
    const newGroup = await Group.create({
      groupName: "Text-Channel",
      serverId: newServer.id,
      creatorId: req.user.id,
    });

    // Create a 'general' channel to initiate the server
    Channel.create({
      serverId: newServer.id,
      creatorId: req.user.id,
      groupId: newGroup.id,
      channelName: "general",
    });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Error creating server" });
  }
};

exports.updateServer = async (req, res) => {
  let image = {};

  if (req.server.creatorId !== req.user.id || req.body.creatorId)
    return res.json({ error: "403! Forbidden route" });

  if (req.file !== undefined) {
    
    const { url, public_id } = await uploader.upload(
      req.file.path,
      { folder: "discord/server_dp/" }
      )
      
      image = {
        server_image_url: url,
        server_image_public_id: public_id,
      };

      uploader.destroy(req.server.server_image_public_id) //Delete the old image
  }

  try {
    const updatedServer = await Server.update(
      { ...req.body, ...image },
      { where: { id: req.server.id }, returning: true }
    );
    return res.json({ message: `${req.body.serverName} updated` });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Error updating the server" });
  }
};

exports.deleteServer = async (req, res) => {
  if (req.server.creatorId !== req.user.id)
    return res.json({ error: "403! Forbidden route" });

  try {
    if (req.server.image_public_id)
      await uploader.destroy(req.server.image_public_id);
    await Server.destroy({ where: { id: req.server.id } });
    return res.json({ message: "Server Deleted" });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Error deleting the server" });
  }
};
