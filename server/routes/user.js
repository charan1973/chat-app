const router = require("express").Router()
const { userJoinServer, getUserJoinedServers } = require("../controllers/user")
const { verifyToken } = require("../validators/token.validator")


router.use(verifyToken)

router.post("/join-server/:serverId", userJoinServer)
router.get("/get-user-joined-servers", getUserJoinedServers)


module.exports = router