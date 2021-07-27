import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, Grow,CircularProgress } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles'
import Input from './Input'
import { useHistory } from 'react-router-dom'
import { signin, signup } from '../../actions/auth'
import { useDispatch, useSelector } from 'react-redux'

const Auth = () => {
  const { isLoading } = useSelector(state => state.auth);
  const [isSignup, setIsSignup] = useState(false);
  const classes = useStyles();
  const [formData, setFormData] = useState({
    email: '', password: '', confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false);

  const history = useHistory()
  const dispatch = useDispatch()

  const handleShowPassword = () => setShowPassword(!showPassword);



  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignup) {
        dispatch(signup(formData, history));
      } else {
        dispatch(signin(formData, history));
      }
    } catch (error) {
      history.push('/auth')
    }


  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  return (
    isLoading ? <div style={{ display: 'flex', padding: '5px', flexDirection: 'column', width: '100%', placeItems: 'center' }}><CircularProgress style={{ color: 'white' }} /></div>
      :
      <Grow in>
        <Container component="main" maxWidth="xs">
          <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">{isSignup ? 'Đăng ký' : 'Đăng nhập'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                {isSignup && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />}
              </Grid>

              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                {isSignup ? 'Đăng ký' : 'Đăng nhập'}
              </Button>

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Button onClick={switchMode}>
                    {isSignup ? 'Đã có tài khoản? Đăng nhập' : "Chưa có tài khoản? Đăng ký"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      </Grow>
  );
}

export default Auth
