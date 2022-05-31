const jwt = require("jsonwebtoken")

function checkToken(req, res, next){
    const token = req.headers.authorization.split(" ")[1]
    if (token == null) return res.status(401).send({ error: "Manque token" })

    jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if (error) return res.status(401).send({ error: "Token invalide" })
        req.email = decoded.email
        next()
    })
}

module.exports = { checkToken }