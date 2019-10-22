require('dotenv').config()

if(process.env.NODE_ENV){
    module.exports = {
        mongoURI: process.env.PROD_MONGOURI,
        secret: process.env.PROD_SECRET,
        jwt: {
            publicKey: process.env.JWT_PUBLIC_KEY,
            privateKey: process.env.JWT_PRIVATE_KEY
        }
    }
}
else {
    module.exports = {
        mongoURI: process.env.DEV_MONGOURI,
        secret: process.env.DEV_SECRET,
        jwt: {
            publicKey: process.env.JWT_PUBLIC_KEY,
            privateKey: process.env.JWT_PRIVATE_KEY
        }
    }
}