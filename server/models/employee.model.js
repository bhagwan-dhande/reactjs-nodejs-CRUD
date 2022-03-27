const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    city: {
        type: String
    },
    address: {
        type: String
    },
    dob: {
        type: Date
    },
    mobile: {
        type: Number
    },
    isRemoved: {
        type: Boolean,
        default: false
    },
    managerId: {
        type: String
    }
}, {
    timestamps: true
});

const Employee = mongoose.model('employee', EmployeeSchema);
module.exports = Employee;