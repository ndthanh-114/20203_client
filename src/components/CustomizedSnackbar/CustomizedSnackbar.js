import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux'

import useStyles from './styles';
import { NEW_POST, CREATE } from '../../constants/actionTypes';

const CustomizedSnackbar = ({ socket }) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const { newPost } = useSelector(state => state.posts)

    useEffect(() => {
        if (socket) {
            socket.on('notification', ({ error, post }) => {
                if (error) {
                    alert(error)
                }
                if (post) {
                    console.log(post);
                    dispatch({ type: NEW_POST, payload: { is: true, postId: post?._id, postEmail: post?.creator } })
                    dispatch({ type: CREATE, payload: post })
                }
            })
        }
        return () => {
            if(socket) socket.off('notification')
        }
    }, [dispatch, socket])


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch({ type: NEW_POST, payload: { is: false, postId: null } })

    };

    return (
        <div className={classes.root}>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={newPost.is} autoHideDuration={6000} onClose={handleClose}>
                <MuiAlert onClose={handleClose} severity="success" elevation={6} variant="filled">{newPost.postEmail && `${newPost?.postEmail} có bài đăng mới`}</MuiAlert>
            </Snackbar>
        </div>
    );
};

export default CustomizedSnackbar;