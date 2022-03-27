const Employee = require("../models/employee.model");


exports.getEmployeeList = async function (obj, manager) {
    let page = parseInt(obj.page) || 0;
    let pageLimit = parseInt(obj.pageLimit) || 10;
    page = page > 1 ? page - 1 : 0;
    let employees = await Employee.aggregate([
        {
            $match: {
                isRemoved: false,
                managerId: manager._id
            }
        },
        { $skip: page * pageLimit },
        { $limit: pageLimit },
        { $sort: { firstName: 1, lastName: 1 } }
    ]);
    let totalEmployees = await Employee.countDocuments({ isRemoved: false, managerId: manager._id });
    return {
        success: true,
        employees,
        totalEmployees
    }
}

exports.deleteEmployee = async function (obj) {
   let employee= await Employee.findByIdAndUpdate(obj.empId, { $set: { isRemoved: true } });
    return employee;
}

exports.createEmployee = async function (obj, manager) {
    let employee = await Employee.findOne({ ...obj, isRemoved: false });
    if (employee) throw Error('Employee already registerd');
    Object.assign(obj, { managerId: manager._id });
    await Employee.create(obj);
    return true;
}

exports.updateEmployee = async function (params, obj) {
    await Employee.findByIdAndUpdate(params.empId, {
        $set: obj
    });
    return true;
}