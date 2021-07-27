import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
    createPost: {
        padding: '5px',
        display: "flex",
        flexDirection: "column",
        width: '100%'
    },
    header__createPost: {
        display: 'flex',
        flexDirection: 'row',
        borderBottom: '1px solid #eff2f5',
        padding: '5px',
        alignItems: 'center'
    },
    form___createPost: {
        flex: '1',
        display: 'flex',

    },
    input__createPost: {
        outlineWidth: '0',
        border: 'none',
        padding: '10px 20px',
        margin: '0 10px',
        borderRadius: '999px',
        backgroundColor: '#eff2f5',
        flex: '1',
        fontSize: '1.05rem'
    },
    options__createPost: {
        display: 'flex',
        justifyContent: 'space-evenly',
    },
    option: {
        padding: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: '0.33',
        color: 'gray',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#eff2f5',
            borderRadius: '20px'
        }
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: '10px',
        boxShadow: theme.shadows[5],
        
    },
}))