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
class UserPlaced extends Component {

    // var user3 = []
    constructor(props){
        super(props)
        this.state = {
          data: [],
           rate: 0
        }
        this.onBack = this.onBack.bind(this);
        this.getOrders = this.getOrders.bind(this);
        this.updateOrders = this.updateOrders.bind(this);
        this.onChangeRate = this.onChangeRate.bind(this);
        this.onRate = this.onRate.bind(this);
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
    
      onChangeRate(event,index) {
        this.setState({ rate: event.target.value});
        // console.log(this.state.quantity)
    }
    onRate(e,index){
        if (this.state.rate < 0 || this.state.rate > 5 )
        {
            console.log('Rating Invalid')
            return ;
        }
        e.preventDefault()
        const user = {
            useremail: localStorage.getItem('key'),
            id: index,
            rate: this.state.rate
        }
        axios.post('http://localhost:4000/vendorrate', user)
        .then(res => {
            console.log(res.data)
            if(res.data.message === 'Rated')
            {
                // this.props.history.push('/productstatus')
                window.location.reload()
            }
            else{
                console.log(res.data.message)
            }
        })
    }

    

  render() {
      const {classes} = this.props;
      const allproducts = this.state.data.map((item, index) => {
      if (item.status == 'Dispatched' || item.remaining != 0 || item.status == 'Cancelled'){
      return (<div> </div>)
      }
      else if (item.vendorrated == 0) {return (
        <div>
        <li>
          Product = {item.product}
          <br></br>
          Quantity = {item.quantity}
          <br></br>
          Vendor = {item.vendor}
          <br></br>
          Status = {item.status}
        </li>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="rate"
            label="Rate Vendor" 
            name="rate"
            autoComplete="rate"
            autoFocus
            value = {this.state.rate[index]}
            // onChange = {this.onChangeQuantity[index]}
            onChange = {(event) => this.onChangeRate(event,this.state.rate[index])}
          />
          </form>
          <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick = {(event) => this.onRate(event,item)}
         >
        Rate Vendor
      </Button>
      <br></br>
      <br></br>
      </div>
      )}
      else
      {
        return (
        <div>
        <li>
          Product = {item.product}
          <br></br>
          Quantity = {item.quantity}
          <br></br>
          Vendor = {item.vendor}
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
            Order Placed
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

export default  withStyles(styles)(UserPlaced);