import { eventDecorator, EventEmitterType, EventListen } from './index'

@eventDecorator
class Test implements EventEmitterType {
    on: (eventName: string, listener: Function, timer?: number) => void
    emit: (eventName: string, context?: Object, ...args: Array<any>) => void
    remove: (eventName: string) => void
    off: (eventName: string, listener: Function) => void
    once: (eventName: string, listener: Function) => void
    getEvents: () => { [key: string]: Array<EventListen> }
    constructor() {
        this.on('aa', this.callback)
        this.emit('aa', this)
    }
    callback() {
        console.log(this.getEvents())
    }
}

new Test()
