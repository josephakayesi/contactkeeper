const express = require('express')
const app = express()
const Route = require('./config/route')
const Database = require('./config/database')

// Connect to db
Database.connectDatabase()

// Use routes
app.use('/api/users', Route.getRoute().users)
app.use('/api/contacts', Route.getRoute().contacts)
app.use('/api/auth', Route.getRoute().auth)

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server listening on port ${port}`))