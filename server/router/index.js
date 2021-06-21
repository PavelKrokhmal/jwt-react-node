const Router = require('express').Router
const userConstoller = require('../controllers/user-controller')
const {body} = require('express-validator')
const authMiddleware = require('../middlewares/auth-middleware')

const router = new Router()

router.post('/registration', body('email').isEmail(), body('password').isLength({min: 3, max: 32}), userConstoller.registration) 
router.post('/login', userConstoller.login) 
router.post('/logout', userConstoller.logout) 
router.get('/activate/:link', userConstoller.activate) 
router.get('/refresh', userConstoller.refresh) 

router.get('/users',authMiddleware, userConstoller.getUsers) 

module.exports = router