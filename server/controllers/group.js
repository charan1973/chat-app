const {Group, Server} = require("../models")

exports.findGroupById = (req, res, next, id) => {
    Group.findOne({where: {id}}).then(data => {
        if(data.dataValues.id){
            req.group = data.dataValues
            next()
        }else{
            res.json({error: "Group not found"})
        }
    })
}

exports.createGroup = async (req, res) => {
    const {groupName, serverId} = req.body

    
    try{
        const server = await Server.findOne({where: {id: serverId}})
        if(!server){
            return res.json({error: "Cannot find matching server"})
        }

        const newGroup = await Group.create({groupName, serverId, creatorId: req.user.id })
        
        return res.json({message: `${newGroup.groupName} is created in the ${server.serverName} server`})
    }catch(err){
        return res.json({error: "Error creating group"})
    }
}

exports.updateGroup = async (req, res) => {
    if(req.group.creatorId !== req.user.id) return res.json({error: "Yo dude! It's none of your business"})

    try {
        const updatedGroup = await Group.update(req.body, {where: {id: req.group.id}})
        return res.json({message: "Group updated"})
    } catch (error) {
        return res.json({error: "Error updating the group"})
    }
}

exports.deleteGroup = async (req, res) => {
    if(req.group.creatorId !== req.user.id) return res.json({error: "Yo dude! It's none of your business"})

    try{
        const deleteGroup = await Group.destroy({where: {id: req.group.id}})
        return res.json({message: `Delete group ${req.group.groupName} successfully`})
    }catch(err){
        console.log(err);
        return res.json({error: "Error deleting the group"})
    }
}