export default class EventEmitter {
    constructor() {
        this.events = {};
    }
    once(eventName, listener, context) {
        return this.on(eventName, listener, context, 0);
    }
    on(eventName, listener, context, timer = -1) {
        let listeners = this.getListeners(eventName);
        listeners.push({
            listener,
            timer,
            context
        });
    }
    emit(eventName) {
        const args = Array.prototype.slice.call(arguments, 1);
        return this.trigger(eventName, args);
    }
    off(eventName) {
        this.events[eventName] && delete this.events[eventName];
    }
    trigger(eventName, args) {
        let listeners = this.getListeners(eventName);
        for (let i = 0; i < listeners.length; i++) {
            let listener = listeners[i];
            if (listener) {
                const ctx = listener.context ? listener.context : null;
                listener.listener.apply(ctx, args || []);
                listener.timer === 0 && delete listeners[i];
                listener.timer !== -1 && listener.timer--;
            }
        }
    }
    getListeners(eventName) {
        return this.events[eventName] || (this.events[eventName] = []);
    }
    get Events() {
        return this.events;
    }
}
//# sourceMappingURL=EventEmitter.js.map