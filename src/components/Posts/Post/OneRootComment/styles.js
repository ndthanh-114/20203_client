import {makeStyles} from '@material-ui/core/styles'

export default makeStyles((theme) => ({
    
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
        
        // wordBreak: 'break-all',
        // wordWrap: 'break-word',
    },
    emojiSub: {
        '& img': {
            verticalAlign: 'middle !important',
        }
    }
}))