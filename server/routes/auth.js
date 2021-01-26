const router = require("express").Router()
const { registerUser, signInUser, signOutUser } = require("../controllers/auth")


router.post("/register", registerUser)
router.post("/signin", signInUser)
router.post("/signout", signOutUser)

module.exports = router