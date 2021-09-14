import React, { useState, useEffect } from 'react'
import { Typography, CircularProgress } from '@material-ui/core'
import useStyles from './styles'
import ReactEmoji from 'react-emoji'
//comment: data, prevId, _id, totalSub

const OneRootComment = ({ post, indexPost, c, setNewSubCmtToSocket, setSubCommentToSocket, subCommentToSocket, i, socket, idPost, email, isShowSubComments, setTotalSubcomments, totalSubcomments, setIsShowSubComments }) => {
    const [isIsSendSub, setIsSendSub] = useState(false)
    const [subComment, setSubComment] = useState('')
    const [subComments, setSubComments] = useState(post?.subComments)
    const classes = useStyles()

    useEffect(() => {
        if (subCommentToSocket && isShowSubComments[i] && socket) {
            if (String(subCommentToSocket.idPost) === String(post?._id)
                && String(subCommentToSocket.prevCommentId) === String(c._id) && String(subCommentToSocket.index) === String(i)) {
                const { data, prevCommentId, totalSubcomment, _id, ...info } = subCommentToSocket;
                console.log(info)
                if (subComments || subComments === []) {
                    let haveComment = false;
                    for (let i = 0; i < subComments.length; i++) {
                        if (String(subComments[i]._id) === String(_id)) {
                            haveComment = true;
                            break;
                        }
                    }
                    if (!haveComment) {
                        setSubComments([...subComments, { data, prevCommentId, totalSubcomment, _id }])
                        if (totalSubcomments.length > i) {

                            if (post.subComments) {
                                post.subComments.push({ data, prevCommentId, totalSubcomment, _id })
                                // let tmp2 = []
                                // post?.comments.forEach(el => tmp2.push(el.totalSubcomment))
                                // totalSubcomments.push(...tmp2)

                                // if (totalSubcomments || totalSubcomments === []) {
                                //     let count = post?.comments[Number(i)].totalSubcomment + 1;
                                //     let tmp = totalSubcomments.splice(Number(i), 1, count);
                                //     post.comments[Number(i)].totalSubcomment = totalSubcomments[Number(i)];
                                //     totalSubcomments.splice(tmp2.length)
                                //     setTotalSubcomments(totalSubcomments.slice(0))
                                // }
                                socket.emit('increSubCmt', ({ idPost, i, idComment: c._id, idSubCmt: subCommentToSocket._id }), () => { })
                            }
                        }
                    }

                }
                // setSubCommentToSocket({...subCommentToSocket,data: '',prevCommentId: '',totalSubcomment: '',_id: '', index: -1,idPost: ''})
            }
        } else return;
    }, [subCommentToSocket])

   
    const handleReply = (e) => {
        e.preventDefault()
        setIsSendSub(true);

        if (subComment) {
            const prevId = c._id;
            console.log(subComment);
            socket.emit('send subComment', ({ email, idPost, data: subComment, prevId, i }), (error) => {
                if (error) {
                    alert(error)
                }
                setSubComment('')
                setIsSendSub(false);

                socket.emit('send interaction', ({ email, idPost, data: subComment, prevId, indexPost, dataCmtPrev: c?.data?.split('::: ')[1], idCmtPrev: c._id, type: "SUB_COMMENT", indexOfSubCmt: i }), (error) => {
                    if (error) {
                        alert(error)
                    }

                })
            })
        }
    }
    return (

        isShowSubComments[i] &&
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px 0' }}>
            {subComments?.map(sC => (
                <Typography className={classes.list__comment} key={sC._id} variant="subtitle2" style={{ margin: '0 50px' }}>
                    <strong>{sC?.data?.split('::: ')[0]}</strong>
                    <div className={classes.emojiSub}>{ReactEmoji.emojify(sC?.data?.split('::: ')[1])}</div>
                </Typography>
            ))}

            < form className={classes.form___comment} style={{ margin: '0 50px' }} onSubmit={handleReply}>
                <input
                    disabled={isIsSendSub}
                    className={classes.input__comment}
                    value={subComment}
                    autoFocus
                    onChange={(e) => setSubComment(e.target.value)}
                    name="subComment"
                    type="text" placeholder="Viết bình luận"
                />
                <button type="submit" hidden>Send</button>
                {isIsSendSub && <CircularProgress />}
            </form>
        </div >
    )
}

export default OneRootComment
