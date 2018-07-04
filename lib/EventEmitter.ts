export type EventListen = {
    listener: Function
    timer: number
}

export interface EventEmitterType {
    on: (eventName: string, listener: Function, timer?: number) => void
    emit: (eventName: string, context?: Object, ...args: Array<any>) => void
    remove: (eventName: string) => void
    off: (eventName: string, listener: Function) => void
    once: (eventName: string, listener: Function) => void
    getEvents: () => { [key: string]: Array<EventListen> }
}

export default class EventEmitter implements EventEmitterType {
    constructor() {}

    /**
     * 缓存所有事件
     */
    private events: { [key: string]: Array<EventListen> } = {}

    /**
     * 获取事件对象
     */
    getEvents(): { [key: string]: Array<EventListen> } {
        return this.events
    }

    /**
     * 绑定后执行一次
     * @param eventName string -> eventName
     * @param listener Function -> Event callback
     * @param context Object
     */
    once(eventName: string, listener: Function) {
        return this.on(eventName, listener, 0)
    }

    /**
     *
     * @param eventName string eventName -> EventName
     * @param listener Function -> Event Callback
     * @param context Object
     * @param timer number -> timer
     */
    on(eventName: string, listener: Function, timer: number = -1) {
        let listeners = this.getListeners(eventName)
        listeners.push({
            listener,
            timer
        })
    }

    /**
     * 对外得事件触发器
     * @param eventName string event Name
     */
    emit(eventName: string, context?: Object, ...args: Array<any>) {
        return this.trigger(eventName, args, context)
    }

    /**
     * 事件解绑
     * @param eventName string event Name
     */
    remove(eventName: string) {
        this.events[eventName] && delete this.events[eventName]
    }

    /**
     * 移除事件监听
     * @param eventName string
     * @param listener Function
     */
    off(eventName: string, listener: Function) {
        let listeners = this.getListeners(eventName)
        let index = listeners.findIndex(v => v.listener === listener)
        index !== -1 && listeners.splice(index, 1)
    }

    /**
     * 事件触发器
     * @param eventName
     * @param args
     */
    private trigger(eventName: string, args: Array<any>, context?: Object) {
        let listeners = this.getListeners(eventName)
        for (let i = 0; i < listeners.length; i++) {
            let listener = listeners[i]
            if (listener) {
                listener.listener.apply(context || null, args || [])
                listener.timer === 0 && listeners.splice(i, 1)
                listeners.length === 0 && delete this.events[eventName]
                listener.timer !== -1 && listener.timer--
            }
        }
    }

    /**
     * 获取所有Listener
     * @param eventName
     */
    private getListeners(eventName: string): Array<EventListen> {
        return this.events[eventName] || (this.events[eventName] = [])
    }
}
