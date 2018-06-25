"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventEmiter {
    constructor() {
        this.events = {};
    }
    once(evt, listener) {
        return this.on(evt, listener, 0);
    }
    on(evt, listener, time = -1) {
        let listeners = this.getListeners(evt);
        let listenerWrapper = {
            listener: listener,
            time: time
        };
        listeners.push(listenerWrapper);
    }
    emit(evt) {
        const args = Array.prototype.slice.call(arguments, 1);
        return this.trigger(evt, args);
    }
    off(evt) {
        this.events[evt] && delete this.events[evt];
    }
    removeListener(evt, listener) {
        let listeners = this.getListeners(evt);
        for (let i = 0; i < listeners.length; i++) {
            if (listeners[i].listener == listener) {
                delete listeners[i];
            }
        }
    }
    trigger(evt, args) {
        let listeners = this.getListeners(evt);
        for (let i = 0; i < listeners.length; i++) {
            let listener = listeners[i];
            if (listener.time != -1) {
                listener.time--;
            }
            if (listener.time == 0) {
                this.removeListener(evt, listener.listener);
            }
            listener.listener.apply(this, args || []);
        }
    }
    getListeners(evt) {
        return this.events[evt] || (this.events[evt] = []);
    }
    get Events() {
        return this.events;
    }
}
exports.default = EventEmiter;
//# sourceMappingURL=EventEmitter.js.map