import {makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
    form: {
        padding: '5px',
        display: 'flex', 
        flexDirection: "column",
        alignItems: "center",
        position: 'relative',
    },
    header: {
        maxWidth: '100%',
        fontSize: 'medium',
        fontWeight: 'bold',
        padding: '5px 0',
        textAlign: 'center',
        borderBottom: '1px solid gray',
        display: 'block',
    },
    body: {
        padding: '5px',
        display: 'flex',
        flexDirection: 'column',
        
    },
    top: {
        display: 'flex',
        flexDirection: 'flex-start',
        padding: '5px 0'
    }, 
    avatar: {
        marginRight: '5px',
        
    }, 
    info: {

    }, 
    detail: {
        display: 'flex',
        alignItems: 'center',
        
    },
    input_text: {
        padding: '10px',
        fontSize: '1.05rem',
        
        border: 'none',
        backgroundColor: 'whitesmoke',
        resize: 'none',
        outline: 'none',
    },

    image: {
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-between'
    }, 
    submit: {
      
        margin: '5px'
    },
    prevImage: {
        position: 'relative',
    },
    closeImage: {
        position: 'absolute',
        fontSize: 'large',
        color: 'blue',
        backgroundColor: 'white',
        right: '5px',
        top: '5px',
        borderRadius: '50%',
        cursor: 'pointer'
    }, 
    closeForm: {
        position: 'absolute',
        padding: '0 5px',
        right: '0px',
        cursor: 'pointer',
    }, 
    paper: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: '10px',
        boxShadow: theme.shadows[5],
        
    },
}))