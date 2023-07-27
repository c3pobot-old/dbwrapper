'use strict'
const Cmds = {}
Cmds.MongoWrapper = require('./mongo')
Cmds.RedisWrapper = require('./redis')
Cmds.SocketWrapper = require('./socket')
Cmds.SvcSocket = require('./svcSocket')
module.exports = Cmds
