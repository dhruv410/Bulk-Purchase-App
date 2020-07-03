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
import { createHashHistory } from 'history'

const history = createHashHistory()

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

/* App component */
class Cancelled extends Component {

    // var user3 = []
    constructor(props){
        super(props)
        this.state = {
          data: []
        }
        this.onBack = this.onBack.bind(this);
        this.getOrders = this.getOrders.bind(this);
        this.updateOrders = this.updateOrders.bind(this);
    }
    componentDidMount(){
        this.updateOrders()
        // this.getOrders()
      }
      updateOrders(){
        const user2 = { useremail: localStorage.getItem('key') } 
        axios.post('http://localhost:4000/orderupdate', user2)
      .then(res =>{
          this.getOrders()
      })
  }
  getOrders(){
      const user2 = { useremail: localStorage.getItem('key') } 
        axios.post('http://localhost:4000/ordershow', user2)
        .then(res => {
            this.setState({
              data: res.data
            },
            )
        })
        
      }
      onBack(event) {
      this.props.history.push('/userdashboard')
      }
    

  render() {
      const {classes} = this.props;
      const allproducts = this.state.data.map((item, index) => {
      if (item.status != 'Cancelled'){
      return (<div> </div>)
      }
      else {return (
        <div>
        <li>
          Product = {item.product}
          <br></br>
          Quantity = {item.quantity}
          <br></br>
          Status = {item.status}
        </li>

      <br></br>
      <br></br>
      </div>
      )}
      }
      )
    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Products Placed
          </Typography>
          <div>
            {allproducts}
          </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick = {this.onBack}
            >
              Go Back
            </Button>
        </div>
        <Box mt={8}>
        </Box>
      </Container>
    )
  }
}

export default  withStyles(styles)(Cancelled);