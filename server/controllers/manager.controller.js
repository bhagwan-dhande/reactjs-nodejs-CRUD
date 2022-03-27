const { managerLogger } = require('../utils/logger');
const managerService = require('../services/manager.service');

exports.login = async function (req, res) {
    try {
        let result = await managerService.login(req.body);
        managerLogger.info('Log in successfully');
        res.status(200).send(result);
    } catch (error) {
        managerLogger.error(error.message);
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
}

exports.registerManager = async function (req, res) {
    try {
        await managerService.registerManager(req.body);
        managerLogger.info('Manager created successfully');
        res.status(200).send({
            success: true,
            message: "Manager created successfully"
        });
    } catch (error) {
        managerLogger.error(error.message);
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
}