import React, { useState, useEffect } from 'react'
import { Avatar, Paper, CircularProgress } from '@material-ui/core'
import useStyles from './styles'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { deletePost, likePost } from '../../../actions/posts';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Comment from './Comment/Comment'
import { fetchPostComment } from '../../../api/index'

import { IS_COMMENT, CHILD_CLICKED } from '../../../constants/actionTypes'
import classNames from 'classnames'


const Post = ({ post, socket, newSubCmtToSocket,setCommentToSocket, setNewSubCmtToSocket, subCommentToSocket, indexPost, selected, refProp, commentToSocket }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [opened, setOpened] = useState(false)
    // const [isComment, setIsComment] = useState(false)
    const [isLoadingComment, setIsLoadingComment] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [isFake, setIsFake] = useState(false)
    const classes = useStyles()
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
    const [lengthImage, setLengthImage] = useState(0)
    const [currentImage, setCurrentImage] = useState(0)
    const { newPost, isComments, showComment,childClicked } = useSelector(state => state.posts)
    const [comments, setComments] = useState(post?.comments || []);
    const [totalSubcomments, setTotalSubcomments] = useState([])
    const [showSubCmt, setShowSubCmt] = useState(null)
    // const { isComments } = useSelector((state) => state.posts)

    useEffect(() => {
        if (selected) {
            // console.log('vao');
            refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            dispatch({type: CHILD_CLICKED, payload: -1})
        }
    }, [childClicked, dispatch, refProp, selected])
    // useEffect(() => {
    //     console.log('useEffect post')

    //         const postId = post._id;
    //         socket.emit('join', { postId, user }, ({ error, post }) => {
    //             if (error) {
    //                 alert(error)
    //             }
    //         })

    // }, [socket, user])

    useEffect(() => {
        
        if (showComment && showComment?.indexPost === indexPost) {
        
            if (!isComments[indexPost]) handleShowComment()
            // dispatch({type: SHOW_COMMENT, payload: -1})
            if (typeof showComment?.indexOfSubCmt == 'number' && showComment?.indexOfSubCmt !== -1){
                const {indexOfSubCmt, idCmtPrev} = showComment;
                setShowSubCmt({indexOfSubCmt, idCmtPrev})
            }
                
        }

    }, [showComment])

    useEffect(() => {
        if (commentToSocket) {
            if (String(commentToSocket.idPost) === String(post?._id)) {
                const { data, prevCommentId, totalSubcomment, _id, ...info } = commentToSocket;
                const tmp = [...comments, { data, prevCommentId, totalSubcomment, _id }]

                setComments(tmp)
                // console.log(comments)
                post.comments.push({ data, prevCommentId, totalSubcomment, _id })
                let tmp2 = []
                post?.comments.forEach(el => tmp2.push(el.totalSubcomment))
                setTotalSubcomments([...tmp2])
                setCommentToSocket({...commentToSocket, idPost: ''})
            }
        }
    }, [commentToSocket])

    useEffect(() => {
        if (opened && newSubCmtToSocket) {
            // console.log(newSubCmtToSocket)

            if (String(newSubCmtToSocket.idPost) === String(post?._id)) {
                const { i, ...info } = newSubCmtToSocket;
                // console.log(newSubCmtToSocket)
                let tmp2 = []
                post?.comments.forEach(el => tmp2.push(el.totalSubcomment))
                totalSubcomments.push(...tmp2)

                if (totalSubcomments || totalSubcomments === []) {
                    let count = post?.comments[Number(i)].totalSubcomment + 1;
                    totalSubcomments.splice(Number(i), 1, count);
                    post.comments[Number(i)].totalSubcomment = totalSubcomments[Number(i)];
                    totalSubcomments.splice(tmp2.length)
                    setTotalSubcomments(totalSubcomments.slice(0))
                }
                if(newSubCmtToSocket.i !== -1)
                    setNewSubCmtToSocket({ idPost: '', i: -1, idComment: '', idSubCmt: newSubCmtToSocket.idSubCmt })
            }
        }
    }, [newSubCmtToSocket])

    let arrayImage = []
    const handleDelete = async () => {
        try {
            setIsLoading(true)
            await dispatch(deletePost(post._id))
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const ContentImage = () => {

        if (post.selectedFile.length > 0) {
            arrayImage = post.selectedFile.filter(function (file) {
                return file.type.includes("image");
            })
            setLengthImage(arrayImage.length)
            if (arrayImage.length > 0)
                return <img alt='' className={classes.haveImage} src={arrayImage[currentImage]?.base64} />
        }
        return false;
    }
    const ContentFile = () => {

        if (post.selectedFile.length > 0) {
            return <>
                {post.selectedFile.map(file => {
                    if (!file.type.includes("image")) {
                        return <a key={file.name} className={classes.fileOther} title={file.name} href={file.base64} download>
                            <div key={file.name} className={classes.file}>{file.name}</div>
                        </a>
                    } else return null;
                })}
            </>
        }
        return false;
    }

    const changePrevImage = () => {
        if (currentImage === 0) {
            setCurrentImage(arrayImage.length - 1)
        } else {
            setCurrentImage(currentImage - 1)
        }
    }
    const changeNextImage = () => {
        if (currentImage === arrayImage.length - 1) {
            setCurrentImage(0)
        } else {
            setCurrentImage(currentImage + 1)
        }
    }
    // no socket
    const HaveLike = () => {
        if (post.likes.length > 0) {
            return post.likes.find(like => like === user?.result?.email)
                ? (
                    <><ThumbUpAltIcon style={{ color: 'blue' }} /></>
                ) : (
                    <><ThumbUpAltOutlinedIcon /></>
                )
        }
        return <><ThumbUpAltOutlinedIcon /></>
    }
    const handleLikePost = async () => {
        try {
            setIsUpdate(true)
            const data = await dispatch(likePost(post._id))
            const isLike = data.likes.find(like => like === user?.result?.email)
            // alert(isLike)
            if(isLike && socket){
                socket.emit('send likeInteraction', ({ email: user?.result?.email, indexPost, idPost: post._id ,title: post.message,data, isLike }), (error) => {
                    if (error) {
                        alert(error)
                    }
                })
            }
        } catch (error) {

        } finally {
            setIsUpdate(false)
        }
    }

    const handleShowComment = async () => {

        if (!opened) {
            setIsFake(true)
            try {
                setIsLoadingComment(true)
                let { data } = await fetchPostComment(post._id)
                // console.log(data)

                if (data) {
                    post.comments = data;
                    await setComments([...data])
                    let tmp2 = []
                    post?.comments.forEach(el => tmp2.push(el.totalSubcomment))
                    await setTotalSubcomments([...tmp2])
                    // console.log("...");
                    setOpened(true)


                    setIsLoadingComment(false)
                }
            } catch (error) {
                console.log(error)

                setIsLoadingComment(false)
            }
            setIsFake(false)
        }

        // setIsComment(!isComment)
        dispatch({ type: IS_COMMENT, payload: indexPost })
    };
    return (
        <>
            <Paper key={post._id} className={classNames(classes.post, newPost.is && newPost?.postId === post._id ? classes.newPost : null)}>
                <div className={classes.post__top}>
                    <Avatar className={classes.post__avatar}>{post.creator[0]}</Avatar>
                    <div className={classes.post__topInfo}>
                        <div className={classes.h3__topInfo}>{post.creator}</div>
                        <div className={classes.date}>{moment(post.createdAt).format('L')}</div>
                    </div>
                    {user?.result?.email === post.creator &&
                        <div className={classes.post__delete} onClick={handleDelete}>
                            <DeleteIcon />
                        </div>
                    }
                </div>
                {
                    isLoading ? <div style={{ display: 'flex', padding: '5px', flexDirection: 'column', width: '100%', placeItems: 'center' }}><CircularProgress />Đang xóa</div>
                        :
                        <>
                            <div className={classes.body}>
                                <div className={classes.post__bottom}>
                                    <p>{post.message}</p>
                                </div>

                                <div className={classes.post__image} >
                                    {post.selectedFile && <ContentImage />}
                                    {lengthImage > 1 &&
                                        <>
                                            <div onClick={changePrevImage} className={classes.previousImage}>

                                                <ArrowBackIosIcon className={classes.icon} />
                                            </div>
                                            <div onClick={changeNextImage} className={classes.nextImage}>

                                                <ArrowForwardIosIcon className={classes.icon} />
                                            </div>
                                        </>
                                    }
                                </div>

                                <div className={classes.post__file} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                                    {post.selectedFile && <ContentFile />}
                                </div>
                            </div>
                            <div className={classes.post__options}>


                                {isUpdate ? <div className={classes.post__option}><CircularProgress /></div>
                                    :
                                    <>
                                        <div className={classes.post__option} onClick={handleLikePost}>
                                            <HaveLike />
                                            <p style={{ marginLeft: '10px' }}>{post.likes.length} Thích</p>
                                        </div>
                                    </>
                                }

                                <div className={classes.post__option} onClick={handleShowComment}>
                                    <ChatBubbleOutlineOutlinedIcon />
                                    <p style={{ marginLeft: '10px' }}>Bình luận</p>
                                </div>
                                <div className={classes.post__option}>
                                    <ShareOutlinedIcon />
                                    <p style={{ marginLeft: '10px' }}>Chia sẻ</p>
                                </div>
                            </div>
                            {isFake &&
                                <div style={{ display: 'flex', padding: '5px', flexDirection: 'column', width: '100%', placeItems: 'center' }}><CircularProgress /></div>
                            }
                            {isComments[indexPost] &&
                                <div className={classes.comments}>
                                    <Comment
                                        subCommentToSocket={subCommentToSocket}
                                        setNewSubCmtToSocket={setNewSubCmtToSocket}
                                        post={post}
                                        setIsLoadingComment={setIsLoadingComment}
                                        opened={opened}
                                        isLoadingComment={isLoadingComment}
                                        socket={socket}
                                        handleDelete={handleDelete}
                                        comments={comments}
                                        setComments={setComments}
                                        totalSubcomments={totalSubcomments}
                                        setTotalSubcomments={setTotalSubcomments}
                                        indexPost={indexPost}
                                        handleShowComment={handleShowComment}
                                        showSubCmt={showSubCmt}
                                    />
                                </div>
                            }

                        </>
                }

            </Paper>
        </>
    )
}

export default Post