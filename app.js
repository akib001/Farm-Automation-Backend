require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");
const farmRoutes = require('./routes/r_farm');

const app = express();

app.use(bodyParser.json()); // application/json
app.use(express.urlencoded({extended: true}));

app.use(
    cors()
);

app.use('/farm', farmRoutes);


app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data});
});

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASS}@node-tutorial.ps5lz.mongodb.net/farmAutomation?retryWrites=true`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    )
    .then(result => {
        app.listen(process.env.PORT || 8080);
    })
    .catch(err => console.log(err));
