const { Router } = require('express');
const userController = require('../modules/user.module');
const response = require('../helper/response');
const authenticateToken = require('../middlewares/verifiy.token');

const router = Router();

router.get('/info', authenticateToken ,async (req,res) => {
    const user = await userController.getUsers(req,res);

    response.sendResponse(res, user);
});

router.get('/', async (req, res) => {
    const user = await userController.getUsersAll();

    response.sendResponse(res, user);
})

router.post('/', async(req,res) => {
    const user = await userController.addUsers(req.body);

    response.sendResponse(res, user);
})

router.put('/', async(req,res) => {
    const user = await userController.updateUsers(req.body)

    response.sendResponse(res, user);
})

router.delete('/:id', async(req,res) => {
    const user = await userController.deleteUsers(req.params.id);

    response.sendResponse(res, user);
})

module.exports = router;