import React, {useEffect} from 'react';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Bell from '../../assets/bell.gif'
import useStyles from './styles'
import Notification from './Notification/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { NOTIFICATION as Noti, UPDATE, UPDATE_CMT } from '../../constants/actionTypes';

const StyledBadge = withStyles((theme) => ({
  badge: {
    top: '15%',
    right: '10%',
    border: `2px solid lightgray`,
    padding: '4px',
  },

}))(Badge);




export default function CustomizedNotification({ socket }) {
  const [open, setOpen] = React.useState(false);
  const { notifications } = useSelector(state => state.posts)
  const dispatch = useDispatch();
  const classes = useStyles()

  useEffect(() => {
    if (socket) {
      socket.on('interaction', ({ error, title, email, data, idPost, indexPost,type,dataCmtPrev, indexOfSubCmt, idCmtPrev }) => {
        if (error) {
          alert(error)
        }
        // console.log( title, email, data, indexPost )
        if(type === "COMMENT"){
          // console.log(title, email, data, indexPost,type,dataCmtPrev, indexOfSubCmt, idCmtPrev)
          dispatch({ type: Noti, payload: { email, data, title, idPost, indexPost, type, dataCmtPrev: '', indexOfSubCmt: -1, idCmtPrev: '' } })
        }else if( type === "SUB_COMMENT"){
          dispatch({ type: Noti, payload: { email, data, title, idPost, indexPost, type, dataCmtPrev, indexOfSubCmt, idCmtPrev } })
        }else if(type === "LIKE"){
          dispatch({ type: Noti, payload: { email, data, title, idPost, indexPost, type, dataCmtPrev: '', indexOfSubCmt: -1, idCmtPrev: '' } })
        }
      })
    }
    return () => {
      if (socket) socket.off('interaction')
    }
  }, [dispatch, socket])

  useEffect(() => {
    if (socket) {
      socket.on('res like', ({ data }) => {
        dispatch({ type: UPDATE, payload: data })
      })
    }
    return () => {
      if (socket) socket.off('res like')
    }
  }, [dispatch, socket])

  useEffect(() => {
    if (socket) {
      socket.on('res cmt', ({ idPost }) => {
        dispatch({ type: UPDATE_CMT, payload: idPost })
      })
    }
    return () => {
      if (socket) socket.off('res cmt')
    }
  }, [dispatch, socket])

  return (
    
    <div>
      <Notification
        open={open}
        notifications={notifications}
      />
      {/* classNames(classes.post, newPost.is && newPost?.postId === post._id ? classes.newPost : null) */}
      <IconButton aria-label="notification" onClick={() => setOpen(!open)} className={ notifications.length > 0 ?  classes.root : classes.hidden}>
        <StyledBadge badgeContent={notifications.length} color="secondary">
          <img src={Bell} className={classes.image} alt="" />
        </StyledBadge>
      </IconButton>
    </div>
  );
}