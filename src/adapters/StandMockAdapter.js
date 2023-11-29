class StandMockAdapter {
    async getStand() {
        return {
            status: 200,
            body: {
                id: '1',
                name: 'mock user',
                email: 'mockuser@test.com',
                role: 'admin',
        
        
            }  
        }
    }
}

module.exports = StandMockAdapter