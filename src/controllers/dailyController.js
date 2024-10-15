const dailyService = require('../services/dailyService');

const createDaily = async (req, res) => {
    try {
        const user_id = req.user_id
        const createDaily = req.body;
        const response = await dailyService.createDailyService(createDaily, user_id)
        return res.status(200).json(response)
    }
    catch (e) {
        return res.status(404).json({
            status: "Err",
            message: e
        })
    }
}
// Route lấy dữ liệu Daily theo Project và lọc theo ngày, tháng, hoặc năm
const getDailyByDateRange = async (req, res) => {
    const { projectId } = req.params;
    const { day, month, year } = req.query;

    try {
        const dailyRecords = await dailyService.getDailyByDateRangeService(projectId, day, month, year);
        return res.status(200).json({
            status: 'Success',
            data: dailyRecords
        });
    } catch (error) {
        return res.status(500).json({
            status: 'Error',
            message: error.message
        });
    }
};
const getDailyByUser = async (req, res) => {
    const { projectId } = req.params;
    const user_id = req.user_id;
    console.log("alo", projectId)
    try {
        const dailyRecords = await dailyService.getDailyByUserService(projectId, user_id);
        return res.status(200).json({
            status: 'Success',
            data: dailyRecords
        });
    } catch (error) {
        return res.status(500).json({
            status: 'Error',
            message: error.message
        });
    }
};
module.exports = {
    createDaily,
    getDailyByDateRange,
    getDailyByUser

}