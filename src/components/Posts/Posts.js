import React, { useState, useEffect } from 'react'
import { Container, Grow, Grid, CircularProgress } from '@material-ui/core'
import useStyles from './styles'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LOGOUT } from '../../constants/actionTypes'
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router'
import { getPosts } from '../../actions/posts'
import Profile from '../Profile/Profile'
import Post from './Post/Post'
import CreatePost from './CreatePost/CreatePost'
import decode from 'jwt-decode'
import io from 'socket.io-client'
let socket;

const Posts = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')) ? JSON.parse(localStorage.getItem('profile')) : null)
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const { posts, isLoading } = useSelector((state) => state.posts)

    const ENDPOINT = 'https://thuc-tap-20203-1.herokuapp.com/'
  

    const handleLogout = () => {
        dispatch({ type: LOGOUT })
        history.push('/auth')
    }
    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) return handleLogout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
        socket = io(ENDPOINT)

        if (user) {
            socket.emit('home', {}, ({ error, home }) => {
                if (error) {
                    alert(error)
                }

            })
            socket.on('notification', ({ text }) => {
                if (text) {
                    console.log(text)
                    
                    let retVal = window.confirm(`${text}`);
                    if( retVal === true ) {
                        dispatch(getPosts())
                     }
    
                }
            })
        }
    }, [location])

    return (
        isLoading ? <div style={{ display: 'flex', padding: '5px', flexDirection: 'column', width: '100%', placeItems: 'center' }}><CircularProgress style={{ color: 'white' }} /></div>
            :
            <Grow in>
                <Container component="main" maxWidth="lg" className={classes.posts}>
                    {user ?
                        <Grid container justifyContent="center" alignItems="stretch" spacing={3}>
                            <Grid item sm={12} md={3}>
                                <Profile user={user} handleLogout={handleLogout} />
                            </Grid>
                            <Grid item sm={12} md={8}>
                                <CreatePost
                                    user={user}
                                   
                                    socket={socket}
                                />
                                {posts.map((post) => (
                                    <Post key={post._id} post={post} socket={socket} />
                                ))}
                            </Grid>
                        </Grid>
                        :
                        <Redirect to="/auth" />
                    } 
                </Container>

            </Grow>
    )
}

export default Posts