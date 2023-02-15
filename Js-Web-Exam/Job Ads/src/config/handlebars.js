const handleBars = require('express-handlebars');

module.exports = (app) => {
    app.engine('hbs', handleBars.engine({
        extname: 'hbs'
    }))
    app.set('view engine', 'hbs');
    app.set('views', './src/views');
}