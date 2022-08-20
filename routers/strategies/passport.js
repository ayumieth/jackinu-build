const cfg = require('../../config')
var passport = require('passport')
var DiscordStrategy = require("passport-discord.js").Strategy;

console.log("passport strategy");
passport.use(new DiscordStrategy({
    clientID: cfg.clientId,
    clientSecret: cfg.clientSecret,
    callbackURL: cfg.callbackurl,
    scope: ['identify', 'guilds'],
}, (accessToken, refreshToken, profile, done) => {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
}))

module.exports = passport;