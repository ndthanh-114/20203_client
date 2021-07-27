import { Avatar, Paper } from '@material-ui/core'
import React, { useState } from 'react'
import useStyles from './styles'
import VideocamIcon from '@material-ui/icons/Videocam';
import ImageIcon from '@material-ui/icons/Image';
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Form from './Form/Form'

const CreatePost = ({ user }) => {
    const [open, setOpen] = useState(false);
    

    const classes = useStyles()

    const handleOpen = () => {
        setOpen(true);
    };



    return (
        <Paper className={classes.createPost}>

            <div className={classes.header__createPost}>
                <Avatar>{user?.result?.email[0]}</Avatar>
                <form className={classes.form___createPost}>
                    <input 
                        readOnly 
                        onClick={handleOpen} 
                        className={classes.input__createPost} 
                        type="text" placeholder="Bạn đang nghĩ gì?" 
                    />
                </form>
            </div>
            <div className={classes.options__createPost}>
                <div className={classes.option}>
                    <VideocamIcon style={{ color: 'red' }} />
                    <h3 style={{ fontSize: 'medium', marginLeft: '10px' }}>Video trực tiếp</h3>
                </div>
                <div className={classes.option}>
                    <ImageIcon style={{ color: 'green' }} />
                    <h3 style={{ fontSize: 'medium', marginLeft: '10px' }}>Ảnh/Video</h3>
                </div>
                <div className={classes.option}>
                    <EmojiEmotionsOutlinedIcon style={{ color: 'orange' }} />
                    <h3 style={{ fontSize: 'medium', marginLeft: '10px' }}>Cảm xúc/Hoạt động</h3>
                </div>

            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Form user={user} setOpen={setOpen} />
                </Fade>
            </Modal>
        </Paper>
    )
}

export default CreatePost
