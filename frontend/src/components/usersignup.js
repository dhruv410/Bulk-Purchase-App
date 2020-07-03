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

class UserSignUp extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      password: ''
    }
    this.goToUserSignIn = this.goToUserSignIn.bind(this);
    this.goToUserDashboard = this.goToUserDashboard.bind(this);
    this.onChangeFirstname = this.onChangeFirstname.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.goToVendorSignUp = this.goToVendorSignUp.bind(this);
  }
  
  onChangeFirstname(event) {
      this.setState({ firstName: event.target.value });
  }
  onChangeLastname(event) {
      this.setState({ lastName: event.target.value });
  }
  onChangeEmail(event) {
      this.setState({ email: event.target.value });
  }
  onChangePassword(event) {
      this.setState({ password: event.target.value });
  }
  goToUserSignIn(event) {
    this.props.history.push('/usersignin')
  }
  goToVendorSignUp(event) {
    this.props.history.push('/vendorsignup')
  }
  goToUserDashboard(event) {
    this.props.history.push('/userdashboard')
  }
  onSubmit(e){
    console.log('2')
    e.preventDefault()
    console.log('2')

    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    }
    axios.post('http://localhost:4000/useradd', user)
    .then(res => {
      if(res.data.message === 'User Added')
      {
        localStorage.setItem('key', this.state.email);
        this.goToUserDashboard()
      }
      console.log(res.data)
    })
  }
  render(){
      console.log('2')
    const {classes} = this.props;
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {/* {this.props.name} */}
          User Sign Up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="firstName"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value = {this.state.firstName}
                onChange = {this.onChangeFirstname}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lastName"
                value = {this.state.lastName}
                onChange = {this.onChangeLastname}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value = {this.state.email}
                onChange = {this.onChangeEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {this.onSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
          <Grid item xs>
            <Button onClick = {this.goToVendorSignUp} >
                    "Not a User?"
                </Button>
            </Grid>
            <Grid item>
              <Button onClick = {this.goToUserSignIn}>
                Already have an account? Sign in
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
  }
}

export default withStyles(styles)(UserSignUp)