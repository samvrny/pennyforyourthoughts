const express = require('express');
const sequelize = require('./config/connection');
const path = require('path');
const allRoutes = require('./controllers');
const expressHandlebars = require('express-handlebars');
const helpers = require('./utils/helpers');
const handlebars = expressHandlebars.create({ helpers });
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'A beer a day',
    cookie: { 
        expires: 5 * 60 * 1000
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(session(sess));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//turn on routes
app.use(allRoutes);

//turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}!`))
});

