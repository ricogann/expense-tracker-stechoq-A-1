const express = require("express");
const trackerController = require("../modules/tracker.module");
const response = require("../helper/response");
const authenticateToken = require("../middlewares/verifiy.token");

const router = express.Router();

router.post("/", authenticateToken, async (req, res) => {
    console.log(req.body);
    const expense = await trackerController.addExpense(req, req.body);

    response.sendResponse(res, expense);
});

router.get("/", authenticateToken, async (req, res) => {
    const expense = await trackerController.getExpense(req, res);

    response.sendResponse(res, expense);
});

module.exports = router;
