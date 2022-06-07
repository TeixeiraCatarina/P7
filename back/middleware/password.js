const passwordValidator = require("password-validator")

// Création du schéma
const passwordSchema = new passwordValidator()

// Schéma que le mot de passe doit respecter 
passwordSchema
.is().min(8)                                   
.is().max(100)                                 
.has().uppercase()                             
.has().lowercase()                        
.has().digits(1)                          
.has().not().spaces()                         
.is().not().oneOf(['Passw0rd', 'Password123', 'Motdepasse']); 

// Vérification de la qualité du password par rapport au schéma
function verifPassword(req, res, next){
    if(passwordSchema.validate(req.body.password)){
        next()
    }else{
        return res.status(400).send([ "Le mot de passe doit contenir entre 8 et 100 caractères, contenir au moins 1 majuscule, au moins 1 minuscule, au moins 2 chiffres et ne doit pas contenir d'espace"])
    }
}
module.exports = { verifPassword }