const launches = new Map();

let latestFlightNumber = 100

const launch = {
    mission: "Chandrayan 3",
    rocket: "PSLV-C54",
    launchDate: new Date("March 26, 2026"),
    target: "Moon",
    flightNumber: 100,
    customers: ["ISRO", "NASA"],
    upcoming: true,
    success: true,
}

launches.set(launch.flightNumber, launch);

function getAllLaunches(){
    return Array.from(launches.values())
}

function addNewLaunch(launch){
    latestFlightNumber++
    launches.set(latestFlightNumber, Object.assign(launch, {
        customers: ["ZTM", "ISRO"],
        upcoming: true,
        success: true,
        flightNumber: latestFlightNumber
    }))
}


function existsLaunchWithId(launchId){
    return launches.has(launchId)
}


function abortLaunchWithId(launchId){
    const aborted = launches.get(launchId)
    aborted.upcoming = false
    aborted.success = false
    return aborted
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId, 
    abortLaunchWithId
}