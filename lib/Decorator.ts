import EventEmitter, { EventEmitterType } from './EventEmitter'
const __event = new EventEmitter()

export default function eventDecorator<T extends EventEmitterType & any>(
    target: T
) {
    target.prototype.on = __event.on.bind(__event)
    target.prototype.off = __event.off.bind(__event)
    target.prototype.remove = __event.remove.bind(__event)
    target.prototype.getEvents = __event.getEvents.bind(__event)
    target.prototype.emit = function(
        eventName: string,
        ...params: Array<string>
    ) {
        __event.emit.call(__event, eventName, this, ...params)
    }
}
