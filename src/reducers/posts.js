import {NEW_POST, START_LOADING, END_LOADING, COMMENT, FETCH_ALL, CREATE, DELETE, UPDATE } from '../constants/actionTypes'

const posts = (state = {newPost: {}, isLoading: false, posts: []}, action) => {
    switch (action.type) {
        case START_LOADING: 
            return {...state, isLoading: true}
        case END_LOADING: 
            return {...state, isLoading: false}
        case NEW_POST: 
            return {...state, newPost: action.payload}
        case FETCH_ALL:
            return {...state, posts: action.payload};
        case CREATE:
            state.posts.unshift(action.payload) 
            return {...state};
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