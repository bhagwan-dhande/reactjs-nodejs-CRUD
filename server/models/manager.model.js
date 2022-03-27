const mongoose = require('mongoose');

const ManagerSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        unique:true
    },
    password: {
        type: String
    },
    address: {
        type: String
    },
    dob: {
        type: Date
    },
    company: {
        type: String
    },
    isRemoved: {
        type: Boolean,
        default: false
    }
},{
    timestamps:true
});

const Manager = mongoose.model('manager', ManagerSchema);
module.exports = Manager;