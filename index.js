const express = require('express')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('./config/keys')

const app = express();

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback' 
    },
    (accessToken, refreshToken, profile, done) => {
        console.log('accessToken', accessToken)
        console.log('refresh token', refreshToken)
        console.log('profile', profile)
    })
);

app.get(
    '/auth/google',
    passport.authenticate('google', {
        //determines what we want from the user, permisions from user
        //we can also ask for contact list....
        scope: ['profile', 'email']
    })
);

app.get('/auth/google/callback', passport.authenticate('google'))



//Dynamic Port Binding, Heroku will assign a port 
//to the environment variable, PORT 
const PORT = process.env.PORT || 5000

app.listen(PORT)