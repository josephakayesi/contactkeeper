const express = require('express')
const path = require('path')
const app = express()
const Route = require('./config/route')
const Database = require('./config/database')
const Middleware = require('./config/middleware')

// Connect to db
Database.connectDatabase()

// Express middleware : Accept json data
app.use(express.urlencoded({ extended: false }))
app.use(express.json({ extended: false }))

// Passport middleware
app.use(Middleware.Passport().initialize)

// Passport configuration
Middleware.Passport().configure

// Use routes
app.use('/api/users', Route.getRoute().users)
app.use('/api/contacts', Route.getRoute().contacts)
app.use('/api/auth', Route.getRoute().auth)

// Server static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('../client/build'))

    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'))
    })
}

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server listening on port ${port}`))