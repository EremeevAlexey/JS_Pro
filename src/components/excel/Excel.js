import {$} from '../../assets/core/dom'
import {Emitter} from '../../assets/core/Emitter'
import {StoreSubsriber} from '../../assets/core/StoreSubscriber'
import {preventDefault} from '../../assets/core/utils'
import {updateDate} from '../../redux/actions'

export class Excel{
    constructor(options){
        this.components = options.components || []
        this.store = options.store
        this.emitter = new Emitter()
        this.subscriber = new StoreSubsriber(this.store)
    }

    getRoot(){
        const $root = $.cereate('div', 'excel')

        this.components = this.components.map(Component => {
            const $el = $.cereate('div', Component.className)
            const component = new Component($el, {
                emitter: this.emitter,
                store: this.store
            })
            $el.html(component.toHTML())
            $root.append($el)
            return component
        })
        return $root
    }

    init(){
        if (process.env.NODE_ENV === 'production'){
            document.addEventListener('contextmenu', preventDefault)
        }
        this.store.dispatch(updateDate())
        this.subscriber.subscribeComponents(this.components)
        this.components.forEach(component => component.init());
    }

    destroy(){
        this.subscriber.unsubscribeFromeStore()
        this.components.forEach(component => component.destroy())
        document.removeEventListener('contextmenu', preventDefault)
    }
}
