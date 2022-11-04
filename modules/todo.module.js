const prisma = require('../helper/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// const salt = await bcrypt.genSalt(10);

class _todo {
    getTodo = async (req) => {
        try {
            const todo = await prisma.todo.findMany({
                where:{
                    userId: String(req.user.id),
                }
            });

            return {
                status: 'true',
                code: 200,
                data: todo,
            }
        } catch (error) {
            console.log(error);
            return {
                status: 'false',
                error
            }
        }
    }

    addTodo = async (req, body) => {
        const todos = body.todo;        
        const id = String(req.user.id);
        console.log(todos);
        try {
            const todo = await prisma.todo.create({
                data:{
                    userId: id,
                    todo: todos,
                }
            });
            return {
                status: 'true',
                code: 200,
                data: todo,
            }
        }catch(error){
            console.log(error);
            return {
                status: 'false',
                error
            }
        }
    }

    updateTodo = async (body) => {
        try {
            const todo = await prisma.todo.update({
                where:{
                    id: Number(body.id),
                },
                data:{
                    todo: body.todo,
                }
            })
            return {
                status: 'true',
                code: 200,
                data: todo,
            }
        } catch (error) {
            console.log(error)
            return {
                status: 'false',
                error
            }
        }
    }

    deleteTodo = async (id) => {
        try {
            const todo = await prisma.todo.delete({
                where:{
                    id: Number(id),
                }
            })
            return {
                status: 'true',
                code: 200,
                data: todo,
            }
        } catch (error) {
            console.log(error);
            return {
                status: 'false',
                error
            }
        }
    }

}

module.exports = new _todo();
