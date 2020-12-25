const express = require('express')
const router = express.Router()

const { getUserData, loginUser, registerUser, updateUser, addUserAddress, removeUserAddress } = require('../controllers/UserController')
const { validateUserLogin, validateUserRegister, validateUserUpdate } = require('../validators/ValidateUser')
const { isLogged, isNotLogged } = require('../middlewares/Auth')
const { setHistory } = require('../middlewares/History')
const { ValidateAddressData } = require('../validators/ValidateAddress')
const { addAddress, updateAddress, removeAddress } = require('../controllers/AddressController')


router.post('/login', [isNotLogged, validateUserLogin], loginUser)
router.post('/register', [isNotLogged, validateUserRegister], registerUser, loginUser)

router.post('/address', [isLogged, ValidateAddressData], addAddress, setHistory('address', 'add'), addUserAddress)
router.put('/address/:id', [isLogged, ValidateAddressData], setHistory('address', 'update'), updateAddress)
router.delete('/address/:id', [isLogged, ValidateAddressData], removeAddress, setHistory('address', 'delete'), removeUserAddress)

router.get('/', [isLogged], getUserData)
router.put('/:id', [isLogged, validateUserUpdate], setHistory('user', 'update'), updateUser)

module.exports = router