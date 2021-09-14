import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { AppBar, Container, Typography } from '@material-ui/core'
import Auth from './components/Auth/Auth'
import Posts from './components/Posts/Posts'
import useStyles from './styles';
import './App.css'
const App = () => {
    

    const classes = useStyles();
    return (
        <BrowserRouter>
            <Container maxWidth="lg">
                <AppBar className={classes.appBar} position="static" color="inherit">
                    <Typography variant="h2" align="center">Bài đăng</Typography>
                </AppBar>
                <Switch>
                    <Route path='/' exact component={Posts} />
                    <Route path='/auth' exact component={Auth} />
                </Switch>
            </Container>
        </BrowserRouter>
    )
}
export default App;
