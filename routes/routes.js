const userController = require('../controller/user.controller');
const todoController = require('../controller/todo.controller');
const authController = require('../controller/auth.controller');


const _routes = [
    ['users', userController],
    ['todo', todoController],
    ['login', authController],
]

const routes = (app) => {
    _routes.forEach(route => {
        const [url, controller] = route
        app.use(`/api/${url}`, controller)
    })
}

module.exports = routes 