import React, { useState, useEffect } from 'react'
import useStyles from './styles'
import { Avatar, Button, CircularProgress } from "@material-ui/core"
import FileBase from 'react-file-base64'
// import ImageIcon from '@material-ui/icons/Image';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';
import { useDispatch } from 'react-redux'
import { createPost } from '../../../../actions/posts'

const MAX_SIZE = 29 * 1024;
let totalSize = 0;

const Form = ({ user, setOpen }) => {

    const [postData, setPostData] = useState({
        message: '',
        creator: user?.result?.email,
        selectedFile: []
    })
    const [isMaxSize, setIsMaxSize] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();
    const classes = useStyles()

    const handleFile = (files) => setPostData({ ...postData, selectedFile: files })

    useEffect(() => {

        postData.selectedFile.map(file => {
            if (file.size.split(' ')[1] === 'kB')
                totalSize += Number(file.size.split(' ')[0])
            else
                totalSize += 1024 * Number(file.size.split(' ')[0])

        })
        if (totalSize > MAX_SIZE)
            setIsMaxSize(true)
        else setIsMaxSize(false)
        totalSize = 0;
    }, [postData.selectedFile])

    const handleCloseImage = (nameFile) => {
        const files = postData.selectedFile.filter(file => file.name !== nameFile)
        setPostData({ ...postData, selectedFile: files })

    }

    const PrevImage = () => {
        return (
            postData.selectedFile.map(file => {
                if (file.type.includes("image")) {
                    return <div key={file.name} className={classes.prevImage}>
                        <img src={file.base64} style={{ height: '100px', marginRight: '5px', objectFit: 'contain' }} alt='' />
                        <HighlightOffTwoToneIcon className={classes.closeImage} onClick={() => handleCloseImage(file.name)} />
                    </div>
                }
            })
        )
    }
    const PrevFile = () => {
        return (
            postData.selectedFile.map(file => {
                if (!file.type.includes("image")) {
                    return <div key={file.name} className={classes.prevFile}>

                        {file.name}
                        <HighlightOffTwoToneIcon className={classes.closeImage} onClick={() => handleCloseImage(file.name)} />
                    </div>
                }
            })
        )
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(postData)
        // console.log(Content());
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

                                    <div className={classes.image} >
                                        <div style={{ display: 'flex', overflow: 'auto', width: '485px' }}>
                                            <PrevImage />
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', width: '485px' }}>
                                            <PrevFile />
                                        </div>
                                        {
                                            !postData.selectedFile.length &&
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div style={{ fontSize: 'medium' }}>Thêm tệp</div>
                                                <FileBase
                                                    className={classes.filebase}
                                                    name="selectedFile"
                                                    type="file"
                                                    multiple={true}
                                                    onDone={handleFile}

                                                />
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            {isMaxSize && <div style={{ color: 'red',fontStyle: 'italic', margin: '5px' }}>Vượt quá kích thước cho phép</div>}

                            <Button disabled={(postData.message.trim() === '' && postData.selectedFile.length === 0) || isMaxSize} type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                                Đăng
                            </Button>

                            <HighlightOffTwoToneIcon className={classes.closeForm} onClick={() => setOpen(false)} />

                        </form>
                    </div>
            }
        </>
    )
}

export default Form
