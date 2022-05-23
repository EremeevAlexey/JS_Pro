import {parse} from '../../assets/core/parse'
import {toInlineStyles} from '../../assets/core/utils'
import {defaultStyles} from '../../constants'

const CODES = {
    A: 65,
    Z: 90
}

function drowCell(state, row){
    return function(_, column){
        const id = `${row}:${column}`
        const width = getWidth(state.columnState, column)
        const data = state.dataState[id]
        const styles = toInlineStyles({
            ...defaultStyles,
            ...state.stylesState[id]
        })
        return `
            <div 
            class="cell" 
            contenteditable
            data-column="${column}"            
            data-type="cell"
            data-id="${id}"
            data-value="${data || ''}"
            style="${styles}; width: ${width}"
            >${parse(data) || ''}</div>
        `
    }
}

function drowColumn({column, index, width}){
    return `
        <div class="column" data-type="resizeble" data-column="${index}" style="width: ${width}">
            ${column}
            <div class="column-resize" data-resize="column"></div>
        </div>
    `
}

function createRow(index, content, state){
    const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
    const height = getHeight(state, index)
    return `
        <div class="row" data-type="resizeble" data-row="${index}" style="height: ${height}">
            <div class="row-info">
                ${index ? index : ''}
                ${resize}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `
}

function drowChar(_, index){
    return String.fromCharCode(CODES.A + index)
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state, index){
    return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index){
    return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function widthFrom(state){
    return function(column, index){
        return {
            column, index, width: getWidth(state.columnState, index)
        }
    }
}

export function createTable(rowsCount = 31, state = {}){
    const colsCout = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCout)
    .fill('')
    .map(drowChar)
    .map(widthFrom(state))
    .map(drowColumn)
    .join('')

    rows.push(createRow(null, cols, {}))

    for (let row = 0; row < rowsCount; row++){
        const cells = new Array(colsCout)
            .fill('')
            .map(drowCell(state, row))
            .join('')

        rows.push(createRow(row + 1, cells, state.rowState))
    }

    return rows.join('')
}
