import {$} from '../../assets/core/dom'
import {Emitter} from '../../assets/core/Emitter'
import {StoreSubsriber} from '../../assets/core/StoreSubscriber'

export class Excel{
    constructor(selector, options){
        this.$el = $(selector)
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

    render(){
        this.$el.append(this.getRoot())
        this.subscriber.subscribeComponents(this.components)
        this.components.forEach(component => component.init());
    }

    destroy(){
        this.subscriber.unsubscribeFromeStore()
        this.components.forEach(component => this.components.destroy())
    }
}
