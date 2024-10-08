const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const router = require('./router/routers');

const mongoConnect = require('./db/connect');
mongoConnect();

app.use(express.static('../client'));
app.use(express.json({limit : "1024mb"}));
app.use(express.urlencoded({extended : true}));
app.use(router);
app.use('/uploads',express.static('./uploads'));

app.listen(process.env.PORT,() => {
    console.log(`server running at http://localhost:${process.env.PORT}`);
});