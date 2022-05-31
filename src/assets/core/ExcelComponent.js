import {DomListener} from '../../assets/core/DomListener'

export class ExcelComponent extends DomListener{
    constructor($root, options = {}){
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.subscribe = options.subscribe || []
        this.store = options.store
        this.unsubsribes = []

        this.prepare()
    }

    prepare(){
    }

    toHTML(){
        return ''
    }

    $emit(event, ...args){
        this.emitter.emit(event, ...args)
    }

    $on(event, fn){
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubsribes.push(unsub)
    }

    $dispatch(action){
        this.store.dispatch(action)
    }

    storeChanget(){}

    isWatching(key){
        return this.subscribe.includes(key)
    }

    init(){
        this.initDOMListeners()
    }

    destroy(){
        this.removeDOMListeners()
        this.unsubsribes.forEach(unsub => unsub())
    }
}
