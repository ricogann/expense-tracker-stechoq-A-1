const { Router } = require('express');
const authController = require('../modules/auth.module');
const response = require('../helper/response');

const router = Router();

router.post('/', async (req,res) => {
    console.log(req.body);
    const auth = await authController.authLogin(req.body);

    response.sendResponse(res, auth);
})

module.exports = router;