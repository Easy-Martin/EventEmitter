type EventListen = {
    listener: Function
    timer: number
    context?: Object
}
export default class EventEmitter {
    constructor() {}

    /**
     * 缓存所有事件
     */
    private events: { [key: string]: Array<EventListen> } = {}

    /**
     * 绑定后执行一次
     * @param eventName string -> eventName
     * @param listener Function -> Event callback
     * @param context Object
     */
    once(eventName: string, listener: Function, context?: Object) {
        return this.on(eventName, listener, context, 0)
    }

    /**
     *
     * @param eventName string eventName -> EventName
     * @param listener Function -> Event Callback
     * @param context Object
     * @param timer number -> timer
     */
    on(eventName: string, listener: Function, context?: Object, timer: number = -1) {
        let listeners = this.getListeners(eventName)
        listeners.push({
            listener,
            timer,
            context
        })
    }

    /**
     * 对外得事件触发器
     * @param eventName string event Name
     */
    emit(eventName: string) {
        const args = Array.prototype.slice.call(arguments, 1)
        return this.trigger(eventName, args)
    }

    /**
     * 事件解绑
     * @param eventName string event Name
     */
    off(eventName: string) {
        this.events[eventName] && delete this.events[eventName]
    }


    /**
     * 事件触发器
     * @param eventName
     * @param args
     */
    private trigger(eventName: string, args: Array<any>) {
        let listeners = this.getListeners(eventName)
        for (let i = 0; i < listeners.length; i++) {
            let listener = listeners[i]
            if (listener) {
                const ctx = listener.context ? listener.context : null
                listener.listener.apply(ctx, args || [])
                listener.timer === 0 && delete listeners[i]
                listener.timer !== -1 && listener.timer--
            }
        }
    }

    /**
     * 获取所有Listener
     * @param eventName
     */
    private getListeners(eventName: string) {
        return this.events[eventName] || (this.events[eventName] = [])
    }

    /**
     * 获取事件对象
     */
    get Events(): { [key: string]: Array<EventListen> } {
        return this.events
    }
}
