const config = {
    dev:{
        host:process.env.REACT_APP_SERVER_HOST,
        port:process.env.REACT_APP_SERVER_PORT,
        serverEndpoint: function () {return `http://${this.host}:${this.port}`}
    }
}

export const env = config['dev'] 