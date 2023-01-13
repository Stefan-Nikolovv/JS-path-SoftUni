const express = require('express');

const handlerBarsView = require('./src/config/handlerBars')

const app = express();

const router = require('./router');

const { dataBase } = require('./src/config/dateBase');

const cookieParser = require('cookie-parser');

const { auth } = require('./src/middlewares/authMiddleware');

handlerBarsView(app);

app.use('/public', express.static("static"));

app.use(express.urlencoded({extended: false}));

app.use(cookieParser());

app.use(auth);

app.use(router);

dataBase()
.then(() => {
    app.listen(3000, () => 'App is running on port 3000');
})
.catch((err) => {
    console.log("Cannot connect to db:", err);
});

