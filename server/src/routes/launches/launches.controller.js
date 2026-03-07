const { 
    getAllLaunches,
    scheduleNewLaunch,
    existsLaunchWithId,
    abortLaunchWithId,
 } = require("../../models/launches.models");


async function httpGetAllLaunches(req, res) {
    const launches = await getAllLaunches()
    return await res.status(200).json(launches);
}

async function httpAddNewLaunch(req, res){
    const launch = req.body
    try{
        await scheduleNewLaunch(launch)
    } catch(err){
        console.error('Failed to save launch')
    }
    return res.status(201).json(launch)
}


async function httpAbortLaunch(req, res){
    const launchId = req.params.id
    const exists = await existsLaunchWithId(launchId) 
    if (!exists){
        return res.status(404).json({
            "error": "Launch with this id doesn't exists."
        })
    }

    const aborted = await abortLaunchWithId(launchId)
    return res.status(200).json(aborted)
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
}