import React, { useState, useEffect, createRef } from 'react'
import { Container, Grow, Grid, CircularProgress } from '@material-ui/core'
import useStyles from './styles'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LOGOUT,DELETE, DELETE_NOTIFICATION } from '../../constants/actionTypes'
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router'
import { getPosts } from '../../actions/posts'
import Profile from '../Profile/Profile'
import Post from './Post/Post'
import CreatePost from './CreatePost/CreatePost'
import decode from 'jwt-decode'
import io from 'socket.io-client'
import CustomizedSnackbar from '../CustomizedSnackbar/CustomizedSnackbar'
import CustomizedNotification from '../CustomizedNotification/CustomizedNotification'
import CustomizedDeletedPost from '../CustomizedDeletedPost/CustomizedDeletedPost'



let socket;

const Posts = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')) ? JSON.parse(localStorage.getItem('profile')) : null)
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const { posts, childClicked, isLoading, deletedPost, notifications } = useSelector((state) => state.posts)
    const [elRefs, setElRefs] = useState([]);
    const [changeRefs, setChangeRefs] = useState(-2);
    const [commentToSocket, setCommentToSocket] = useState({
        data: '',
        prevCommentId: '',
        totalSubcomment: 0,
        _id: '',
        idPost: '',
        indexPost: -1
    });

    const [subCommentToSocket, setSubCommentToSocket] = useState({
        data: '',
        prevCommentId: '',
        totalSubcomment: '',
        _id: '',
        index: -1,
        idPost: ''
    })

    const [newSubCmtToSocket, setNewSubCmtToSocket] = useState({
        idPost: '', i: -1, idComment: '', idSubCmt: ''
    })

    const [postDeleted, setPostDeleted] = useState({})

    const ENDPOINT = 'https://thuc-tap-20203-1.herokuapp.com/'
    // const ENDPOINT = 'http://localhost:5000/'


    const handleLogout = () => {
        dispatch({ type: LOGOUT })
        history.push('/auth')
    }
    useEffect(() => {
        // console.log('useEffect posts')

        
            dispatch(getPosts(history))
        
    }, [dispatch])

    const getRefs = async () => {
        if (changeRefs + 1 === posts.length) {
            // console.log("add ref")
            await setElRefs((refs) => Array(posts.length).fill().map((_, i) => i === 0 ? createRef() : refs[i - 1]));
        }
        else if(changeRefs - 1 === posts.length && deletedPost !== -1) {
            console.log("delete ref")
            await setElRefs((refs) => Array(posts.length + 1).fill().map((_, i) => i === deletedPost ? null : refs[i])
                                        .filter((_, i) => i !== deletedPost));
            
        }
        else if(changeRefs !== posts.length ) 
        {
            // console.log('refs all')
            await setElRefs((refs) => Array(posts.length).fill().map((_, i) => createRef()));
        }
        await setChangeRefs(posts.length)
    }
    useEffect(() => {
        // console.log(posts)
        getRefs()

    }, [posts]);


    useEffect(() => {
        // console.log('useEffect posts')

        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) return handleLogout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
        socket = io(ENDPOINT, {
            auth: {
                token: user?.token,
                userID: user?.result?._id
            },
        })
        // console.log(socket)
        if (user) {
            socket.emit('home', {}, ({ error, home }) => {
                if (error) {
                    alert(error)
                }
                socket.emit("set username", {
                    username: user?.result?.email
                });
            })
        }else{
            history.push('/auth')
        }
        return () => {
            // dispatch({type: CLEAN_NOTIFICATION})
            // dispatch({type: CHILD_CLICKED, payload: null})    
            history.push('/auth')
            socket.disconnect()
            socket.off()
        }
    }, [location])
    useEffect(() => {
        if (socket) {
            socket.on('comment', async ({ result: { data, prevCommentId, totalSubcomment, _id }, idPost, indexPost }) => {
                setCommentToSocket({ data, prevCommentId, totalSubcomment, _id, idPost, indexPost })
            })
            return () => {
                socket.off('comment')
            }
        }
    }, [commentToSocket])

    useEffect(() => {
        if (socket) {
            socket.on("connect_error", (err) => {
                console.log(err instanceof Error); // true
                alert(err.message); // not authorized
                localStorage.clear()
                history.push('/auth')
            });
        }
    }, [history])

    useEffect(() => {
        if (socket) {
            socket.on('newSubCmt', async ({ idPost, i, idComment, idSubCmt }) => {

                if (String(newSubCmtToSocket.idSubCmt) !== String(idSubCmt)) {

                    // console.log('nhan', newSubCmtToSocket.idSubCmt)
                    // console.log('socket ', idSubCmt)
                    await setNewSubCmtToSocket({ ...newSubCmtToSocket, idPost, i, idComment, idSubCmt })
                    // console.log(newSubCmtToSocket)
                }
            })
            return () => {
                socket.off('newSubCmt')
            }
        }
    }, [newSubCmtToSocket])

    useEffect(() => {
        if (socket) {
            socket.on('subComment', async ({ result: { data, prevCommentId, totalSubcomment, _id }, index, idPost }) => {
                setSubCommentToSocket({ data, prevCommentId, totalSubcomment, _id, index, idPost })
            })
            return () => {
                socket.off('subComment')
            }
        }
    }, [subCommentToSocket])

    
    useEffect(() => {
        if (socket) {
            socket.on('received postDeleted', async ({ creatorPostDeleted ,indexPostDeleted ,idPostDeleted ,dataDeleted }) => {
                if(posts && posts[indexPostDeleted]._id === idPostDeleted) {
                    // console.log('nhan deleted')
                    // await dispatch({type: DELETE, payload: idPostDeleted})
                    // await dispatch({type: DELETED_POST, payload: Number(indexPostDeleted)})
                    notifications.forEach((noti, i) => {
                        if(noti.idPost === idPostDeleted) {
                            dispatch({ type: DELETE_NOTIFICATION, payload: i })
                        }else {
                            if(indexPostDeleted < noti.indexPost){
                                noti.indexPost -= 1;
                            }
                        }
                    })
                    await dispatch({ type: DELETE, payload: {id: idPostDeleted, indexPost: indexPostDeleted }})
                    await setPostDeleted({creatorPostDeleted, dataDeleted})
                }
            })
            return () => {
                socket.off('received postDeleted')
            }
        }
    }, [dispatch, posts, notifications ])

    return (
        isLoading ? <div style={{ display: 'flex', padding: '5px', flexDirection: 'column', width: '100%', placeItems: 'center' }}><CircularProgress style={{ color: 'white' }} /></div>
            :
            <Grow in>
                <Container component="main" maxWidth="lg" className={classes.posts}>
                    {user ?
                        <>
                            <CustomizedSnackbar getRefs={getRefs} socket={socket} />
                            <CustomizedNotification socket={socket} />
                            {postDeleted && <CustomizedDeletedPost postDeleted={postDeleted} setPostDeleted={setPostDeleted} />}
                            <Grid container justifyContent="center" alignItems="stretch" spacing={3}>
                                <Grid item sm={12} md={3}>
                                    <Profile user={user} socket={socket} handleLogout={handleLogout} />
                                </Grid>
                                <Grid item sm={12} md={8}>
                                    <CreatePost
                                        user={user}

                                        socket={socket}
                                    />
                                    {posts.map((post, i) => (
                                        <div ref={elRefs[i]} key={i} >
                                            <Post
                                                newSubCmtToSocket={newSubCmtToSocket}
                                                setNewSubCmtToSocket={setNewSubCmtToSocket}
                                                commentToSocket={commentToSocket}
                                                setCommentToSocket={setCommentToSocket}
                                                selected={Number(childClicked) === i}
                                                refProp={elRefs[i]} key={post._id}
                                                post={post}
                                                socket={socket}
                                                indexPost={i}
                                                subCommentToSocket={subCommentToSocket}
                                                setSubCommentToSocket={setSubCommentToSocket}
                                            />
                                        </div>
                                    ))}
                                </Grid>
                            </Grid>
                        </>
                        :
                        <Redirect to="/auth" />
                    }
                </Container>

            </Grow>
    )
}

export default Posts