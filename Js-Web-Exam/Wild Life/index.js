const express = require('express');
const { PORT } = require('./src/config/env')
const app = express();
const handlerBars = require('./src/config/handlerbars');
const { dataBase } = require('./src/config/database');
const router = require('./router');
const cookie = require('cookie-parser');
const { auth } = require('./src/middleware/authMIddleware');
handlerBars(app);

app.use('/static', express.static('static'));

app.use(express.urlencoded({extended: false}));

app.use(cookie());
app.use(auth);
app.use(router);

dataBase()
.then(() => {
    app.listen(PORT,() => console.log(`Server working on ${PORT}`));
})
.catch((err) => {
    console.log("Cannot connect to db:", err);
});
