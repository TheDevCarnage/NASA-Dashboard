const express = require('express')
const cors = require("cors");
const morgan = require('morgan')
const { planetsRouter } = require('./routes/planets/planets.router');
const { launchesRouter } = require('./routes/launches/launches.router')


const app = express()

const API_PREFIX = "/api/v1"

app.use(cors({
    origin: 'http://localhost:3000',
}))
app.use(morgan('combined'))
app.use(express.json())
app.use(`${API_PREFIX}/planets`, planetsRouter)
app.use(`${API_PREFIX}/launches`, launchesRouter)
module.exports = app;