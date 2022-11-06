const prisma = require("../helper/database");
const dotenv = require("dotenv");
dotenv.config();

class _tracker {
    addExpense = async (req, body) => {
        const id = String(req.user.id);
        try {
            const findExpense = await prisma.tracker.findMany({
                where: {
                    userId: id,
                },
            });
            const expense = await prisma.tracker.create({
                data: {
                    userId: id,
                    type: body.type,
                    expense: body.expense,
                    description: body.description,
                },
            });
            const total_expense = await prisma.total_tracker.findUnique({
                where: {
                    userId: id,
                },
            });
            if (findExpense[0] === undefined) {
                await prisma.total_tracker.create({
                    data: {
                        userId: id,
                        total_expens: expense.expense,
                    },
                });
            } else {
                if (expense.type === "income") {
                    const expense_temp =
                        total_expense.total_expens + expense.expense;
                    await prisma.total_tracker.update({
                        where: {
                            userId: id,
                        },
                        data: {
                            total_expens: expense_temp,
                        },
                    });
                } else if (expense.type === "outcome") {
                    const expense_temp =
                        total_expense.total_expens - expense.expense;
                    await prisma.total_tracker.update({
                        where: {
                            userId: id,
                        },
                        data: {
                            total_expens: expense_temp,
                        },
                    });
                }
            }
            return {
                status: "success",
                code: 200,
                data: expense,
            };
        } catch (error) {
            console.log(error);
            return {
                status: "failed",
                code: 404,
                error,
            };
        }
    };

    getExpense = async (req, res) => {
        try {
            const expense = await prisma.tracker.findMany({
                where: {
                    userId: String(req.user.id),
                },
            });
            const total_expense = await prisma.total_tracker.findUnique({
                where: {
                    userId: String(req.user.id),
                },
            });

            return {
                status: "success",
                code: 200,
                data: { expense, total_expense },
            };
        } catch (error) {
            console.log(error);
            return {
                status: "failed",
                code: 404,
                error,
            };
        }
    };
}

module.exports = new _tracker();
