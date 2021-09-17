import { NEW_POST, IS_COMMENT, UPDATE_CMT, DELETED_POST, DELETE_NOTIFICATION, SHOW_COMMENT, NOTIFICATION, CLEAN_NOTIFICATION, CHILD_CLICKED, START_LOADING, END_LOADING, COMMENT, FETCH_ALL, CREATE, DELETE, UPDATE } from '../constants/actionTypes'

const posts = (state = { childClicked: -1, updateNumberCmt: '', deletedPost: -1, isComments: [], notifications: [], newPost: {}, isLoading: false, posts: [], showComment: null }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true }
        case END_LOADING:
            return { ...state, isLoading: false }
        case CHILD_CLICKED:
            return { ...state, childClicked: action.payload }
        case NOTIFICATION:
            state.notifications.unshift(action.payload)
            return { ...state }
        case CLEAN_NOTIFICATION:
            return { ...state, notifications: [] }
        case DELETE_NOTIFICATION:
            return { ...state, notifications: state.notifications.filter((noti, i) => i !== action.payload)}
        case DELETED_POST: 
            return {...state, deletedPost: action.payload, posts: state.posts.filter((post, i) => i !== action.payload), isComments: state.isComments.filter((iC, i) => i !== Number(action.payload))}
        case UPDATE_CMT: 
            return { ...state, updateNumberCmt: action.payload}
        case NEW_POST:
            return { ...state, newPost: action.payload }
        case FETCH_ALL:
            return { ...state, posts: action.payload, isComments: Array(action.payload.length).fill(false) };
        case CREATE:
            state.posts.unshift(action.payload)
            state.isComments.unshift(false)
            return { ...state };
        case IS_COMMENT:
            return { ...state, isComments: state.isComments.map((isCmt, i) => Number(i) === Number(action.payload) ? !isCmt : isCmt) };
        case SHOW_COMMENT:
            return { ...state, showComment: action.payload };
        case COMMENT:
            return { ...state, posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post) };
        case UPDATE:
            return { ...state, posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post) };
        case DELETE:
            return { ...state, posts: state.posts.filter(post => post._id !== action.payload.id), deletedPost: action.payload.indexPost, isComments: state.isComments.filter((iC, i) => i !== Number(action.payload.indexPost)) };
        default:
            return state;
    }
}

export default posts