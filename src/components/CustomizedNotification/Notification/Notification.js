import React from 'react';
import { useDispatch } from 'react-redux'
import { Typography } from '@material-ui/core'
import { CHILD_CLICKED, DELETE_NOTIFICATION } from '../../../constants/actionTypes'
import useStyles from './styles';




const Notificaion = ({ open, onClose, notifications }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        open ?
            <div className={classes.root}>
                {
                    notifications.map((noti, i) => (
                        <div key={i}
                            onClick={() => {
                                dispatch({ type: CHILD_CLICKED, payload: noti?.indexPost })
                                dispatch({type: DELETE_NOTIFICATION, payload: i})
                            }}
                            className={classes.notification}
                        >
                            <Typography gutterBottom variant="subtitle2" >
                                {noti.email} đã bình luận bài viết <strong>{noti.title}</strong> mà bạn đã tương tác
                            </Typography>
                            <Typography gutterBottom
                                variant='body2'
                                color="primary"
                                style={{ fontSize: '0.8rem' }}
                            >
                                {noti.data}
                            </Typography>
                        </div>
                    ))
                }
            </div> : null
    );
};

export default Notificaion;