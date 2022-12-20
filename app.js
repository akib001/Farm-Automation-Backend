require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");
const farmRoutes = require('./routes/r_farm');
const farmerRoutes = require('./routes/r_farmer');
const consumerRoutes = require('./routes/r_consumer');
const authRoutes = require('./routes/r_auth')

const app = express();

app.use(bodyParser.json()); // application/json
app.use(express.urlencoded({extended: true}));

app.use(
    cors({
        origin: ['https://farm-automation.netlify.app', 'http://localhost:3000', 'http://localhost:3002'],
        methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
        credentials: true,
    })
);

app.use('/farm', farmRoutes);
app.use('/auth', authRoutes);
app.use('/farmer', farmerRoutes);
app.use('/consumer', consumerRoutes);


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
