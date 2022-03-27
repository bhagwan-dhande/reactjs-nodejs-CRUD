const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const bearerToken = req.headers['authorization'];
    if (!bearerToken) {
        return res.status(403).send({
            success: false,
            message: "A token is required for authentication"
        });
    }
    const token = bearerToken.split(' ');
    try {
        const decoded = jwt.verify(token[1], process.env.JWT_SECRET_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send({
            success: false,
            message: err.message
        });
    }
    return next();
};


exports.validateData = function (schema) {
    return async (req, res, next) => {
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
        };
        const { error, value } = schema.validate(req.body, options);
        if (error) {
            let errors = error.details.map(detail => detail.message).join(', ').replace(/"/g, "");
            res.status(422).send({
                success: false,
                message: errors
            });
        } else {
            next();
        }
    }
}
