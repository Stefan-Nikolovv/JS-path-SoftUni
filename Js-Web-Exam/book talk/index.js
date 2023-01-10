const handlerBarsView = require('./src/config/handlerBars')
const express = require('express');
const router = require('./router');
const { dataBase } = require('./src/config/database');
const cookie = require('cookie-parser');
const { auth } = require('./src/middlewares/authMiddleWare')

const app = express();

handlerBarsView(app);

app.use('/public', express.static("public"))

app.use(express.urlencoded({extended: false}));

app.use(cookie());

app.use(auth);

app.use(router);


dataBase()
.then(() => {
    app.listen(3000, () => console.log('Server is working on port 3000!'));
})
.catch((err) => {
    console.log("Cannot connect to db:", err);
})
