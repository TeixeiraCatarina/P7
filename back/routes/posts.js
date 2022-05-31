const express = require("express")

const { checkToken } = require("../middleware/token")
const { getPosts, createPost, createComment, deletePost } = require("../controllers/post")
const { imageUpload } = require("../middleware/imageMulter")

const postRouter = express.Router()

postRouter.use(checkToken)
postRouter.get("/", getPosts)
postRouter.post("/", imageUpload, createPost)
postRouter.post("/:id", createComment)
postRouter.delete("/:id", deletePost)

module.exports = { postRouter }