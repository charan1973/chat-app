const {Channel, Server, Group} = require("../models")

exports.findChannelById = (req, res, next, id) => {
    Channel.findOne({where: {id}}).then(data => {
        if(data.dataValues.id){
            req.channel = data.dataValues
            next()
        }else{
            return res.json({error: "Channel not found"})
        }
    })
}

exports.createChannel = async (req, res) => {
    const {channelName, serverId, groupId} = req.body

    const server = await Server.findOne({where: {id: serverId}})

    if(server.creatorId !== req.user.id) return res.json({error: "Yo dude! It's none of your business"})

    try{
        const newChannel = await Channel.create({...req.body, creatorId: req.user.id})
        return res.json({message: `${newChannel.channelName} is created`})
    }catch(err){
        return res.json({error: "Error creating channel"})
    }

}

exports.updateChannel = async (req, res) => {
    if(req.channel.creatorId !== req.user.id) return res.json({error: "Yo dude! It's none of your business"})


    try {
        const updatedChannel = await Channel.update(req.body, {where: {id: req.channel.id}})
        return res.json({message: "Channel updated"})
    } catch (error) {
        return res.json({error: "Error updating the channel"})
    }
}


exports.deleteChannel = async (req, res) => {
    if(req.channel.creatorId !== req.user.id) return res.json({error: "Yo dude! It's none of your business"})

    try {
        const deletedChannel = await Channel.destroy({where: {id: req.channel.id}})
        return res.json({message: "Channel deleted"})
    } catch (error) {
        return res.json({error: "Error deleting the channel"})
    }
}