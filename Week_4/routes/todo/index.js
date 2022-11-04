const express = require('express')
const router = express.Router()
const todoController=require('../../controller/todoController')
const middleware=require('../../controller/Middleware')


router.get('/',middleware.checkLogin,todoController.getTodos) 
router.get('/add/',middleware.checkLogin,todoController.addTodo) 
router.get('/:id',middleware.checkLogin,todoController.formUpdate)
router.post('/create/',middleware.checkLogin,todoController.createTodo)
router.post('/search',middleware.checkLogin,todoController.searchTodo)
router.post('/updateStatus/:id',middleware.checkLogin,todoController.updateStatus)
router.put('/update/:id',middleware.checkLogin,todoController.updateTodo)
router.delete('/delete/:id',middleware.checkLogin,todoController.deleteTodo)

module.exports = router