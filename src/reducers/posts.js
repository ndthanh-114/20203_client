import { NEW_POST, DELETE_NOTIFICATION, NOTIFICATION, CLEAN_NOTIFICATION, CHILD_CLICKED, START_LOADING, END_LOADING, COMMENT, FETCH_ALL, CREATE, DELETE, UPDATE } from '../constants/actionTypes'

const posts = (state = { childClicked: null, notifications: [], newPost: {}, isLoading: false, posts: [] }, action) => {
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
        case NEW_POST:
            return { ...state, newPost: action.payload }
        case FETCH_ALL:
            return { ...state, posts: action.payload };
        case CREATE:
            state.posts.unshift(action.payload)
            return { ...state };
        case COMMENT:
            return { ...state, posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post) };
        case UPDATE:
            return { ...state, posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post) };
        case DELETE:
            return { ...state, posts: state.posts.filter(post => post._id !== action.payload) };
        default:
            return state;
    }
}

export default posts