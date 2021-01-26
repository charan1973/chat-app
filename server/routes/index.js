const router = require("express").Router()

router.use("/auth/", require("./auth"))
router.use("/server/", require("./server"))
router.use("/group/", require("./group"))
router.use("/channel/", require("./channel"))
router.use("/user/", require("./user"))

module.exports = router