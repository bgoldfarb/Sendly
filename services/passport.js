const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

//fetch users when one param, this is the model class
//.save() saves instance of 'User' to database
const User = mongoose.model('users')

passport.serializeUser((user, done) => {
    done(null, user.id)
});

 passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback' 
    },
    (accessToken, refreshToken, profile, done) => {
     User.findOne({ googleId: profile.id})
        .then((existingUser) => {
            if(existingUser){
                //we already have a record with given profile ID
                done(null, existingUser);
            } else {
                //we don't have user record with profile ID
                //Creating a model instance here
                new User({googleId: profile.id})
                    .save()
                    .then(user => done(null, user))
            }  
        })
    })
);

