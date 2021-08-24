import React, { useState, useEffect } from 'react';
import { Typography, CircularProgress } from '@material-ui/core/';
import { fetchSubComments } from '../../../../api'
import useStyles from './styles';
import OneRootComment from '../OneRootComment/OneRootComment';
//comments: data, prevId, _id, totalSubComment

const Comment = ({ post, isComment, socket, handleDelete, opened, isLoadingComment, setIsLoadingComment }) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const [comment, setComment] = useState('');
    let [openedSubCmt, setOpenedSubCmt] = useState(false)
    const [comments, setComments] = useState(post?.comments);
    const [isUpdate, setIsUpdate] = useState(false)
    const [isShowSubComments, setIsShowSubComments] = useState([])
    const [totalSubcomments, setTotalSubcomments] = useState([])
    
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
        console.log(
            'start comment', isShowSubComments, totalSubcomments
        )

    }, [])

    useEffect(() => {
        console.log('useEffect comment')

        socket.on('comment', async ({ result: { data, prevCommentId, totalSubcomment, _id } }) => {
            const tmp = [...comments, { data, prevCommentId, totalSubcomment, _id }]

            await setComments(tmp)
            // console.log(totalSubcomments)
            // totalSubcomments.push(totalSubcomment)

            console.log(comments)
            // post.comments = comments
            post.comments.push({ data, prevCommentId, totalSubcomment, _id })
            let tmp2 = []
            post?.comments.forEach(el => tmp2.push(el.totalSubcomment))
            await setTotalSubcomments([...tmp2])
            console.log(totalSubcomments)
        })
        return () => {
            socket.off('comment')
        }
    }, [])

    useEffect(() => {
        socket.on('newSubCmt', async ({ i }) => {
            let tmp2 = []
            post?.comments.forEach(el => tmp2.push(el.totalSubcomment))
            // console.log(tmp2) //[1,2,3]
            
            // console.log(tmp2);
            totalSubcomments.push(...tmp2) //no ra [] ??
            // console.log(totalSubcomments)
            // console.log(i);
            if (totalSubcomments || totalSubcomments === []) {
                let count = totalSubcomments[Number(i)] + 1;
                let tmp = totalSubcomments.splice(Number(i), 1, count);
                post.comments[Number(i)].totalSubcomment = totalSubcomments[Number(i)];
                totalSubcomments.splice(tmp2.length)
                await setTotalSubcomments(totalSubcomments.slice(0))
                // alert(totalSubcomments)
            }
        })
        return () => {
            socket.off('newSubCmt')
        }
    }, [])


    const getSubComments = async (index, idComment) => {
        const { data } = await fetchSubComments(idPost, idComment);
        console.log(data);
        return data;
    }

    const totalSubCmt = () => {
        let rs = 0;
        if (totalSubcomments?.length) totalSubcomments.forEach(el => rs += el)
        else return 0;
        return rs;
    }


    // use socket
    const handleComment = async (e) => {
        e.preventDefault()
        setIsUpdate(true);

        if (comment) {
            const prevId = ''
            socket.emit('send comment', ({ email, idPost, data: comment, prevId }), (error) => {
                if (error) {
                    alert(error)
                    handleDelete()
                }
                setComment('')
                setIsUpdate(false);
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
        try{
            await setIsShowSubComments(isShowSubComments?.map((iSSC, i) => i === index ? !iSSC : false));
            setOpenedSubCmt(true)
            openedSubCmt = true
            console.log('openedSubCmt', openedSubCmt)
            const data = await getSubComments(index, idComment)
            post.subComments = data;
        }catch(error){

        }finally{
            setOpenedSubCmt(false)
            openedSubCmt = false

            console.log('openedSubCmt', openedSubCmt)
        }
        console.log(isShowSubComments)
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
                                                <strong>{c?.data?.split('::: ')[0]}</strong><br />
                                                {c?.data?.split('::: ')[1]}
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
                                                    email={email}
                                                    idPost={idPost}
                                                    socket={socket}

                                                    isShowSubComments={isShowSubComments}
                                                    openedSubCmt={openedSubCmt}
                                                    setIsShowSubComments={setIsShowSubComments}
                                                    setTotalSubcomments={setTotalSubcomments}
                                                    totalSubcomments={totalSubcomments}
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
                        value={comment}
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
