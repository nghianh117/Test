const express = require('express')
const router = express.Router()
const authController = require('../../controller/authController')
const verifyToken = require('../../controller/verifyToken')

router.get('/account', authController.getAccounts)
router.get('/account/:id', authController.getAccount)
router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/checklogin',verifyToken, authController.checkLogin)

module.exports = router 