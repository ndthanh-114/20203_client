import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
    commentsOuterContainer: {
        padding: '5px',
        display: 'flex',
        alignItems: 'stretch',
        flexDirection: 'column',
    },
    commentsInnerContainer: {
        margin: '5px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        
    },
    form___comment: {
        display: 'flex',
        borderRadius: '20px',
    },
    input__comment: {
        flex: '1',
        fontSize: 'medium',
        padding: '10px',
        border: 'none',
        borderRadius: '15px',
        backgroundColor: 'whitesmoke',
        resize: 'none',
        outline: 'none',
    },
    list__comment: {
        padding: '5px 10px',
        borderRadius: '15px',
        backgroundColor: 'whitesmoke',
    }
}))