const router = require('express').Router({ caseSensitive: true });
const { employeeSchema } = require('../validationSchema');
const { verifyToken, validateData } = require('../middlewares');
const employeeController = require('../controllers/employee.controller');

router.use(verifyToken);
router.get('/list', employeeController.getEmployeeList);
router.delete('/delete/:empId', employeeController.deleteEmployee);
router.post('/create', validateData(employeeSchema), employeeController.createEmployee);
router.put('/update/:empId', validateData(employeeSchema), employeeController.updateEmployee);

module.exports = router;