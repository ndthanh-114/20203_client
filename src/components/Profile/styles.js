import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    profile: {
        padding: '5px',
        display: 'flex',
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        positon: 'fixed'
    },
    txt: {
       marginBottom: '5px'
    },
    options: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    icon: {
        color: 'rgb(0,0,0,0.8)',
        padding: '13px',
        background: 'rgb(0,255,255,0.4)',
        borderRadius: '50%',
        '&:hover': {
            background: 'rgb(0,255,255,0.5)',
            cursor: 'pointer',
        }
    },
    notifi: {
        color: 'red',
       
    }
}))