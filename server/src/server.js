const http = require('http')
const mongoose = require('mongoose')

const app = require('./app')
const {loadPlanetsData} = require('./models/planets.models')

const PORT = process.env.PORT || 8000;
const MONGO_URL = 'mongodb+srv://nasa-api:g2A5DLk6XILhSV1N@nasadashboard-cluster.diios7l.mongodb.net/'

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

  server.listen(PORT, ()=>{
      console.log(`Server listening on port: ${PORT}`)
  })
}

startServer();