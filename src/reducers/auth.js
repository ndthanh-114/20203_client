import {AUTH, LOGOUT, START_LOADING, END_LOADING } from '../constants/actionTypes'

const auth =  (state = {authData: null, isLoading: true}, action) => {
    switch (action.type) {
        case START_LOADING: 
            return {...state, isLoading: true}
        case END_LOADING: 
            return {...state, isLoading: false}
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({...action?.data}))

            return {...state, authData: null};
        case LOGOUT: 
            localStorage.clear();
            
            return {...state, authData: null};
        default:
            return state;

    }
}
export default auth