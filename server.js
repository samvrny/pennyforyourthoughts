const express = require('express');
const sequelize = require('./config/connection');
const path = require('path');
const allRoutes = require('./controllers');
const expressHandlebars = require('express-handlebars');
const handlebars = expressHandlebars.create({});

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//turn on routes
app.use(allRoutes);

//turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}!`))
});

