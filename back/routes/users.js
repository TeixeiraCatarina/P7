const express = require("express")

const { verifPassword } = require("../middleware/password")
const { verifEmail } = require("../middleware/mail")
const { logUser, userSignup, deleteAccount } = require("../controllers/users")

const userRouter = express.Router()

userRouter.use("/uploads", express.static("uploads"))  //pour que le site puisse récuperer l'image pour l'afficher
userRouter.post("/", logUser)
userRouter.post("/signup", verifPassword, verifEmail, userSignup)
userRouter.delete("/delete", deleteAccount)

module.exports = { userRouter }