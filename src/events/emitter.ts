import EventEmitter from 'events'

let evt: EventEmitter;
export const getEmitter = ():EventEmitter => {
    if (!evt) {
        evt = new EventEmitter();
    }
    return evt;
}