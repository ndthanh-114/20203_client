import React, {useEffect} from 'react';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Bell from '../../assets/bell.gif'
import useStyles from './styles'
import Notification from './Notification/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { NOTIFICATION as Noti } from '../../constants/actionTypes';

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
      socket.on('interaction', ({ error, title, email, data, indexPost }) => {
        if (error) {
          alert(error)
        }
        console.log( title, email, data, indexPost )
        dispatch({ type: Noti, payload: { email, data, title, indexPost } })
      })
    }
    return () => {
      if (socket) socket.off('interaction')
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