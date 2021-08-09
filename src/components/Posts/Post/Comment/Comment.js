import React, { useState, useEffect } from 'react';
import { Typography, CircularProgress } from '@material-ui/core/';



import useStyles from './styles';

const Comment = ({ post, socket, handleDelete, opened,  isLoadingComment, setIsLoadingComment}) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const [comment, setComment] = useState('');
   
    const [comments, setComments] = useState(post?.comments);
    const [isUpdate, setIsUpdate] = useState(false)
    const classes = useStyles();

    useEffect(() => {
        socket.on('comment', async ({ newComment }) => {
            await setComments([...comments, newComment])
            post.comments = comments
            post.comments.push(newComment)
        })
    }, [comments])

  
    

    // no use socket
    // const handleComment = async (e) => {
    //     e.preventDefault()
    //     setIsUpdate(true);
    //     const newComments = await dispatch(commentPost(`${user?.result?.email}: ${comment}`, post._id));
    //     setComment('');
    //     setIsUpdate(false);
    //     setComments(newComments);


    // };

    // use socket
    const handleComment = async (e) => {
        e.preventDefault()
        setIsUpdate(true);

        if (comment) {
            const email = user?.result?.email
            const idPost = post._id
            socket.emit('send comment', ({ email, idPost, comment }), (error) => {
                if (error) {
                    alert(error)
                    handleDelete()
                }
                setComment('')
                setIsUpdate(false);
            })
        }


    };


    return (
        <div >
            <div className={classes.commentsOuterContainer} >

                {!isLoadingComment ?
                    <>
                        <Typography gutterBottom variant="subtitle2">{comments.length} lượt bình luận</Typography>
                        <div className={classes.commentsInnerContainer} >
                            {comments?.map((c, i) => (
                                <Typography key={i} gutterBottom variant="subtitle2" className={classes.list__comment}>
                                    <strong>{c.split(': ')[0]}</strong>
                                    {c.split(':')[1]}
                                </Typography>
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
