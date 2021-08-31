import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'
import { CHILD_CLICKED, DELETE_NOTIFICATION, SHOW_COMMENT, UPDATE } from '../../../constants/actionTypes'
import useStyles from './styles';




const Notificaion = ({ open, notifications }) => {
    const classes = useStyles();
    // const [isFake, setIsFake] = useState(false)

    const dispatch = useDispatch();
    const { isComments, showComment, childClicked } = useSelector(state => state.posts)

    return (
        open ?
            <div className={classes.root}>
                {
                    notifications.map((noti, i) => (
                        <div key={i}
                            onClick={() => {
                                // alert('vao childclick')
                                
                                    dispatch({ type: CHILD_CLICKED, payload: noti?.indexPost })

                                
                                dispatch({ type: DELETE_NOTIFICATION, payload: i })
                                if (noti.type === "COMMENT") {
                                    if (!isComments[i]) {
                                        dispatch({ type: SHOW_COMMENT, payload: { indexPost: Number(noti?.indexPost), indexOfSubCmt: Number(noti.indexOfSubCmt), idCmtPrev: noti.idCmtPrev } })
                                        // console.log('showComment ', showComment)

                                    }
                                } else if (noti.type === "SUB_COMMENT") {

                                    dispatch({ type: SHOW_COMMENT, payload: { indexPost: Number(noti?.indexPost), indexOfSubCmt: Number(noti.indexOfSubCmt), idCmtPrev: noti.idCmtPrev } })
                                    // console.log('showSubComment ', showComment)
                                } else if (noti.type === "LIKE") {
                                    // dispatch({ type: SHOW_COMMENT, payload: { indexPost: '', indexOfSubCmt: -1, idCmtPrev: '' } })
                                    dispatch({ type: UPDATE, payload: noti.data })

                                }
                                
                            }}
                            className={classes.notification}
                        >
                            <Typography gutterBottom variant="subtitle2" >
                                {
                                    noti.type === "COMMENT"
                                        ?
                                        <span>{noti.email} đã bình luận bài viết <strong >{noti.title.trim().length >= 10 ? `${noti.title.substring(0, 10)} ...`: noti.title}</strong> mà bạn đã tương tác</span>
                                        :
                                        noti.type === "SUB_COMMENT"
                                            ?
                                            <span>{noti.email} đã phản hồi bình luận <strong >{noti.dataCmtPrev.trim().length >= 10 ? `${noti.dataCmtPrev.substring(0, 10)}  ...`: noti.dataCmtPrev}</strong> trong bài viết <strong>{noti.title.length >= 10 ? `${noti.title.substring(0, 10)} ...`: noti.title}</strong> mà bạn đã tương tác</span>
                                            : noti.type === "LIKE"
                                            ?
                                            <span>{noti.email} đã thích trong bài viết <strong >{noti.title.trim().length >= 10 ? `${noti.title.substring(0, 10)} ...`: noti.title}</strong> mà bạn đã tương tác</span>
                                            : null

                                }
                            </Typography>
                            {
                                (noti.type === "COMMENT" || noti.type === "SUB_COMMENT") &&
                                < Typography gutterBottom
                                    variant='body2'
                                    color="primary"
                                    style={{ fontSize: '0.8rem',
                                        maxWidth: '350px',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                      }}
                                >
                                    {noti.data}
                                </Typography>
                            }
                        </div>
                    ))
                }
            </div > : null
    );
};

export default Notificaion;