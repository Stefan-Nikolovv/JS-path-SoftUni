const handlerBars = require('express-handlebars');

module.exports = (app) => {
    app.engine('hbs', handlerBars.engine({
        extname: 'hbs'
    }))
    app.set('view engine', 'hbs');
    app.set('views', './src/views');
}