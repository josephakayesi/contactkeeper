class Middleware {
    constructor(){
        this.passport = require('passport')
    }

    Passport(){
        return {
            initialize: this.passport.initialize(),
            configure: require('./passport')(this.passport)
        }
    }
}

module.exports = new Middleware()