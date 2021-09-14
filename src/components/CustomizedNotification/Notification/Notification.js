import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'
import { CHILD_CLICKED, DELETE_NOTIFICATION, SHOW_COMMENT } from '../../../constants/actionTypes'
import useStyles from './styles';
import ReactEmoji from 'react-emoji'



const Notificaion = ({ open, notifications }) => {
    const classes = useStyles();
    // const [isFake, setIsFake] = useState(false)

    const dispatch = useDispatch();
    const { isComments } = useSelector(state => state.posts)

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


                                }

                            }}
                            className={classes.notification}
                        >

                            {
                                noti.type === "COMMENT"
                                    ?
                                    <div className={classes.customSpan}>
                                        <strong>{noti.email}</strong> đã bình luận bài viết &nbsp;
                                        <span>
                                            {noti.title.length >= 10
                                                ?
                                                noti.title[9] !== ':'
                                                    ?
                                                    ReactEmoji.emojify(noti.title.substring(0, 10) + '...', { attributes: { width: '18px', height: '18px' } })
                                                    :
                                                    ReactEmoji.emojify(noti.title.substring(0, 9) + '...', { attributes: { width: '18px', height: '18px' } })
                                                :
                                                ReactEmoji.emojify(noti.title, { attributes: { width: '18px', height: '18px' } })}
                                        </span>
                                        &nbsp; mà bạn đã tương tác
                                    </div>
                                    :
                                    noti.type === "SUB_COMMENT"
                                        ?
                                        <div className={classes.customSpan}>
                                            <strong>{noti.email}</strong> đã phản hồi bình luận &nbsp;
                                            <span >
                                                {noti.dataCmtPrev.trim().length >= 10
                                                    ?
                                                    noti.dataCmtPrev[9] !== ':'
                                                        ?
                                                            ReactEmoji.emojify(noti.dataCmtPrev.substring(0, 10)+ '...', { attributes: { width: '18px', height: '18px' } })
                                                        :
                                                        ReactEmoji.emojify(noti.dataCmtPrev.substring(0, 9) + '...', { attributes: { width: '18px', height: '18px' } }) 
                                                    :
                                                    ReactEmoji.emojify(noti.dataCmtPrev, { attributes: { width: '18px', height: '18px' } })}
                                            </span>
                                            &nbsp; trong bài viết &nbsp;
                                            <span>
                                                {noti.title.length >= 10
                                                    ?
                                                    noti.title[9] !== ':'
                                                        ?
                                                        ReactEmoji.emojify(noti.title.substring(0, 10) + '...', { attributes: { width: '18px', height: '18px' } })
                                                        :
                                                        ReactEmoji.emojify(noti.title.substring(0, 9) + '...', { attributes: { width: '18px', height: '18px' } })
                                                    :
                                                    ReactEmoji.emojify(noti.title, { attributes: { width: '18px', height: '18px' } })}
                                            </span>
                                            &nbsp; mà bạn đã tương tác
                                        </div>
                                        : noti.type === "LIKE"
                                            ?
                                            <div className={classes.customSpan}>
                                                <strong>{noti.email}</strong> đã thích trong bài viết &nbsp;
                                                <span>
                                                    {noti.title.length >= 10
                                                        ?
                                                        noti.title[9] !== ':'
                                                            ?
                                                            ReactEmoji.emojify(noti.title.substring(0, 10) +'...', { attributes: { width: '18px', height: '18px' } })
                                                            :
                                                            ReactEmoji.emojify(noti.title.substring(0, 9) + '...', { attributes: { width: '18px', height: '18px' } })
                                                        :
                                                        ReactEmoji.emojify(noti.title, { attributes: { width: '18px', height: '18px' } })}
                                                </span>
                                                &nbsp; mà bạn đã tương tác
                                            </div>
                                            : null

                            }

                            {
                                (noti.type === "COMMENT" || noti.type === "SUB_COMMENT") &&
                                < Typography gutterBottom
                                    variant='body2'
                                    color="primary"
                                    style={{
                                        marginTop: '5px',
                                        fontSize: '0.8rem',
                                        maxWidth: '350px',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: 'flex',
                                        alignSelf: 'center',
                                    }}
                                >
                                    {ReactEmoji.emojify(noti.data, { attributes: { width: '18px', height: '18px' } })}
                                </Typography>
                            }
                        </div>
                    ))
                }
            </div > : null
    );
};

export default Notificaion;