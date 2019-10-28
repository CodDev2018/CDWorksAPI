var express = require('express');
var router = express.Router();

const ApplicationsController = require('./controllers/application.controller')

const verifyAccessToken = require('./middlewares/verifyAccessToken.middleware')
const verifyApplicationOwner = require('./middlewares/verifyApplicationOwner.middleware')

const onlyAllowsOwner = [verifyAccessToken, verifyApplicationOwner]

//INDEX
router.get('/', verifyAccessToken, ApplicationsController.bindMethod('index'));
//SHOW
router.get('/:id', verifyAccessToken, ApplicationsController.bindMethod('show'));
//STORE
router.post('/', verifyAccessToken, ApplicationsController.bindMethod('store'));
//UPDATE
router.patch('/:id', onlyAllowsOwner, ApplicationsController.bindMethod('update'));
//REMOVE
router.delete('/:id', onlyAllowsOwner, ApplicationsController.bindMethod('remove'));

module.exports = router;
