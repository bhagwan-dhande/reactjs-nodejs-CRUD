const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Manager = require("../models/manager.model");

exports.login = async function (obj) {
    let manager = await Manager.findOne({ isRemoved: false, email: obj.email });
    if (!manager) throw Error(`${obj.email} is not registerd`);
    let password = await bcrypt.compare(obj.password, manager.password);
    if (!password) throw Error('Invalid credentials');
    let token = jwt.sign(
        manager.toJSON(),
        process.env.JWT_SECRET_KEY,
    );
    return {
        success: true,
        message: 'Logged in successfully',
        token,
        manager
    };
}

exports.registerManager = async function (obj) {
    let manager = await Manager.findOne({ isRemoved: false, email: obj.email });
    if (manager) throw Error('Email already registered');
    let hashPassword = await bcrypt.hash(obj.password, 10);
    obj.password = hashPassword;
    await Manager.create(obj);
    return true
}