const Joi = require('joi');


const managerSchema = Joi.object({
    dob: Joi.string().required(),
    company: Joi.string().required(),
    address: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    firstName: Joi.string().required()

});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const employeeSchema = Joi.object({
    dob: Joi.string().required(),
    city: Joi.string().required(),
    mobile: Joi.number().required(),
    address: Joi.string().required(),
    lastName: Joi.string().required(),
    firstName: Joi.string().required()
});


module.exports = {
    loginSchema,
    managerSchema,
    employeeSchema
}
