import React, { useState, useEffect } from 'react';
import { Typography, CircularProgress } from '@material-ui/core/';
import { fetchSubComments } from '../../../../api'
import useStyles from './styles';
import OneRootComment from '../OneRootComment/OneRootComment';
import ReactEmoji from 'react-emoji'

//comments: data, prevId, _id, totalSubComment

const Comment = ({ post, subCommentToSocket, setSubCommentToSocket, setLengCmt, showSubCmt, setNewSubCmtToSocket, handleShowComment, indexPost, socket, handleDelete, comments, setComments, totalSubcomments, setTotalSubcomments, opened, isLoadingComment, setIsLoadingComment }) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const [comment, setComment] = useState('');
    let [openedSubCmt, setOpenedSubCmt] = useState(false)

    const [isUpdate, setIsUpdate] = useState(false)
    const [isShowSubComments, setIsShowSubComments] = useState([])
    // const { showComment, isComments } = useSelector((state) => state.posts)


    // const [postSubComments, setPostSubComments] = useState([])
    const classes = useStyles();
    const email = user?.result?.email
    const idPost = post._id



    useEffect(() => {

        let tmp = []
        setIsShowSubComments([])

        tmp = Array(post?.comments.length).fill(false)
        isShowSubComments.push(...tmp)
        tmp = []
        post?.comments.forEach(el => tmp.push(el.totalSubcomment))
        setTotalSubcomments([...tmp])


    }, [])

    useEffect(() => {
        if(!isShowSubComments[showSubCmt?.indexOfSubCmt])
            showSubComment(showSubCmt?.indexOfSubCmt, showSubCmt?.idCmtPrev)
        

    }, [showSubCmt])

   

    const getSubComments = async (index, idComment) => {
        const { data } = await fetchSubComments(idPost, idComment);
        // console.log(data);
        return data;
    }

    const totalSubCmt = () => {
        let rs = 0;
        if (totalSubcomments?.length) totalSubcomments.forEach(el => rs += el)
        else 
        {
            setLengCmt(comments.length)
            return 0;
        }
        setLengCmt(comments.length + rs);

        return rs;
    }


    // use socket
    const handleComment = async (e) => {
        e.preventDefault()
        setIsUpdate(true);

        if (comment) {
            const prevId = ''
            socket.emit('send comment', ({ email, idPost, data: comment, prevId, indexPost }), (error) => {
                if (error) {
                    alert(error)
                    handleDelete()
                }
                setComment('')
                setIsUpdate(false);

                //send interactions
                socket.emit('send interaction', ({ email, idPost, data: comment, prevId, indexPost, type: "COMMENT" }), (error) => {
                    if (error) {
                        alert(error)
                    }
                })
            })
        }
    };



    const showSubComment = async (index, idComment) => {
        if (index >= isShowSubComments.length) {
            let tmp = Array(index - isShowSubComments.length + 1).fill(false)
            // console.log(tmp)
            setIsShowSubComments(isShowSubComments.push(...tmp))
            // console.log('ra')
        }
        try {
            await setIsShowSubComments(isShowSubComments?.map((iSSC, i) => i === index ? !iSSC : false));
            setOpenedSubCmt(true)
            openedSubCmt = true
            console.log('openedSubCmt', openedSubCmt)
            const data = await getSubComments(index, idComment)
            post.subComments = data;
        } catch (error) {

        } finally {
            setOpenedSubCmt(false)
            openedSubCmt = false

            console.log('openedSubCmt', openedSubCmt)
        }
        // console.log(isShowSubComments)
    }
    
    const handleValue = () => {
        console.log(comment)
        return ReactEmoji.emojify(comment);
    }

    return (
        <div >
            <div className={classes.commentsOuterContainer} >

                {!isLoadingComment ?
                    <>
                        <Typography variant="subtitle2">{comments.length + totalSubCmt()} lượt bình luận</Typography>
                        <div className={classes.commentsInnerContainer} >
                            {
                                comments?.map((c, i) => (
                                    <div key={i} style={{ padding: '5px 10px', display: 'flex', flexDirection: 'column', width: '95%' }}>
                                        <div style={{ display: 'flex', alignItems: "center", gap: '0 10px' }}>
                                            <Typography gutterBottom variant="subtitle2" className={classes.list__comment}>
                                                <strong>{c?.data?.split('::: ')[0]}</strong>
                                                <div className={classes.emoji}>
                                                    {ReactEmoji.emojify(c?.data?.split('::: ')[1])}
                                                </div>

                                            </Typography>
                                            {
                                                totalSubcomments[i] <= 0 &&
                                                <Typography
                                                    variant='body2'
                                                    onClick={() => {
                                                        const idComment = c._id;
                                                        showSubComment(i, idComment)
                                                    }}
                                                    style={{ width: '130px', cursor: 'pointer', display: 'flex', justifyContent: 'start', fontSize: '0.8rem' }} >
                                                    Trả lời
                                                </Typography>
                                            }
                                        </div>
                                        {
                                            totalSubcomments[i] > 0 &&
                                            <Typography
                                                variant='body2'
                                                onClick={() => {
                                                    const idComment = c._id;
                                                    showSubComment(i, idComment)
                                                }}
                                                style={{ cursor: 'pointer', display: 'flex', padding: '0px 5px', fontSize: '0.8rem' }}

                                                color="primary">
                                                {!isShowSubComments[i] ? `${totalSubcomments[i]} lượt phản hồi` : "Thu gọn"}
                                            </Typography>
                                        }
                                        {

                                            (isShowSubComments[i]) ?
                                                openedSubCmt ? <CircularProgress fontSize="small" /> :
                                                    <OneRootComment
                                                        post={post}
                                                        c={c}
                                                        key={i}
                                                        i={i}
                                                        indexPost={indexPost}
                                                        email={email}
                                                        idPost={idPost}
                                                        setNewSubCmtToSocket={setNewSubCmtToSocket}
                                                        socket={socket}
                                                        subCommentToSocket={subCommentToSocket}
                                                        isShowSubComments={isShowSubComments}
                                                        openedSubCmt={openedSubCmt}
                                                        setIsShowSubComments={setIsShowSubComments}
                                                        setTotalSubcomments={setTotalSubcomments}
                                                        totalSubcomments={totalSubcomments}
                                                        setSubCommentToSocket={setSubCommentToSocket}
                                                    /> : null
                                        }
                                    </div>
                                ))
                            }

                        </div>
                    </>
                    :
                    <div style={{ display: 'flex', padding: '5px', flexDirection: 'column', width: '100%', placeItems: 'center' }}><CircularProgress /></div>
                }
                <form className={classes.form___comment} onSubmit={handleComment}>
                    <input
                        disabled={isUpdate || isLoadingComment}
                        className={classes.input__comment}
                        value={handleValue()}
                        onChange={(e) => setComment(e.target.value)}
                        name="comment"
                        type="text" placeholder="Viết bình luận"
                    />
                    <button type="submit" hidden>Send</button>
                    {isUpdate && <CircularProgress />}
                </form>
            </div>
        </div>
    );

}

export default Comment
