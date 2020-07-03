import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios'
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class UserSignIn extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.goToUserSignUp = this.goToUserSignUp.bind(this);
    this.goToUserDashboard = this.goToUserDashboard.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.goToVendorSignIn = this.goToVendorSignIn.bind(this);
  }
  onChangeEmail(event) {
      this.setState({ email: event.target.value });
  }
  onChangePassword(event) {
      this.setState({ password: event.target.value });
  }
  goToUserSignUp(event) {
    this.props.history.push('/usersignup')
  }
  goToUserDashboard(event) {
    this.props.history.push('/userdashboard')
  }
  goToVendorSignIn(event) {
    this.props.history.push('/vendorsignin')
  }
  onSubmit(e){
    e.preventDefault()
    const user = {
      email: this.state.email,
      password: this.state.password
    }
    axios.post('http://localhost:4000/usercheck', user)
    .then(res => {
      // console.log(res.data)
      if(res.data.message === 'Confirmed')
      {
        localStorage.setItem('key', this.state.email);
         this.goToUserDashboard()
      }
      else{
        console.log(res.data)
      }
    })
  }
    render(){
        // console.log('2')
        const {classes} = this.props;
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          User Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value = {this.state.email}
            onChange = {this.onChangeEmail}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value = {this.state.password}
            onChange = {this.onChangePassword}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {this.onSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
            <Button onClick = {this.goToVendorSignIn} >
                   "Not a User?"
            </Button>
            </Grid>
            <Grid item>
                <Button onClick = {this.goToUserSignUp} >
                    "Don't have an account? Sign Up"
                </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
}

export default withStyles(styles)(UserSignIn);
