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
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Comment from './Comment/Comment'

const Post = ({ post }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isComment, setIsComment] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const classes = useStyles()
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
    const [lengthImage, setLengthImage] = useState(0)
    const [currentImage, setCurrentImage] = useState(0)

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
            arrayImage = post.selectedFile.filter(function(file) {
                return file.type.includes("image");
            })
            setLengthImage(arrayImage.length)
            if(arrayImage.length > 0)
                return <img alt='' className={classes.haveImage} src={arrayImage[currentImage]?.base64} />
        }
        return false;
    }
    const ContentFile = () => {

        if (post.selectedFile.length > 0) {
            return <>
                {post.selectedFile.map(file => {
                    if (!file.type.includes("image")) {
                        return <a download key={file.name} className={classes.fileOther} title={file.name} href={file.base64} download>
                            <div key={file.name} className={classes.file}>{file.name}</div>
                        </a>
                    }
                })}
            </>
        }
        return false;
    }

    const changePrevImage = () => {
        if(currentImage === 0 ){
            setCurrentImage(arrayImage.length - 1)
        }else{
            setCurrentImage(currentImage - 1)
        }
    }
    const changeNextImage = () => {
        if(currentImage === arrayImage.length -1 ){
            setCurrentImage(0)
        }else{
            setCurrentImage(currentImage + 1)
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

                                <div className={classes.post__image} >
                                    {post.selectedFile && <ContentImage />}
                                    {lengthImage > 1 && 
                                        <>
                                            <div onClick={changePrevImage} className={classes.previousImage}>
                                            
                                                <ArrowBackIosIcon className={classes.icon}/>
                                            </div>
                                            <div onClick={changeNextImage} className={classes.nextImage}>
                                            
                                                <ArrowForwardIosIcon className={classes.icon} />
                                            </div>
                                        </>
                                    }
                                </div>
                                
                                <div className={classes.post__file} style={{display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                                    {post.selectedFile && <ContentFile />    }
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
                            {isComment &&
                                <div className={classes.comments}>
                                    <Comment post={post} />
                                </div>
                            }

                        </>
                }

            </Paper>
        </>
    )
}

export default Post
