const path = require("path");
const fs = require("fs");
const { parse } = require("csv-parse");

const habitablePlanets = [];

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
  .on('data', (data) => {
    if (isHabitablePlanet(data)) {
      habitablePlanets.push(data);
    }
  })
  .on('error', (err) => {
    console.log(err);
    reject(err);
  })
  .on('end', () => {
    console.log(`${habitablePlanets.length} habitable planets found!`);
    resolve();
  });
});
}



module.exports = {
  planets: habitablePlanets,
  loadPlanetsData
};