import dotenv from 'dotenv'
dotenv.config()

const config = {
    dev:{
        serverHost:process.env.SERVER_HOST,
        serverPort:process.env.PORT,
        serverEndpoint: function() {return `http://${this.serverHost}:${this.serverPort}`},

        mongoURI:process.env.MONGO_URI,
        client_url:process.env.CLIENT_URL,
        jwtSecret:process.env.JWT_SECRET
    },
    prod:{}
}

export const env = config['dev']