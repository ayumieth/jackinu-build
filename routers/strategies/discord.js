const passport = require("passport");
var DiscordStrategy = require("passport-discord");
const config = require("../../config");
const UserSchema = require('../../models/UserSchema')
passport.serializeUser((user, done) => {
    return done(null, user.discordId)
})

passport.deserializeUser(async (discordId, done) => {
    try {
        const user = await UserSchema.findOne({ discordId })
        return user ? done(null, user) : done(null, null)
    } catch (err) {
        console.log(err)
        return done(err, null)
    }
})

passport.use(
    new DiscordStrategy({
        clientID: config.clientId,
        clientSecret: config.clientSecret,
        callbackURL: config.callbackurl,
        scope: ['identify', 'guilds']
    }, async (accesToken, refreshToken, profile, done) => {
        const { id, username, discriminator, avatar, guilds } = profile;
        try {
            console.log("profile", profile)
            const findUser = await UserSchema.findOneAndUpdate({ discordId: id }, {
                discordTag: `${username}#${discriminator}`,
                avatar,
                guilds
            }, { new: true })
            if (findUser) {
                return done(null, findUser)
            } else {
                const NewUser = new UserSchema({ discordId: id, discordTag: `${username}#${discriminator}`, avatar, guilds })
                await NewUser.save()
                return done(null, NewUser)
            }
        } catch (err) {
            console.log(err)
            return done(err, null)
        }
    })
);
