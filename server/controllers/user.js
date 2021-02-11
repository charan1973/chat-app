const { UserJoinedServer, Server, Group, Channel } = require("../models");
const { Op } = require("sequelize");

exports.userJoinServer = async (req, res) => {
  const { serverId } = req.params;

  const isAlreadyJoined = await UserJoinedServer.findOne({
    where: {
      [Op.and]: [{ user: req.user.id }, { server: serverId }],
    },
  });
  if (isAlreadyJoined) return res.json({ error: "Already joined the server" });

  try {
    const joinServer = await UserJoinedServer.create({
      server: serverId,
      user: req.user.id,
    });
    return res.json({ message: `You joined the server` });
  } catch (error) {
    return res.json({ error: "Error joining the server" });
  }
};

exports.getUserJoinedServers = async (req, res) => {
  try {
    const joinedServers = await UserJoinedServer.findAll({
      where: { user: req.user.id },
      attributes: [],
      include: {
        model: Server,
        as: "from_server",
        required: false,
        attributes: {
          exclude: ["createdAt", "updatedAt", "server_image_public_id"],
        },
        include: [
          {
            model: Group,
            as: "server_to_groups",
            required: false,
            attributes: { exclude: ["creatorId", "createdAt", "updatedAt"] },
            include: {
              model: Channel,
              as: "group_to_channels",
              required: false,
              attributes: { exclude: ["creatorId", "createdAt", "updatedAt"] },
            },
          },
        ],
      }
    });

    return res.json({ servers: joinedServers });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Error getting joined servers" });
  }
};
