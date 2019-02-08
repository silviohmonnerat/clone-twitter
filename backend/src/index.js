const express = require("express")
const mogoose = require("mongoose")
const routes  = require("./routes")
const cors    = require("cors")

const app = express()

const server = require("http").Server(app)
const io = require("socket.io")(server)

mogoose.connect(
    "mongodb://goweek:goweek123@ds237660.mlab.com:37660/goweek-backend",
    {
        useNewUrlParser: true
    }
)

app.use((req, res, next) => {
    req.io = io

    return next()
})

app.use(cors())
app.use(express.json())
app.use(routes)

server.listen("3000", () => {
    console.log("Server started on port 3000.")
})