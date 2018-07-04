class EventEmitter {
    constructor() {
        this.events = {};
    }
    getEvents() {
        return this.events;
    }
    once(eventName, listener) {
        return this.on(eventName, listener, 0);
    }
    on(eventName, listener, timer = -1) {
        let listeners = this.getListeners(eventName);
        listeners.push({
            listener,
            timer
        });
    }
    emit(eventName, ...args) {
        return this.trigger(eventName, args);
    }
    remove(eventName) {
        this.events[eventName] && delete this.events[eventName];
    }
    off(eventName, listener) {
        let reg = /\{\s*\[native code\]\s*\}/;
        let listenerStr = listener.toString();
        let isNativeOff = reg.test(listenerStr);
        if (isNativeOff)
            return;
        if (listener && typeof listener === 'function') {
            let listeners = this.getListeners(eventName);
            listeners.map((item, index) => {
                let listenersItemStr = item.listener.toString();
                if (!reg.test(listenersItemStr) &&
                    listenersItemStr === listenerStr) {
                    delete listeners[index];
                }
            });
            listeners.map(v => !!v).length === 0 &&
                delete this.events[eventName];
        }
        else {
            delete this.events[eventName];
        }
    }
    trigger(eventName, args) {
        let listeners = this.getListeners(eventName);
        for (let i = 0; i < listeners.length; i++) {
            let listener = listeners[i];
            if (listener) {
                listener.listener.apply(this, args || []);
                listener.timer === 0 && listeners.splice(i, 1);
                listeners.length === 0 && delete this.events[eventName];
                listener.timer !== -1 && listener.timer--;
            }
        }
    }
    getListeners(eventName) {
        return this.events[eventName] || (this.events[eventName] = []);
    }
}