
const handlersBars = require('express-handlebars');
module.exports = (app) => {
    app.engine('hbs', handlersBars.engine({
        extname: "hbs",
    }));
app.set('view engine', 'hbs');
app.set('views', './src/views');
}