const mongoose = require('mongoose')
const { planets } = require('./planets.models')

const planetsSchema = new mongoose.Schema({
    keplerName: {
        type: String,
        required: true,
    } 
})

module.exports = mongoose.model('Planet', planetsSchema)