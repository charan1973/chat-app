const router = require("express").Router()
const { findChannelById, createChannel, updateChannel, deleteChannel } = require("../controllers/channel")
const { verifyToken } = require("../validators/token.validator")


router.use(verifyToken)

router.param("channelId", findChannelById)

router.post("/create", createChannel)
router.put("/update/:channelId", updateChannel)
router.delete("/delete/:channelId", deleteChannel)

module.exports = router