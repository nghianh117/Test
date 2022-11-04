const express = require('express')
const router = express.Router()
const authController = require('../../controller/authController')


router.get('/login', authController.formLogin)
router.get('/register', authController.formRegister)
router.get('/logout', authController.logout)
router.post('/auth', authController.login)
router.get('/account', authController.getAccounts)
router.get('/account/:id', authController.getAccount)
router.post('/createAccount', authController.createAccount)

module.exports = router 