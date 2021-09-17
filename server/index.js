require('dotenv').config()
const express = require('express')
const cors = require("cors")
const app = express()
const port = 4002


app.use(express.json())
app.use(cors({credentials: true, origin: "*"}))
app.use("/login", require("./controllers/LoginController"))
app.use("/user", require("./controllers/UserController"))
app.use("/courses", require("./controllers/CoursesController"))
app.use("/", (req, res) => {res.send("inicio")})


app.use((req, res) => {
  //res.status(404).send("Cuidado ao tentar navegar em rotas inexistentes")
  res.redirect("/")
})

app.listen(port, () => {
    console.log(`App rodando em: http://localhost:${port}`)
  })

