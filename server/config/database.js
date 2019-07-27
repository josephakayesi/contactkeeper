class Database {
    constructor() {
        this.mongoose = require('mongoose')
        this.db = require('./keys').mongoURI
    }

    connectDatabase() {
        this.mongoose.connect(this.db, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
            .then(() => console.log('MongoDB connected'))
            .catch(err => {
                console.error(err)
                process.exit(1)
            })
    }
}

module.exports = new Database()