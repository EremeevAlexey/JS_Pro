import {DomListener} from '../../assets/core/DomListener'

export class ExcelComponent extends DomListener{
    constructor($root, options = {}){
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.unsubsribes = []

        this.prepare()
    }

    prepare(){
    }

    // Возврат шаблона компонента
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

    init(){
        this.initDOMListeners()
    }

    destroy(){
        this.removeDOMListeners()
        this.unsubsribes.forEach(unsub => unsub())
    }
}
