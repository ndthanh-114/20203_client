import React from 'react'
import { Paper, Button } from '@material-ui/core'
import useStyles from './styles'
const Profile = ({user, handleLogout}) => {
    const classes = useStyles()

    return (
        <Paper style={{margin: '10px'}} className={classes.profile}>
            <div className={classes.txt} >{`Email: ${user?.result?.email}`}</div>
            <div className={classes.txt} >{`Mật khẩu: ${user?.result?.password}`}</div>
            <Button onClick={handleLogout} color="secondary" variant="contained">
                Đăng xuất
            </Button>
        </Paper>
    )
}

export default Profile
