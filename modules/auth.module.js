const prisma = require("../helper/database");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcryptjs = require("bcryptjs");

dotenv.config();

class _auth {
    authLogin = async (body) => {
        try {
            const response = await prisma.user.findUnique({
                where: {
                    email: body.email,
                },
            });
            const id = response.id;
            const match = bcryptjs.compareSync(
                body.password,
                response.password
            );
            if (match === true) {
                const user = {
                    id: id,
                    email: body.email,
                    password: body.password,
                };
                const accessToken = jwt.sign(user, "jwt-secret-code", {
                    expiresIn: "8h",
                });
                return {
                    status: "true",
                    code: 200,
                    data: user,
                    accessToken: accessToken,
                };
            } else {
                return {
                    status: "false",
                    code: 404,
                    message: "wrong password",
                };
            }
        } catch (error) {
            console.log(error);
            return {
                status: "false",
                error,
            };
        }
    };
}

module.exports = new _auth();
