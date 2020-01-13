import { EventEmitter } from 'events'

export class WSCLIENT extends EventEmitter {
  options
  url
  socket = null
  isConnected = false
  reconnectTimeoutId
  retryCount
  _retryCount
  reconnectInterval
  shouldAttemptReconnect

  constructor(url, options) {
    super()
    if (!url) {
      throw new Error('Please define dest url')
    }
    this.url = url && url.indexOf('ws') === -1 ? 'ws://' + url : url
    this.options = options || {}
    this.retryCount = this.options.retryCount || 2
    this._retryCount = this.retryCount
    this.reconnectInterval = this.options.reconnectInterval !== undefined ? this.options.reconnectInterval : 5
    this.shouldAttemptReconnect = !!this.reconnectInterval
  }

  start = () => {
    this.shouldAttemptReconnect = !!this.reconnectInterval
    this.isConnected = false
    this.socket = new WebSocket(this.url)
    this.socket.onmessage = this.onMessage
    this.socket.onopen = this.onOpen
    this.socket.onerror = this.onError
    this.socket.onclose = this.onClose
  }

  destroy = () => {
    clearTimeout(this.reconnectTimeoutId)
    this.shouldAttemptReconnect = false
    this.socket.close()
  }

  onError = function (reason) {
    // hook before close
  }

  onOpen = () => {
    this.isConnected = true
    this.emit('connect')
    // set again the retry count
    this.retryCount = this._retryCount
  }

  onClose = (reason) => {
    if (this.shouldAttemptReconnect && this.retryCount > 0) {
      this.retryCount--
      clearTimeout(this.reconnectTimeoutId)
      this.reconnectTimeoutId = setTimeout(() => {
        this.emit('reconnect')
        this.start()
      }, this.reconnectInterval * 1000
      )
    } else {
      this.emit('destroyed')
    }
  }

  onMessage = (message) => {
    this.emit('message', message.data)
  }

  send = (message) => {
    this.socket.send(message)
  }
}
