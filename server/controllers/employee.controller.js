const { employeeLogger } = require('../utils/logger');
const employeeService = require('../services/employee.service');

exports.getEmployeeList = async function (req, res) {
    try {
        let result = await employeeService.getEmployeeList(req.query, req.user);
        res.status(200).send(result);
    } catch (error) {
        employeeLogger.error(error.message);
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
}

exports.deleteEmployee = async function (req, res) {
    try {
        let employee = await employeeService.deleteEmployee(req.params);
        employeeLogger.info(`${employee._id}  deleted successfully`);
        res.status(200).send({
            success: true,
            message: "Employee deleted successfully"
        })
    } catch (error) {
        employeeLogger.error(error.message);
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
}

exports.createEmployee = async function (req, res) {
    try {
        await employeeService.createEmployee(req.body, req.user);
        employeeLogger.info('Employee created successfully');
        res.status(200).send({
            success: true,
            message: "Employee created successfully"
        })
    } catch (error) {
        employeeLogger.error(error.message);
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
}


exports.updateEmployee = async function (req, res) {
    try {
        await employeeService.updateEmployee(req.params, req.body);
        employeeLogger.info('Employee updated successfully');
        res.status(200).send({
            success: true,
            message: "Employee updated successfully"
        })
    } catch (error) {
        employeeLogger.error(error.message);
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
}
