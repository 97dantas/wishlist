require('dotenv').config()
module.exports = {
    PORT: process.env.PORT || 3000,
    SECRET: process.env.SECRET,
    NODE_ENV: process.env.NODE_ENV,
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_DATABASE: process.env.MONGODB_DATABASE,
    TOKEN_EXPIRES_IN: process.env.TOKEN_EXPIRES_IN,
    BASE_URL_MAGALU: process.env.TOKEN_EXPIRES_IN || 'http://challenge-api.luizalabs.com/api/',
    REDIS_EXPIRES: process.env.REDIS_EXPIRES || 15 * 60 * 1000 // 15 minutos padrão
}
