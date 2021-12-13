const router = require("express").Router()

// Mapeado em "/auth"

router.get("/", async(req, res) => {
    const user = req.user
    console.log(req)
    return res.status(200).send({success: true, user})
})

module.exports = router