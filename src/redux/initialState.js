import {storage} from '../assets/core/utils'
import {defaultStyles, defaultTitle} from '../constants'

const defaultState = {
    title: defaultTitle,
    rowState: {},
    columnState: {},
    dataState: {},
    stylesState: {},
    curretText: '',
    currentStyle: defaultStyles
}

const normalize = state => ({
    ...state,
    currentStyles: defaultStyles,
    curretText: ''
})
export const initialState = storage('excel-state') ? normalize(storage('excel-state')) : defaultState

