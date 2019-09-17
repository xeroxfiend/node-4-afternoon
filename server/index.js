require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')
const {SERVER_PORT, SESSION_SECRET} = process.env
const middleware = require('./middlewares/checkForSession')




app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60
    }    
}))

app.use(middleware.checkForSession)



app.listen(SERVER_PORT, () => {
    console.log(`Listening on port ${SERVER_PORT}`)
})