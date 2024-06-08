const { Router } = require("express")
const USER = require("../models/user")
const { createTokenForUser } = require("../services/authentication")

const router = Router()

router.get("/signin", (req,res) => {
    return res.render("signin")
})

router.post("/signin", async (req,res) => {
    const { email, password } = req.body
    const user = await USER.matchPassword(email, password)
    const token = createTokenForUser(user)
    return res.cookie("token", token).redirect("/")
})



router.get("/signup", (req,res) => {
    return res.render("signup")
})

router.post("/signup", async (req, res) => {
    
    const { fullName, email, password } = req.body
    
    await USER.create({
        fullName,
        email,
        password
    })

    return res.redirect("/")
    
})

module.exports = router