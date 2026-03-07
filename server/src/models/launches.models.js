const launches = require('./launches.mongo')
const planets = require('./planets.mongo')

const DEFAULT_FLIGHT_NUMBER = 100

async function getAllLaunches(){
    return await launches.find({}, {
        '_id': 0,
        '__v': 0,
    })
}


async function saveLaunch(launch){
    const planet = await planets.findOne({
        keplerName: launch.target
    })

    if (!planet){
        throw new Error("No matching planet was found.")
    }

    await launches.findOneAndUpdate({
        flightNumber: launch.flightNumber
    }, launch, {
        upsert: true,
    })
}


async function getLatestFlightNumber(){
    const latestLaunch = await launches
    .findOne({})
    .sort('-flightNumber')

    if (!latestLaunch){
        return DEFAULT_FLIGHT_NUMBER
    }
    return latestLaunch.flightNumber
}


async function existsLaunchWithId(launchId){
    return await launches.findOne({
        flightNumber: launchId,
    }) 
}


async function scheduleNewLaunch(launch){
    const newFlightNumber = await getLatestFlightNumber() + 1
    const newLaunch = Object.assign(launch, {
        upcoming: true,
        success: true,
        customers: ["ZTM", "ISRO"],
        flightNumber: newFlightNumber,
    })

    await saveLaunch(newLaunch)
}


async function abortLaunchWithId(launchId){
    return await launches.findOneAndUpdate({
        flightNumber: launchId,
    }, {
        upcoming: false,
        success: false
    })
}

module.exports = {
    getAllLaunches,
    scheduleNewLaunch,
    existsLaunchWithId, 
    abortLaunchWithId
}