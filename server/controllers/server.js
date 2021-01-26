const Server = require("../models").Server;
const uploader = require("../config/cloudinary.config")

exports.findServerById = (req, res, next, id) => {
    Server.findOne({where: {id}}).then(data => {
        if(data.dataValues.id){
            req.server = data.dataValues
            next()
        }else{
            res.json({error: "Server not found"})
        }
    })
}

exports.createServer = async (req, res) => {
  const { serverName, serverDescription } = req.body;

  if (!serverName) return res.json({ error: "Server Name is required" });

  try {
    const newServer = await Server.create({
      ...req.body,
      creatorId: req.user.id,
    });
    return res.json({ message: `${newServer.serverName} is created` });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Error creating server" });
  }
};

exports.updateServer = async (req, res) => {
  let image = {}

  if (req.server.creatorId !== req.user.id)
    return res.json({ error: "403! Forbidden route" });

  if (req.file !== undefined) {
    const { url, secure_url, public_id, asset_id } = await uploader.upload(
        req.file.path, {folder: "discord/server_dp/"}
      );
    image = {
        image_url: url,
        image_secure_url: secure_url,
        image_public_id: public_id,
        image_asset_id: asset_id
    }
  }

  try {
      const updatedServer = await Server.update({...req.body, ...image}, {where: {id: req.server.id}, returning: true})
      return res.json({message: `${updatedServer[1][0].serverName} updated`})
  } catch (err) {
      console.log(err);
      return res.json({error: "Error updating the server"})
  }
};

exports.deleteServer = async (req, res) => {
    if (req.server.creatorId !== req.user.id) return res.json({ error: "403! Forbidden route" });
    
    try {
        if(req.server.image_public_id) await uploader.destroy(req.server.image_public_id)
        await Server.destroy({where: {id: req.server.id}})
        return res.json({message: "Server Deleted"})
    } catch (err) {
        console.log(err);
        return res.json({error: "Error deleting the server"})
    }
}