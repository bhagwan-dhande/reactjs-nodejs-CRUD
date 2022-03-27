const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const router = require('./routes');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

_server();
async function _server() {
    try {
        app.use(cors());
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());
        app.use('/', router);
        app.listen(process.env.PORT, process.env.HOST, () => {
            console.log(`Server running at http://${process.env.HOST}:${process.env.PORT}/`);
        });
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }, () => console.log("Connected to database"));
    }
    catch (err) {
        console.log("🚀 ~ file: app.js ~ line 23 ~ _server ~ err", err)

    }
}