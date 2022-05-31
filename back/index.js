require("dotenv").config()
const express = require("express")
const port = process.env.PORT || 3000
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")

//const { logUser, userSignup, deleteAccount } = require("./controllers/users")
const { postRouter } = require("./routes/posts")
const { userRouter } = require("./routes/users")

app.use(cors())

// pour pouvoir lire le body
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Routes
app.use("/posts", postRouter)
app.use("/users", userRouter)

app.use("/uploads", express.static("uploads"))  //pour que le site puisse récuperer l'image pour l'afficher
//app.post("/auth/login", logUser)
//app.post("/auth/signup", userSignup)
//app.delete("/delete/:id", deleteAccount)

// Listen
app.listen(port, () => console.log(`Listening on port ${port}`))