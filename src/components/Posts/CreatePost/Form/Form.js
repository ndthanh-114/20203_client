import React, { useState } from 'react'
import useStyles from './styles'
import { Avatar, Button, CircularProgress } from "@material-ui/core"
import FileBase from 'react-file-base64'
// import ImageIcon from '@material-ui/icons/Image';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';
import { useDispatch } from 'react-redux'
import { createPost } from '../../../../actions/posts'

const Form = ({ user, setOpen }) => {
    const [postData, setPostData] = useState({
        message: '',
        creator: user?.result?.email,
        selectedFile: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();
    const classes = useStyles()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            await dispatch(createPost(postData))
            setOpen(false)
           
            setIsLoading(false)
        } catch (error) {
            setOpen(false)
            console.log(error);
        }
    }
    const handleCloseImage = () => {
        setPostData({ ...postData, selectedFile: '' })
    }
    return (
        <>
            {
                isLoading
                    ? <div style={{ display: 'flex', placeItems: 'center' }}><CircularProgress /></div>
                    :
                    <div className={classes.paper}>
                    <form autoComplete="off" noValidate className={classes.form} onSubmit={handleSubmit}>
                        <div className={classes.header}>
                            Tạo bài viết
                        </div>
                        <div className={classes.body}>
                            <div className={classes.top}>
                                <Avatar className={classes.avatar}>{user?.result?.email[0]}</Avatar>
                                <div className={classes.info}>
                                    <div style={{ fontWeight: 'bold' }}>{user?.result?.email}</div>
                                    <div className={classes.detail}>
                                        <SupervisorAccountIcon style={{ fontSize: 'medium' }} />
                                        <div style={{ marginLeft: '5px', fontSize: '0.9rem', color: 'gray' }}>Bạn bè</div>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.main}>
                                <textarea
                                    onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                                    value={postData.message}
                                    name="message"
                                    rows="4"
                                    cols="50"
                                    className={classes.input_text}
                                    placeholder="Bạn đang nghĩ gì thế?"
                                />

                                <div className={classes.image}>
                                    {
                                        postData.selectedFile ?
                                            <div className={classes.prevImage}>
                                                <img src={postData.selectedFile} style={{ height: '100px', objectFit: 'contain' }} alt=''/>
                                                <HighlightOffTwoToneIcon className={classes.closeImage} onClick={handleCloseImage}/>
                                            </div>
                                            :
                                            <>
                                                <div style={{ fontSize: 'medium' }}>Thêm <span style={{ color: 'red' }}><strong>1 ảnh</strong></span></div>
                                                <FileBase
                                                    hidden
                                                    name="selectedFile"
                                                    type="file"
                                                    multiple={false}
                                                    onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                                                />
                                            </>
                                    }
                                </div>
                            </div>
                        </div>

                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            Đăng
                        </Button>
                        
                        <HighlightOffTwoToneIcon className={classes.closeForm} onClick={() => setOpen(false)}/>
                        
                    </form>
                    </div>
            }
        </>
    )
}

export default Form
