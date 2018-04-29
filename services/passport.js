const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

//fetch users when one param, this is the model class
//.save() saves instance of 'User' to database
const User = mongoose.model('users')

//This serializer is used to generate identifying peice of info for each user
//user => token
passport.serializeUser((user, done) => {
    //This user.id is not profileId == googleId, user.id, id that is generated by mongo
    done(null, user.id)
});

//Pull information from serialize back out
//token => user
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user)
        })
})

 passport.use(new GoogleStrategy(
    {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
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

