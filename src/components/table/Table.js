import {$} from '../../assets/core/dom';
import {ExcelComponent} from '../../assets/core/ExcelComponent';
import {matrix, nextSelector} from '../../assets/core/utils';
import {tableResizeHendler} from './table.resize';
import {createTable} from './table.template';
import {TableSelection} from './TableSelection';
import * as actions from '@/redux/actions'
import {defaultStyles} from '../../constants';
import {parse} from '../../assets/core/parse';

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
        return createTable(50, this.store.getState())
    }

    prepare(){
        this.selection = new TableSelection()
    }

    init(){
        super.init()
        const $cell = this.$root.find('[data-id="0:0"]')
        this.selectCell($cell)

        this.$on('formula:input', value => {
            this.selection.current
                .attr('data-value', value)
                .text(parse(value))
            this.UpdateTextInStore(value)
        })

        this.$on('formula:done', () => {
            this.selection.current.focus()
        })

        this.$on('toolbar:applyStyle', value => {
            this.selection.applyStyles(value)
            this.$dispatch(actions.applyStyle({
                value,
                ids: this.selection.selectedIds
            }))
        })
    }

    selectCell($cell){
        this.selection.select($cell)
        this.$emit('table:select', $cell)
        const styles = $cell.getStyles(Object.keys(defaultStyles))
        console.log('Styles to dispach', styles);
        this.$dispatch(actions.changeStyles(styles))
    }

    async resizeTable(event){
        try {
            const data = await tableResizeHendler(this.$root, event)
            this.$dispatch(actions.tableResize(data))
        } catch (e) {
            console.warn('Resize error: ', e.massage)
        }
    }

    onMousedown(event){
        if (event.target.dataset.resize){
            this.resizeTable(event)
        } else if (event.target.dataset.type === 'cell') {
            const $target = $(event.target)
            if (event.shiftKey){
                const target = $target.id(true)
                const current = this.selection.current.id(true)
                const $cells = matrix(target, current)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            } else {
                this.selectCell($target)
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

    UpdateTextInStore(value) {
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            value
        }))
    }

    onInput(event){
        // this.$emit('table:input', $(event.target))
        this.UpdateTextInStore($(event.target).text())
    }
}


