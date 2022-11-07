const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const routes = require("../routes/routes");
dotenv.config();

const app = express();
const port = 8888;
app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Express server running... at https://localhost:${port}`);
});

routes(app);

module.exports = app;
