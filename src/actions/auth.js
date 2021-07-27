import {AUTH, START_LOADING, END_LOADING } from '../constants/actionTypes'
import * as api from '../api/index'

export const signin = (formData, history) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING})
        const {data} = await api.signin(formData, history)
        
        data.result.password = formData.password
        dispatch({type: AUTH, data})
        dispatch({type: END_LOADING})
        history.push('/')
    } catch (error) {
        dispatch({type: END_LOADING})
        console.log(error.message)
    }
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING})
        const {data} = await api.signup(formData, history)
        
        data.result.password = formData.password
        dispatch({type: AUTH, data})
        dispatch({type: END_LOADING})
        history.push('/')
    } catch (error) {
        dispatch({type: END_LOADING})
        console.log(error.message)
    }
}