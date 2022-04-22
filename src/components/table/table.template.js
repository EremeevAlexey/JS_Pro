const CODES = {
    A: 65,
    Z: 90
}

function drowCell(_, column){
    return `
    <div class="cell" contenteditable="" data-column="${column}"></div>
    `
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

    for (let i = 0; i < rowsCount; i++){
        const cells = new Array(colsCout)
        .fill('')
        .map(drowCell)
        .join('')
        rows.push(createRow(i + 1, cells))
    }

    return rows.join('')
}
