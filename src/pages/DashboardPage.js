import {$} from '../assets/core/dom';
import {Page} from '../assets/core/Page';
import {createdTableRecords} from './dashboard.functions';

export class DashboardPage extends Page{
    getRoot(){
        const now = Date.now().toString()
        return $.cereate('div', 'db').html(`
            <div class="db__header">
                <h1>Exel Dashboard</h1>
            </div>

            <div class="db__new">
                <div class="db__view">
                    <a href="#excel/${now}" class="db__create">
                        Новая <br /> Таблица
                    </a>
                </div>                    
            </div>

            <div class="db__table db__view">
              ${createdTableRecords()}
            </div>
        `)
    }
}

