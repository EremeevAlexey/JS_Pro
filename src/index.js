import {Router} from './assets/core/routes/Router'
import {DashboardPage} from './pages/DashboardPage'
import {ExcelPage} from './pages/ExcellPage'
import './scss/index.scss'

new Router('#app', {
    dashboard: DashboardPage,
    excel: ExcelPage
})

