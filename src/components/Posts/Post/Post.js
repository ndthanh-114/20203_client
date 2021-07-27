import React, { useState } from 'react'
import { Avatar, Paper, CircularProgress } from '@material-ui/core'
import useStyles from './styles'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { deletePost, likePost } from '../../../actions/posts';
import DeleteIcon from '@material-ui/icons/Delete';

import Comment from './Comment/Comment'

const Post = ({ post }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isComment, setIsComment] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const classes = useStyles()
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
    const handleDelete = async () => {
        try {
            setIsLoading(true)
            await dispatch(deletePost(post._id))
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const HaveLike = () => {
        if (post.likes.length > 0) {
            return post.likes.find(like => like === user?.result?._id)
                ? (
                    <><ThumbUpAltIcon style={{ color: 'blue' }} /></>
                ) : (
                    <><ThumbUpAltOutlinedIcon /></>
                )
        }
        return <><ThumbUpAltOutlinedIcon /></>
    }
    const handleShowComment = () => setIsComment(!isComment);
    const handleLikePost = async () => {
        setIsUpdate(true)
        await dispatch(likePost(post._id))
        setIsUpdate(false)
    }
    return (
        <>
            <Paper key={post._id} className={classes.post}>
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
                    isLoading ? <Paper style={{ display: 'flex', padding: '5px', flexDirection: 'column', width: '100%', placeItems: 'center' }}><CircularProgress />Đang xóa</Paper>
                        :
                        <>
                            <div className={classes.body}>
                                <div className={classes.post__bottom}>
                                    <p>{post.message}</p>
                                </div>

                                <div className={classes.post__image}>
                                    {post.selectedFile && <img alt=' ' className={classes.haveImage} src={post.selectedFile} />}
                                </div>
                            </div>
                            <div className={classes.post__options}>
                                
                                <div className={classes.post__option} onClick={handleLikePost}>
                                    {isUpdate ? <CircularProgress />
                                        : 
                                        <>
                                            <HaveLike />
                                            <p style={{ marginLeft: '10px' }}>{post.likes.length} Thích</p>
                                        </>
                                    }
                                </div>
                                <div className={classes.post__option} onClick={handleShowComment}>
                                    <ChatBubbleOutlineOutlinedIcon />
                                    <p style={{ marginLeft: '10px' }}>Bình luận</p>
                                </div>
                                <div className={classes.post__option}>
                                    <ShareOutlinedIcon />
                                    <p style={{ marginLeft: '10px' }}>Chia sẻ</p>
                                </div>
                            </div>
                            {isComment &&
                                <div className={classes.comments}>
                                    <Comment post={post}  />
                                </div>
                            }

                        </>
                }

            </Paper>
        </>
    )
}

export default Post
