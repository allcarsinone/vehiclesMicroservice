class RabbitMockAdapter {
    constructor () {

    }
    async listenToMessages (callback, queueName = 'updateAvailability') {
        console.log('Listening to messages...')
    }

}

module.exports = RabbitMockAdapter