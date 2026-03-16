const http = require('http')
const mongoose = require('mongoose')
require('dotenv').config()
const app = require('./app')
const {loadPlanetsData} = require('./models/planets.models')
const {loadLaunchData} = require('./models/launches.models')
const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL

const server = http.createServer(app)

mongoose.connection.once('open', ()=>{
  console.log('MongoDB connection is up and running !')
})

mongoose.connection.on('error', (err)=>{
  console.error(err)
})

async function startServer(){
  await mongoose.connect(MONGO_URL)
  await loadPlanetsData();
  await loadLaunchData();
  server.listen(PORT, ()=>{
      console.log(`Server listening on port: ${PORT}`)
  })
}

startServer();