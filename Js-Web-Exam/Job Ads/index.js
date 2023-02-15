const express = require("express");
const { PORT } = require('./src/config/env');
const { dataBase } = require('./src/config/database');
const  handleBars  = require('./src/config/handlebars');
const app = express();
const router = require('./router');
const cookie = require('cookie-parser');
const { auth } = require('./src/middlewares/authMIddleware');

app.use("/static", express.static('static'));

handleBars(app);

app.use(express.urlencoded({extended: false}));

app.use(cookie());

app.use(auth);

app.use(router);

dataBase()
.then(() => {
    app.listen(PORT, () => console.log(`Server is working on port ${PORT}` ))
})
.catch((error) => {
    console.log("Cannot connect to db:", error);
})