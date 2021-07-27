import React, { useState } from 'react';
import { Typography, CircularProgress } from '@material-ui/core/';
import { useDispatch } from 'react-redux';

import { commentPost } from '../../../../actions/posts';
import useStyles from './styles';

const Comment = ({ post }) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const [comments, setComments] = useState(post?.comments);
    const [isUpdate, setIsUpdate] = useState(false)
    const classes = useStyles();
    

    const handleComment = async (e) => {
        e.preventDefault()
        setIsUpdate(true);
        const newComments = await dispatch(commentPost(`${user?.result?.email}: ${comment}`, post._id));
        setComment('');
        setIsUpdate(false);
        setComments(newComments);

        
    };

    return (
        <div >
            <div className={classes.commentsOuterContainer} >
                <Typography gutterBottom variant="p">{comments.length} lượt bình luận</Typography>
                <div className={classes.commentsInnerContainer} >

                    {comments?.map((c, i) => (
                        <>
                            <Typography key={i} gutterBottom variant="p" className={classes.list__comment}>
                                <strong>{c.split(': ')[0]}</strong>
                                {c.split(':')[1]}
                            </Typography>
                            
                        </>
                    ))
                    }

                </div>
                <form  className={classes.form___comment} onSubmit={handleComment}>
                    <input 
                        disabled={isUpdate}
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
