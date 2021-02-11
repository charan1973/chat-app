const router = require("express").Router()
const { registerUser, signInUser, signOutUser, authenticateUser } = require("../controllers/auth")
const { verifyToken } = require("../validators/token.validator")


router.post("/register", registerUser)
router.post("/signin", signInUser)
router.post("/signout", signOutUser)

router.get("/authenticate", verifyToken, authenticateUser)

module.exports = router