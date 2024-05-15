const axios = require('axios');

class AxiosAuthServiceAdapter {
    constructor(baseURI) {
        this.baseURI = baseURI;
    }
    async login(token) {
        console.log(this.baseURI)
        const response = await axios.get(`${this.baseURI}/auth`, {
            headers: {
                authorization: token
            }
        })
        return {
            status: response.status,
            body: response.data
        }
    }
}

module.exports = AxiosAuthServiceAdapter