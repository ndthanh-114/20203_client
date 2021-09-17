import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import ReactEmoji from 'react-emoji'
import useStyles from './styles';

const CustomizedDeletedPost = ({ postDeleted, setPostDeleted }) => {
    const classes = useStyles();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setPostDeleted({})

    };

    return (
        
            postDeleted.creatorPostDeleted ?
        
            <div className={classes.root}>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={postDeleted} autoHideDuration={3000} onClose={handleClose}>
                    <MuiAlert onClose={handleClose} severity="success" elevation={6} variant="filled">
                        <strong>{postDeleted?.creatorPostDeleted}</strong> đã xóa bài viết &nbsp;
                        <span className={classes.customSpan}>
                            {postDeleted?.dataDeleted.length >= 10
                                ?
                                postDeleted?.dataDeleted[9] !== ':'
                                    ?
                                    ReactEmoji.emojify(postDeleted?.dataDeleted.substring(0, 10) + '...', { attributes: { width: '18px', height: '18px' } })
                                    :
                                    ReactEmoji.emojify(postDeleted?.dataDeleted.substring(0, 9) + '...', { attributes: { width: '18px', height: '18px' } })
                                :
                                ReactEmoji.emojify(postDeleted?.dataDeleted, { attributes: { width: '18px', height: '18px' } })}
                        </span>
                    </MuiAlert>
                </Snackbar>
            </div>
            : null

    );
};

export default CustomizedDeletedPost;