const validator = require("validator")

function verifEmail(req, res, next){
    const email = req.body.email

    if(validator.isEmail(email)){
        next()
    }else{
        return res.status(400).send({ message: " Email invalide, format correct: abc@xyz.com "})
    }
}

module.exports = { verifEmail }