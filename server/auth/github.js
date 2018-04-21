const passport = require('passport')
const router = require('express').Router()
const {User} = require('../db/models')
const GitHubStrategy = require('passport-github').Strategy;
module.exports = router

if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {

  console.log('Google client ID / secret not found. Skipping Google OAuth.')

} else {

  const githubConfig = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK,
  }

  const strategy = new GitHubStrategy(githubConfig, (accessToken, refreshToken, profile, done) => {
    const githubId = profile.id
    const name = profile.displayName
    const email = profile.emails[0].value

    User.find({where: {githubId}})
      .then(foundUser => (foundUser
        ? done(null, foundUser)
        : User.create({email, name, githubId})
          .then(createdUser => done(null, createdUser))
      ))
      .catch(done)
  })


  passport.use(strategy)

  router.get('/', passport.authenticate('github', {scope: 'user'}))

  router.get('/callback', passport.authenticate('github', {
    successRedirect: '/home',
    failureRedirect: '/login'
  }))

}
