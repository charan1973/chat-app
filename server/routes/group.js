const router = require("express").Router()
const { createGroup, findGroupById, updateGroup, deleteGroup } = require("../controllers/group")
const {verifyToken} = require("../validators/token.validator")

router.use(verifyToken)

router.param("groupId", findGroupById)

router.post("/create", createGroup)
router.put("/update/:groupId", updateGroup)
router.delete("/delete/:groupId", deleteGroup)

module.exports = router