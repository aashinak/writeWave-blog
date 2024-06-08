const express = require("express")
const path = require("path")
const userRoute = require("./routes/user")
const mongoose = require("mongoose")


const app = express()
const PORT = 8000

mongoose.connect("mongodb://127.0.0.1:27017/write-wave")
.then(e => console.log("MongoDb connected")) 

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.urlencoded({ extended: false }))

app.use("/user", userRoute)
app.get("/", (req, res) => {
    res.render("home")
})

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}/`);
})