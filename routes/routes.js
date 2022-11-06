const userController = require('../controller/user.controller');
const authController = require('../controller/auth.controller');


const _routes = [
    ['users', userController],
    ['login', authController],
]

const routes = (app) => {
    _routes.forEach(route => {
        const [url, controller] = route
        app.use(`/api/${url}`, controller)
    })
}

module.exports = routes 
