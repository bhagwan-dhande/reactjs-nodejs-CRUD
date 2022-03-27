const router = require('express').Router({ caseSensitive: true });
const manager = require('../routes/manager');
const employee = require('../routes/employee');

router.use('/manager',manager);
router.use('/employee',employee);

module.exports = router