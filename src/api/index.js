import axios from 'axios'

const API = axios.create({baseURL:'https://thuc-tap-20203-1.herokuapp.com/' })
// const API = axios.create({baseURL:'http://localhost:5000/' })

API.interceptors.request.use(req => {
    if(localStorage.getItem('profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
})


export const signin = (formData, history) => API.post('/signin', formData).catch((error)=> alert(error.response.data.message))
export const signup = (formData, history) => API.post('/signup', formData).catch((error)=> alert(error.response.data.message))
export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });