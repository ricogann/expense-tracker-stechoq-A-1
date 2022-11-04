const prisma = require('../helper/database');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

class _user {
    getUsers = async (req, res) => {
        try {
            const user = await prisma.user.findMany();

            return {
                status: 'true',
                code: 200,
                data: user.filter((b) => b.email === req.user.email),
            }
        } catch (error) {
            console.log(error);
            return {
                status: 'false',
                error
            }
        }
    }

    getUsersAll = async () => {
        try {
            const user = await prisma.user.findMany();

            return {
                status: 'true',
                code: 200,
                data: user,
            }
        } catch (error) {
            console.log(error);
            return {
                status: 'false',
                error
            }
        }
    }

    addUsers = async (body) => {
        const hash_password = await bcrypt.hash(body.password, 12);
        try {
            const user = await prisma.user.create({
                data:{
                    email: body.email,
                    password: hash_password,
                }
            });
            return {
                status: 'true',
                code: 200,
                data: user,
            }
        }catch(error){
            console.log(error);
            return {
                status: 'false',
                error
            }
        }
    }

    updateUsers = async (body) => {
        try {
            const user = await prisma.user.update({
                where:{
                    id: Number(body.id),
                },
                data:{
                    email: body.email,
                    password: body.password,
                }
            })
            return {
                status: 'true',
                code: 200,
                data: user,
            }
        } catch (error) {
            console.log(error)
            return {
                status: 'false',
                error
            }
        }
    }

    deleteUsers = async (id) => {
        try {
            const user = await prisma.user.delete({
                where:{
                    id: Number(id),
                }
            })
            return {
                status: 'true',
                code: 200,
                data: user,
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

module.exports = new _user();
