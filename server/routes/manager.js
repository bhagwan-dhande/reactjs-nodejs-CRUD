const router = require('express').Router({ caseSensitive: true });
const { validateData } = require('../middlewares');
const { managerSchema, loginSchema } = require('../validationSchema');
const managerController = require('../controllers/manager.controller');

router.post('/login', validateData(loginSchema), managerController.login);
router.post('/register', validateData(managerSchema), managerController.registerManager);

module.exports = router;