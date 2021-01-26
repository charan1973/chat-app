const router = require("express").Router();
const { multerUpload } = require("../config/multer.config");
const { createServer, updateServer, deleteServer, findServerById } = require("../controllers/server");
const { verifyToken } = require("../validators/token.validator");

router.use(verifyToken);

router.param("serverId", findServerById)

router.post("/create", createServer);
router.put("/update/:serverId", multerUpload.single("serverImage"), updateServer)
router.delete("/delete/:serverId", deleteServer)

module.exports = router;
