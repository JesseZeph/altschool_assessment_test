const express = require('express');
const router = express.Router();
const homeController = require('../controller/homeController');
const dashboardController = require('../controller/dashhboardController');
const registerController = require('../controller/registerController');
const loginController = require('../controller/loginController'); 
const allTasksController = require('../controller/allTasksController');
const completedTaskController = require('../controller/completedTaskController')



console.log('router loaded');

router.get('/', homeController.home);
router.get('/dashboard', dashboardController.dashboard);
router.get('/register', registerController.register);
router.get('/login', loginController.login);
router.get('/alltask', allTasksController.alltask);
router.get('/completedtask', completedTaskController.completedtask);


module.exports = router;