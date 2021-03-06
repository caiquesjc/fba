require('dotenv').config()
const express = require('express')
const cors = require("cors")
const app = express()
const cookieParser = require("cookie-parser")

const {authenticate} = require("./services/AuthService")

const PORT = process.env.PORT || 4002
app.use(cors({credentials: true, origin: "http://192.168.100.6:3000"}))
app.use(cookieParser())
app.use(express.json())
app.use("/login", require("./controllers/LoginController"))
app.use("/user", authenticate, require("./controllers/UserController"))
app.use("/course", authenticate, require("./controllers/CoursesController"))
app.use("/class", authenticate, require("./controllers/ClassController"))
app.use("/class-finished", authenticate, require("./controllers/FinishedClassController"))
app.use("/auth", authenticate, require("./controllers/AuthController"))
app.use("/", (req, res) => {res.send("inicio")})


app.use((req, res) => {
  //res.status(404).send("Cuidado ao tentar navegar em rotas inexistentes")
  res.redirect("/")
})

app.listen(PORT, () => {
    console.log(`open port: ${PORT}`)
  })

