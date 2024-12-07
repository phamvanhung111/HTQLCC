const checkInService = require('../services/checkInService');


const createCheckIn = async (req, res) => {
    try {
        const user_id = req.user_id
        const data = req.body
        console.log("Oke")
        const response = checkInService.createCheckInService(data, user_id)

        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(404).json({
            status: "Err",
            message: e
        })
    }
}


const getCheckInUser = async (req, res) => {
    try {
        const user_id = req.user_id
        const { day, month, year } = req.query
        const response = await checkInService.getCheckInUserService(user_id, day, month, year)
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(404).json({
            status: "Err",
            message: e
        })
    }
}
module.exports = {
    createCheckIn,
    getCheckInUser
}