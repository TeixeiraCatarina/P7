const { prisma } = require("../db/db")

// Afficher un post 
async function getPosts(req, res) {
    //on recupere l'email depuis le token pour vérifier si l'utilisateur est loger
    const email = req.email
    const posts = await prisma.post.findMany({
        include: {
            comments: {
                orderBy: {
                    createdAt: "asc"  // pour que les commentaires s'affichent le plus recent en bas
                },
                include: {
                    user: {
                        select: {
                            email: true    // pour avoir acces a l'email pour ensuite le faire afficher dans le front 
                        }
                    }
                }
            },
            user: {
                select: {
                    email: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"   // pour que les posts s'affichent du plus recent au plus vieux
        }
    })
    res.send({ posts, email })
}

// Pour créer un post 
async function createPost(req, res) {
    const content = req.body.content
    const email = req.email
    
    try {
        const user = await prisma.user.findUnique({ where: { email } })
        const userId = user.id
        const post = { content, userId }
        addImageUrl(req, post)

        const result = await prisma.post.create({ data: post })
        res.send({ post: result })
    } catch (err) {
        res.status(500).send({ error: "Something went wrong" })
    }
}

// Créer l'url de l'image
function addImageUrl(req, post) {
    const hasImage = req.file != null  //req.file a-t-il une image 
    if (!hasImage) return    //s'il n'y a pas d'image alors on fait rien 
    let pathToImage = req.file.path.replace("\\","/")
    const protocol = req.protocol
    const host = req.get("host")
    const url = `${protocol}://${host}/${pathToImage}`
    post.imageUrl = url
}

// Pour créer un commentaire
async function createComment(req, res) {
    const postId = Number (req.params.id)
    const post = await prisma.post.findUnique({
        where: { id: postId },
        include: {
            user: {
                select: {
                    id: true
                }
            }
        }
    })

    if (post == null) {
        return res.status(404).send({ error: "Post not found" })
    }
    //pour avoir le mail de l'utilisateur qui commente 
    const userComment = await prisma.user.findUnique({
        where: { email: req.email }
    })

    const userId = userComment.id

    const commentToSend = { userId, postId, content: req.body.comment }
    const comment = await prisma.comment.create({ data: commentToSend})
    res.send({ comment })
}

// Supprimer un post
async function deletePost(req, res){
    const postId = Number(req.params.id)
    try { 
        const post = await prisma.post.findUnique({
            where: {
                id: postId
            },
            include: {
                user: {
                    select: {
                        email: true
                    }
                }
            }  
        })
        if (post == null) {
            return res.status(404).send({ error: "Post not found" })
        }
        const email = req.email
        if (email !== post.user.email) {
            return res.status(403).send({ error: "Vous n'êtes pas le propriétaire de ce post"})
        }
        await prisma.comment.deleteMany({ where: { postId } })  //pour supprimer les commentaires associés au post 
        await prisma.post.delete({ where: { id: postId } })   //pour supprimer le post 
        res.send({ message: "Post deleted "})
    } catch {
        res.status(500).send({ error: "Something went wrong" })
    }
}

module.exports = { getPosts, createPost, createComment, deletePost }