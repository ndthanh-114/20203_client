import * as api from '../api/index'
import {FETCH_ALL, COMMENT, CREATE, DELETE, UPDATE, START_LOADING, END_LOADING} from '../constants/actionTypes'


export const getPosts = () => async (dispatch) => {
    try{
        dispatch({type: START_LOADING})
        const {data} = await api.fetchPosts();
        dispatch({type: FETCH_ALL, payload: data})
        dispatch({type: END_LOADING})
    }catch(error){
        alert(`${error.response.data.message}`);
        dispatch({type: END_LOADING})
        localStorage.clear()
    }
}

export const createPost = (newPost) => async (dispatch) => {
    try{
        const {data} = await api.createPost(newPost);
        dispatch({type: CREATE, payload: data})
    }catch(error){
        alert(`${error.response.data.message}`);
        localStorage.clear()
    }
}

export const deletePost = (id) => async (dispatch) => {
    try{
        await api.deletePost(id);
        dispatch({type: DELETE, payload: id})
    }catch(error){
        alert(`${error.response.data.message}`);
        localStorage.clear()
    }
}

export const likePost = (id) => async (dispatch) => {
    try{
        const {data} = await api.likePost(id);
        dispatch({type: UPDATE, payload: data})
    }catch(error){
        alert(`${error.response.data.message}`);
        localStorage.clear()
    }
}

export const commentPost = (value, id) => async (dispatch) => {
    try {
      const { data } = await api.comment(value, id);
  
      dispatch({ type: COMMENT, payload: data });
  
      return data.comments;
    } catch (error) {
      console.log(error);
    }
  };