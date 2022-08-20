require('./routers/strategies/discord');
const express = require('express')
var session = require('express-session')
const cors = require('cors')
const passport = require('passport')
const config = require('./config')
const MongoDbStore = require('connect-mongo');


let mongoose = require('mongoose')
mongoose.connect(config.database)

const app = express();

app.use(session({
    secret: 'secret',
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    resave: false,
    saveUninitialized: false,
    store: MongoDbStore.create({
        mongoUrl: config.database
    })
}))
app.use(passport.initialize());
app.use(passport.session());

// app.use(cors({
//     origin: ["*"],
//     credentials: true
// }))

// app.use(cors({
//     origin: "*",
// }))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/test', (req, res) => res.json({ msg: "success" }))

let apiRoutes = require('./routers')
app.use('/api', apiRoutes)

console.log('frontend_build', `${__dirname}/build`)
app.use(express.static(`${__dirname}/build`))

app.use('/*', (req, res) => {
    res.sendFile(`${__dirname}/build/index.html`)
})

const port = process.env.PORT || config.port;
app.listen(port, () => {
    console.log(`App is listening to ${port}`);
})