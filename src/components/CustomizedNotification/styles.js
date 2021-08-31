import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    
    zIndex: 12, 
  },
 
  image: {
    borderRadius: '50%', 
    height: '60px', 
    border: '2px solid lightgray', 
    [theme.breakpoints.down('xs')]: {
      height: '40px',
    },
    
  }, 
  hidden: {
    position: 'fixed',
    bottom: theme.spacing(-50),
    right: theme.spacing(-50),
  },
}));