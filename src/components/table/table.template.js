const CODES = {
    A: 65,
    Z: 90
}

/* function drowCell(row, column){
    return `
    <div class="cell" contenteditable="" data-column="${column}" data-row="${row}"></div>
    `
}*/

function drowCell(row){
    return function(_, column){
        return `
            <div class="cell" contenteditable="" 
            data-column="${column}"            
            data-type="cell"
            data-id="${row}:${column}"
            ></div>
        `
    }
}

function drowColumn(column, index){
    return `
        <div class="column" data-type="resizeble" data-column="${index}">
            ${column}
            <div class="column-resize" data-resize="column"></div>
        </div>
    `
}

function createRow(index, content){
    const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
    return `
        <div class="row" data-type="resizeble">
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

export function createTable(rowsCount = 31){
    const colsCout = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCout)
    .fill('')
    .map(drowChar)
    .map(drowColumn)
    .join('')

    rows.push(createRow(null, cols))

    for (let row = 0; row < rowsCount; row++){
        const cells = new Array(colsCout)
            .fill('')
            .map(drowCell(row))
            .join('')

        rows.push(createRow(row + 1, cells))
    }

    return rows.join('')
}
