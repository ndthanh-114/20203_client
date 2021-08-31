import { Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(12),
    right: theme.spacing(3),
    border: `2px solid lightgray`,
    maxWidth: '400px',
    background: 'whitesmoke',
    borderRadius: '6px',
    maxHeight: '500px',
    overflow: 'auto', 
    zIndex: 14,
    [theme.breakpoints.down('xs')]: {
      bottom: theme.spacing(9),
    },
    animation: `$myEffect 1000ms`,
  },
  "@keyframes myEffect": {
    "0%": {
      opacity: 0,
      transform: "translateX(100%)"
    },
    "100%": {
      opacity: 1,
      transform: "translateX(0)"
    }
  },
  notification: {
    padding: '10px',

    '&:hover': {
      background: `lightgray`,
      cursor: 'pointer'

    }
  },
  truncate: {
    maxWidth: '60px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));