const jwt = require("jsonwebtoken")
const { prisma } = require("../db/db.js")
const bcrypt = require("bcrypt")

// Création d'un compte
async function userSignup(req, res) {
    const { email, password, confirmPassword } = req.body
    try {
        if (confirmPassword == null) return res.status(400).send({ error: "Veuillez remplir tous les champs" })
        if (password !== confirmPassword) return res.status(400).send({ error: "Les mots de passe ne correspondent pas" })
        
        const userInDb = await getUser(email)
        if (userInDb !== null) return res.status(400).send({ error: "Cette adresse e-mail est déjà utilisée" })

        const hash = await hashPassword(password)
        const user = await saveUser({ email, password: hash })
        res.send({ user })
    } catch (error) {
        res.status(500).send({ error: "Impossible de créer un compte" })
    } 
}

// Sauvegarder l'utilisateur dans la base de données 
function saveUser(user){
    return prisma.user.create({ data: user })
}

// Hasher le mot de passe 
function hashPassword(password){
    const NUMBER_OF_SALT_ROUNDS = 10
    return bcrypt.hash(password, NUMBER_OF_SALT_ROUNDS)
}

// Pour que l'utilisateur puisse se connecter a son compte
async function logUser(req, res) {
    const { email, password } = req.body
    try {
        const user = await getUser(email)
        if (user == null) return res.status(404).send({ error: "Mauvaise adresse email" })
    
        const isPasswordCorrect = await checkPassword(user, password)
        if (!isPasswordCorrect) return res.status(401).send({ error: "Mauvais mot de passe" })
            
        const token = makeToken(email)
        res.send({ token: token, email: user.email, role: user.role})
    } catch (error) {
        res.status(500).send({ error })
    }
}

function makeToken(email){
    return jwt.sign({email}, process.env.SECRET, {expiresIn: "24h"})
}

// Voir si l'utilisateur existe dans la base de données
async function getUser(email){
    return await prisma.user.findUnique({ where: { email: email }})
}

function checkPassword(user, password){
    return bcrypt.compare(password, user.password)
}

// Supprimer son compte
async function deleteAccount(req, res){
    const email = req.body.source
    try {
        const user = await getUser(email)
        if (user == null) return res.status(404).send({ message: "User not found" })

        

        await prisma.comment.deleteMany({ where: { id: user.id } })   
        await prisma.post.delete({ where: { id: user.id } })

        await prisma.user.delete({ where: { id: user.id } })

        res.send({ message: "Account deleted" })
    } catch(err) {
        res.status(500).send({ error: "Imposible de supprimer le compte" + err })

    }
}


module.exports = { logUser, userSignup, deleteAccount }