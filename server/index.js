require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')
const {SERVER_PORT, SESSION_SECRET} = process.env
const middleware = require('./middlewares/checkForSession')
const swagCtrl = require('./controllers/swagController')
const authCrl = require('./controllers/authController')
const cartCtrl = require('./controllers/cartController')


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


//endpoints
app.get('/api/swag', swagCtrl.read)

app.post('/api/login', authCrl.login)

app.post('/api/register', authCrl.register)

app.post('/api/signout', authCrl.signout)

app.get('/api/user', authCrl.getUser)

app.post('/api/cart/checkout', cartCtrl.checkout)

app.post('/api/cart/:id', cartCtrl.add)

app.delete('/api/cart/:id', cartCtrl.delete)



app.listen(SERVER_PORT, () => {
    console.log(`Listening on port ${SERVER_PORT}`)
})