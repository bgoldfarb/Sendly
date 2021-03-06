const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./config/keys')
const bodyParser = require('body-parser')
require('./models/User')
require('./services/passport')


mongoose.connect(keys.mongoURI)

const app = express();

app.use(bodyParser.json()) //any time a request comes into app, this will asign to rect.body.property of incoming request object
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, //This is in ms
        keys: [keys.cookieKey]
    })
)

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app)

//Dynamic Port Binding, Heroku will assign a port 
//to the environment variable, PORT  
const PORT = process.env.PORT || 5000

app.listen(PORT)