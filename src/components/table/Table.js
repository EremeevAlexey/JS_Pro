import {$} from '../../assets/core/dom';
import {ExcelComponent} from '../../assets/core/ExcelComponent';
import {matrix, nextSelector} from '../../assets/core/utils';
import {TableResizeHendler} from './table.resize';
import {createTable} from './table.template';
import {TableSelection} from './TableSelection';

export class Table extends ExcelComponent{
    static className = 'excel__table'

    constructor($root, options){
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        })
    }

    toHTML(){
        return createTable(100)
    }

    prepare(){
        this.selection = new TableSelection()
    }

    init(){
        super.init()
        const $cell = this.$root.find('[data-id="0:0"]')
        this.selectCell($cell)

        this.$on('formula:input', text => {
            this.selection.current.text(text)
        })

        this.$on('formula:done', () => {
            this.selection.current.focus()
        })
    }

    selectCell($cell){
        this.selection.select($cell)
        this.$emit('table:select', $cell)
    }
    onMousedown(event){
        if (event.target.dataset.resize){
            TableResizeHendler(this.$root, event)
        } else if (event.target.dataset.type === 'cell') {
            const $target = $(event.target)
            if (event.shiftKey){
                const target = $target.id(true)
                const current = this.selection.current.id(true)
                const $cells = matrix(target, current)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            } else {
                this.selection.select($target)
            }
        }
    }

    onKeydown(event){
        const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']
        const {key} = event
        if (keys.includes(key) && !event.shiftKey){
            event.preventDefault()
            const id = this.selection.current.id(true)
            const $next = this.$root.find(nextSelector(key, id));
            this.selectCell($next)
        }
    }

    onInput(event){
        this.$emit('table:input', $(event.target))
    }
}


