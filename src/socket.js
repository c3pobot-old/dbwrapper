'use strict'
module.exports = class Socket{
  constructor(opt){
    this.io = require('socket.io-client')
    this.service = opt.service
    this.type = opt.type
    this.id = opt.id
    this.socket =  this.io(opt.url, {transports: ['websocket']})
    this.socket.on('connect', ()=>{
      console.log(this.service+' '+this.id+' client is connected to Socket Server')
      this.socket.emit('message', this.service+' '+this.id+' is connected')
      this.socket.emit('identify', {id: +this.id, type: this.service}, (res)=>{
        if(res.status != 'ok') console.log('Socket.io connection error')
      })
    })
    this.socket.on('disconnect', (reason)=>{
      if(debugMsg) console.log('Socket.io connection to server was disconnected for '+reason)
    })
    this.socket.on('request', async(cmd, obj, content, callback)=>{
      try{
        if(HP && HP[cmd]){
          const status = await HP[cmd](obj, content)
          if(callback) callback(status)
        }
      }catch(e){
        if(callback) callback({status: 'error'})
      }
    })
  }
  call (method, obj, content) {
    return new Promise((resolve)=>{
      try{
        this.socket.emit('request', method, obj, content, (res)=>{
          resolve(res)
        })
      }catch(e){
        console.log(e)
        resolve()
      }
    })
  }
  send (method, obj, content, callback) {
    try{
      this.socket.emit('request', method, obj, content, (res)=>{
        if(res && res.status != 'ok') console.log(res.status)
        if(callback) callback(res)
      })
    }catch(e){
      console.error(e);
    }
  }
}
