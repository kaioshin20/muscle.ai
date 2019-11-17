const passport=require('passport')
const LocalStratergy=require('passport-local')
// const FacebookStratergy=require('passport-facebook')
// const GoogleStrategy=require('passport-google-oauth20')
const { connectdb }=require('./database/db.js')

passport.use(new LocalStratergy({
    usernameField: 'email'
},(username, password, done) => {
    connectdb('hackTIET')
        .then(db => db.collection('users').find({ email: username }))
        .then(user => user.toArray())
        .then((user) => {
            if(!user) {
                return done(new Error('username invalid'))
            }
            if(user[0].password != password) {
                return done(null, false)
            }
            done(null, user)
        })
        .catch(done)
}
)
);

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
  })
  
  module.exports = passport