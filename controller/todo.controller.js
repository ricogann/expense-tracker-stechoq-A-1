const express = require('express');
const todoController = require('../modules/todo.module');
const response = require('../helper/response');
const authenticateToken = require('../middlewares/verifiy.token');

const router = express.Router();

router.get('/', authenticateToken ,async (req,res) => {
    const todo = await todoController.getTodo(req,res);

    response.sendResponse(res, todo);
});

router.post('/', authenticateToken ,async(req,res) => {
    const todo = await todoController.addTodo(req, req.body);

    response.sendResponse(res, todo);
})

router.put('/', async(req,res) => {
    const todo = await todoController.updateTodo(req.body);

    response.sendResponse(res, todo);
})

router.delete('/:id', async(req,res) => {
    const todo = await todoController.deleteTodo(req.params.id);

    response.sendResponse(res, todo);
})

module.exports = router;