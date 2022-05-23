export function capitalize(string){
    if (typeof string !== 'string'){
        return ''
    }
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export function range(start, end){
    if (start > end){
        [end, start] = [start, end]
    }
    return new Array(end - start + 1)
        .fill('')
        .map((_, index) =>start + index)
}

export function matrix(target, current){
    const columns = range(current.column, target.column)
    const rows = range(current.row, target.row)

    return columns.reduce((acc, column) => {
        rows.forEach( row => acc.push(`${row}:${column}`))
        return acc
    }, [])
}

export function nextSelector(key, {column, row}){
    const minValue = 0
    switch (key){
        case 'Enter':
        case 'ArrowDown':
            row++
            break
        case 'ArrowRight':
        case 'Tab':
            column++
            break
        case 'ArrowLeft':
            column = column - 1 < minValue ? minValue : column - 1;
            break
        case 'ArrowUp':
            row = row - 1 < minValue ? minValue : row - 1;
            break
    }
    return `[data-id="${row}:${column}"]`
}

export function storage(key, data){
    if (!data){
        return JSON.parse(localStorage.getItem(key))
    }
    localStorage.setItem(key, JSON.stringify(data))
}

export function isEqual(a, b){
    if (typeof a === 'object' && typeof b === 'object'){
        return JSON.stringify(a) === JSON.stringify(b)
    }
    return a === b
}

export function camelToDashCase(str){
    return str.replace(/[A-Z]/g, g => `-${g[0].toLowerCase()}`)
}
export function toInlineStyles(styles = {}){
    return Object.keys(styles)
        .map(key => `${camelToDashCase(key)}: ${styles[key]}`)
        .join(';')
}

export function debounce(fn, wait){
    let timeout
    return function(...args){
        const later = () => {
            clearTimeout(timeout)
            // eslint-disable-next-line
            fn.apply(this, args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}
