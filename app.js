const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes/routes');
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.listen(process.env.APP_PORT, () => {
    console.log(`Express server running... at https://localhost:${process.env.APP_PORT}`);
})

routes(app)
