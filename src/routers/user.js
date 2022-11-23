const express = require('express')
const userController = require('../controllers/user')
const router = new express.Router()

const auth = require('../middleware/auth')

router.post('/users', userController.createUser)

router.post('/users/login', userController.loginUser)

router.post('/users/logout', auth, userController.logoutUser)

router.patch('/users/me', auth, userController.updateUser)

router.delete('/users/me', auth, userController.deleteUser)

module.exports = router