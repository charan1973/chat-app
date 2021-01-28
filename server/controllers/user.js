const { UserJoinedServer, Server, Group, Channel } = require("../models");
const {Op} = require("sequelize")

exports.userJoinServer = async (req, res) => {
  const { serverId } = req.params;

  const isAlreadyJoined = await UserJoinedServer.findOne({where: {
    [Op.and]: [
      {user: req.user.id},
      {server: serverId}
    ]
  }})
  if(isAlreadyJoined) return res.json({error: "Already joined the server"})

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
      attributes: ["server"],
      include: [
        {
          model: Server,
          as: "from_server",
          include: [
            {
              model: Channel,
              as: "server_to_channels",
              where: { groupId: null },
            },
            {
                model: Group,
                as: "server_to_groups",
                include: "group_to_channels"
            }
          ],
        },
      ],
    });

    return res.json({ servers: joinedServers });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Error getting joined servers" });
  }
};
