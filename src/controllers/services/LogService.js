class LogService {

  static async execute (log, adapter, queueName = 'log') {

    try {
     await adapter.execute(log, queueName)
    }
    catch {
      console.log(log)
    }
  }
}

module.exports = LogService