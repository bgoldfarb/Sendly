const passport = require('passport')


module.exports = (app) => {

    app.get(
        '/auth/google',
        passport.authenticate('google', {
            //determines what we want from the user, permisions from user
            //we can also ask for contact list....
            scope: ['profile', 'email']
        })
    );

    app.get('/auth/google/callback', passport.authenticate('google'))

};