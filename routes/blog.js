const { Router } = require("express")
const multer = require('multer')
const path = require("path")
const Blog = require("../models/blog")
const Comment = require("../models/comment")


const router = Router()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads`))
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`
        cb(null, fileName)
    }
})
const upload = multer({ storage: storage })


router.get("/addblog", (req, res) => {
    res.render("addblog", {
        user: req.user
    })
})

router.post("/addblog",upload.single('coverImage'), async (req, res) => {
    const { title, body } = req.body
    const blog = await Blog.create({
        title,
        body,
        coverImageUrl:`/uploads/${req.file.filename}`,
        createdBy: req.user._id,
    })
    return res.redirect(`${blog._id}`)
})

router.get("/:blogId", async (req, res) => {
    const blog = await Blog.findById(req.params.blogId).populate("createdBy")
    const comments = await Comment.find({blogId: req.params.blogId}).populate("createdBy")
    console.log(comments);
    res.render('blog', {
        blog,
        user: req.user,
        comments
    })
})

router.post("/comment/:blogId", async (req, res) => {
    const blogId = req.params.blogId
    await Comment.create({
        blogId,
        comment: req.body.comment,
        createdBy: req.user._id
    })
    return res.redirect(`/blog/${blogId}`)
})

module.exports = router