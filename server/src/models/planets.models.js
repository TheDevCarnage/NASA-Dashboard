const path = require("path");
const fs = require("fs");
const { parse } = require("csv-parse");

const planets = require('./planets.mongo')

function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && Number(planet['koi_insol']) > 0.36
    && Number(planet['koi_insol']) < 1.11
    && Number(planet['koi_prad']) < 1.6;
}

// Use __dirname to reference the same folder as this script
const csvFilePath = path.join(__dirname, 'kepler_data.csv');


function loadPlanetsData(){
  return new Promise((resolve, reject) => {fs.createReadStream(csvFilePath)
  .pipe(parse({
    comment: '#',
    columns: true,
  }))
  .on('data', async (data) => {
    if (isHabitablePlanet(data)) {
      await savePlanets(data)
    }
  })
  .on('error', (err) => {
    console.log(err);
    reject(err);
  })
  .on('end', async () => {
    const countPlanets = (await getAllPlanets()).length
    console.log(`${countPlanets} habitable planets found!`);
    resolve();
  });
});
}


async function savePlanets(planet){
  try{
      await planets.updateOne({
        keplerName: planet.kepler_name,
      }, {
        keplerName: planet.kepler_name,
      }, {
        upsert: true,
      });
  } catch(err){
      console.error(`Could not save planet: ${err}`)
  }
  
}


async function getAllPlanets(){
  return await planets.find({}, {
    '_id': 0,
    '__v': 0,
  })
}


module.exports = {
  loadPlanetsData,
  getAllPlanets,
};