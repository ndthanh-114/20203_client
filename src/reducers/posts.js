import {START_LOADING, END_LOADING, COMMENT, FETCH_ALL, CREATE, DELETE, UPDATE } from '../constants/actionTypes'

const posts = (state = {isLoading: false, posts: []}, action) => {
    switch (action.type) {
        case START_LOADING: 
            return {...state, isLoading: true}
        case END_LOADING: 
            return {...state, isLoading: false}
        case FETCH_ALL:
        case CREATE:
            return {...state, posts: action.payload};
        case COMMENT:
            return {...state, posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post)};
        case UPDATE:
            return {...state, posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post)};
        case DELETE:
            return {...state, posts: state.posts.filter(post => post._id !== action.payload)};
        default:
            return state;
    }
}

export default posts