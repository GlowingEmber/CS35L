const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())

app.listen(3001, () =>{ // Start on this port
    console.log("server is running")
})
