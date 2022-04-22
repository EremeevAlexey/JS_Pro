import {ExcelComponent} from '../../assets/core/ExcelComponent';
import {TableResizeHendler} from './table.resize';
import {createTable} from './table.template';

export class Table extends ExcelComponent{
    static className = 'excel__table'

    constructor($root){
        super($root, {
            listeners: ['mousedown']
        })
    }

    toHTML(){
        return createTable(100)
    }

    onMousedown(event){
        if (event.target.dataset.resize){
            TableResizeHendler(this.$root, event)
        }
    }
}
