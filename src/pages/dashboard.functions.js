import {storage} from '../assets/core/utils'

export function toHTML(tab){
    const model = storage(tab)
    const id = tab.split(':')[1]
    return `
        <li class="db__record">
            <a href="#excel/${id}">${model.title}</a>
            <strong>
                ${new Date(model.createdDate).toLocaleDateString()}
                ${new Date(model.createdDate).toLocaleTimeString()}
            </strong>
        </li>
    `
}

function getAllTabs(){
    const tabs = []
    for (let i = 0; i < localStorage.length; i++ ){
        const tab = localStorage.key(i)
        if (!tab.includes('excel')){
            continue
        }
        tabs.push(tab)
    }
    return tabs
}

export function createdTableRecords(){
    const tabs = getAllTabs()

    if (!tabs.length){
        return `<p>Создайте вашу первую таблицу</p>`
    }

    return `
        <div class="db__list-header">
            <span>Название</span>
            <span>Дата открытия</span>
        </div>
    
        <ul class="db__list">
            ${tabs.map(toHTML).join('')}
        </ul>
    `
}


