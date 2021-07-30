import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme)=> ({
    post: {
        width: '100%',
        marginTop: '15px',
        padding: '5px',
    },
    post__top:{
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        padding: '0 5px',
    },
    post__topInfo: {
        display: 'flex',
        flex: '1',
        alignItems: 'flex-start',
        flexDirection: 'column',
    },
    post__delete: {
        '&:hover': {
            borderRadius: '999px',
            backgroundColor: 'lightwhite',
            cursor: 'pointer'
        }
    },
    h3__topInfo: {
        fontSize: 'large',
    },
    date: {
        fontSize: '0.9rem',
        color: 'gray',
    },
    post__avatar: {
        marginRight: '10px',
    },
    body: {
        padding: '0 10px 5px 10px',
    }
    ,
    post__image: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
       
       position: 'relative',
       background: 'whitesmoke',
    }, 

    previousImage: {
        position: 'absolute',
        cursor: 'pointer',
        top: '45%', 
        left: '0',
        padding: '5px',
        
    },
    nextImage: {
        position: 'absolute',
        cursor: 'pointer',
        top: '45%', 
        right: '0',
        padding: '5px',
        
    },
    icon: {
        
        color: 'black', 
        opacity: '0.7'
    },
    
    haveImage: {
      
        flex: '0.7',
        width: '90%',
    },
    fileOther: {
        textDecoration: 'none',
        color: 'black',
        margin: '5px',
    },
    file: {
        backgroundColor: '#ADDCFF',
        textAlign: 'center',
        borderRadius: '10px',
        padding: '2px',
    },
    post__options: {
        borderTop: '1px solid lightgray',
        display: 'flex',
        justifyContent: 'space-evenly',
        fontSize: 'medium',
        color: 'gray',
        cursor: 'pointer',
        padding: '5px 5px 0 5px',
    }, 
    post__option: {
        display: 'flex',
        alignItems: 'center',
        justifyContent:'center',
        flex: '1',
        '&:hover': {
            backgroundColor: '#eff2f5',
            borderRadius: '20px'
        }
    }, 
    comments: {
        marginTop: '5px',
        borderTop: '1px solid lightgray'
    },
    
}))