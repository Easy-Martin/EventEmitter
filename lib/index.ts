import EventEmitter, { EventListen, EventEmitterType } from './EventEmitter'

import eventDecorator from './Decorator'

export default EventEmitter


export type EventListen = EventListen

export {
    EventEmitterType,
    eventDecorator
}