var express = require('express');
var router = express.Router();

const UsersController = require('./controllers/users.controller')
const PortfolioController = require('./controllers/portfolios.controller')
const UserSkillsController = require('./controllers/userSkills.controller')

const verifyAccessToken = require('./middlewares/verifyAccessToken.middleware')
const verifyOwner = require('./middlewares/verifyOwner.middleware')
const upload = require('./middlewares/upload.middleware')

const onlyAllowsOwner = [verifyAccessToken, verifyOwner]

//LOGIN
router.post('/login', UsersController.bindMethod('login'));

//INDEX
router.get('/', verifyAccessToken, UsersController.bindMethod('index'));
//SHOW
router.get('/:id', verifyAccessToken, UsersController.bindMethod('show'));
//STORE
router.post('/', UsersController.bindMethod('store'));
//UPDATE
router.patch('/:id', onlyAllowsOwner, upload.single('pic'), UsersController.bindMethod('update'));
//REMOVE
router.delete('/:id', onlyAllowsOwner, UsersController.bindMethod('remove'));

//PORTFOLIO INDEX
router.get('/:userId/portfolios', verifyAccessToken, PortfolioController.bindMethod('index'));
//PORTFOLIO SHOW
router.get('/:userId/portfolios/:id', verifyAccessToken, PortfolioController.bindMethod('show'));
//PORTFOLIO STORE
router.post('/:userId/portfolios', upload.single('pic'), onlyAllowsOwner, PortfolioController.bindMethod('store'));
//PORTFOLIO UPDATE
router.patch('/:userId/portfolios/:id', upload.single('pic'), onlyAllowsOwner, PortfolioController.bindMethod('update'));
//PORTFOLIO REMOVE
router.delete('/:userId/portfolios/:id', onlyAllowsOwner, PortfolioController.bindMethod('remove'));


//SKILL STORE
router.post('/:userId/skills', onlyAllowsOwner, UserSkillsController.bindMethod('store'));
//SKILL UPDATE
router.patch('/:userId/skills/:id', onlyAllowsOwner, UserSkillsController.bindMethod('update'));
//SKILL REMOVE
router.delete('/:userId/skills/:id', onlyAllowsOwner, UserSkillsController.bindMethod('remove'));

module.exports = router;
