import EventEmitter from './EventEmitter';
const __event = new EventEmitter();
export default function eventDecorator(target) {
    target.prototype.on = __event.on.bind(__event);
    target.prototype.off = __event.off.bind(__event);
    target.prototype.remove = __event.remove.bind(__event);
    target.prototype.getEvents = __event.getEvents.bind(__event);
    target.prototype.emit = function (eventName, ...params) {
        __event.emit.call(__event, eventName, this, ...params);
    };
}
//# sourceMappingURL=Decorator.js.map