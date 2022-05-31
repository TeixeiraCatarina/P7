
// pour avoir un seul objet prisma 
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

module.exports = { prisma }