import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  posts: {
    marginTop: '40px',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  notification: {
    position: 'absolute || fixed',
    padding: '20px',
    borderRadius: '20px',
    right: '10px',
    top: '10px',
    display: 'flex',
  },
  notificationMessage:{
    borderRight: '1px solid gray',
    flex: '1',
    '&:hover': {
      backgroundColor: 'gray',
    }
  },
  
  closeNotification:{
    '&:hover': {
      backgroundColor: 'gray',
    }
  }
 
}));