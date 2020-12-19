const express = require('express')
const router = express.Router()

// get data from controller
const { getUserData, loginUser, registerUser, updateUser } = require('../controllers/UserController')

// validate data
const { validateUserLogin, validateUserRegister, validateUserUpdate } = require('../validators/ValidateUser')

// validate auth
const { isLogged, isNotLogged } = require('../middlewares/Auth')

// history
const { setHistory } = require('../middlewares/History')

router.get('/', [isLogged], getUserData)
router.put('/:id', [isLogged, validateUserUpdate], setHistory('user', 'update'), updateUser)
router.post('/login', [isNotLogged, validateUserLogin], loginUser)
router.post('/register', [isNotLogged, validateUserRegister], registerUser, loginUser)

module.exports = router