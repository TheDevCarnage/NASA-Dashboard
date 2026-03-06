const { 
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
    abortLaunchWithId,
 } = require("../../models/launches.models");

function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res){
    const launch = req.body
    if ( 
        !launch.mission || !launch.rocket || 
        !launch.launchDate || !launch.target
    ){
        return res.status(400).json({
            "error": "Missing required fields in launch body!"
        })
    }
    launch.launchDate = new Date(launch.launchDate) 
    if (launch.launchDate.toString() === "Invalid Date" || isNaN(launch.launchDate)){
        return res.status(400).json({
            "error": "Invalid date formatt in launch body!"
        })
    }
    addNewLaunch(launch)
    return res.status(201).json(launch)
}


function httpAbortLaunch(req, res){
    const launchId = req.params.id
    if (!existsLaunchWithId(launchId)){
        return res.status(404).json({
            "error": "Launch with this id doesn't exists."
        })
    }

    const aborted = abortLaunchWithId(launchId)
    return res.status(200).json(aborted)
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
}