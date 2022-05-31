import {clone} from '../assets/core/utils'
import {defaultStyles, defaultTitle} from '../constants'

const defaultState = {
    title: defaultTitle,
    rowState: {},
    columnState: {},
    dataState: {},
    stylesState: {},
    curretText: '',
    currentStyles: defaultStyles,
    createdDate: new Date().toJSON()
}

const normalize = state => ({
    ...state,
    currentStyles: defaultStyles,
    curretText: ''
})

export function normalizeInitialState(state){
    return state ? normalize(state) : clone(defaultState)
}
