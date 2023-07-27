'use strict'
module.exports = class SvcSocket{
  constructor(opt = {}){
    this.io = require('socket.io-client')
    this.service = opt.service
    this.type = opt.type
    this.id = opt.id
    this.socket =  this.io(opt.url, {transports: ['websocket']})
    this.socket.on('connect', ()=>{
      console.log(this.service+' '+this.id+' is connected to '+this.type+' SocketServer')
    })
    this.socket.on('disconnect', (reason)=>{
      console.log(this.service+' Socket.io connection to '+this.type+' was disconnected for '+reason)
    })
  }
  call (obj = {}) {
    return new Promise((resolve)=>{
      try{
        this.socket.emit('request', obj, (res)=>{
          resolve(res)
        })
      }catch(e){
        console.error(e)
        resolve()
      }
    })
  }
  status () {
    return new Promise((resolve)=>{
      try{
        this.socket.emit('status', (res)=>{
          resolve(res)
        })
      }catch(e){
        console.error(e)
        resolve(0)
      }
    })
  }
}
