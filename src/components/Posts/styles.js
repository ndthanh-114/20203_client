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
  }
}));