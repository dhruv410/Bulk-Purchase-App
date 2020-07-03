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
class ReadyToDispatch extends Component {

    // var user3 = []
    constructor(props){
        super(props)
        this.state = {
          data: []
        }
        const user2 = { vendor: localStorage.getItem('key') } 
        axios.post('http://localhost:4000/productshow', user2)
        .then(res => {
            // user3 = res3;
            res.data.map((items) => {
              console.log(items)
            })
        })
        this.onRemove = this.onRemove.bind(this);
        this.onDispatch = this.onDispatch.bind(this);
        this.onBack = this.onBack.bind(this);
        this.getProducts = this.getProducts.bind(this);
    }
    componentDidMount(){
      this.getProducts()
    }
    getProducts(){
      const user2 = { vendor: localStorage.getItem('key') } 
      axios.post('http://localhost:4000/productshow', user2)
      .then(res => {
          this.setState({
            data: res.data
          })
          // user3 = res3;
          // res.data.map((items) => {
          //   console.log(items)
          // })
      })
    }
    onBack(event) {
    this.props.history.push('/vendordashboard')
    }
    onRemove(e,index){
      console.log(index);
    e.preventDefault()
    // const user = {
    //   product: this.state.product,
    //   quantity: this.state.quantity,
    //   price: this.state.price,
    //   vendor: localStorage.getItem('key'),
    //   remaining: this.state.remaining,
    //   status: 'Dispatched',
    //   id: index
    // }
    axios.post('http://localhost:4000/productremove', index)
    .then(res => {
        console.log(res.data)
        if(res.data.message === 'Cancelled')
        {
            // this.props.history.push('/productstatus')
            window.location.reload()
        }
        else{
            console.log(res.data.message)
        }
    })
    }

    onDispatch(e,index){
      console.log(index);
    e.preventDefault()
    const user = {
        vendor: localStorage.getItem('key'),
        id: index
    }
    axios.post('http://localhost:4000/productdispatch', user)
    .then(res => {
        console.log(res.data)
        if(res.data.message === 'Dispatched')
        {
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
      if (item.remaining > 0 || item.status != 'Not Dispatched'){
      return (<div> </div>)
      }
      else {return (
        <div>
        <li>
          Product = {item.product}
          <br></br>
          Remaining = {item.remaining}  
        </li>
        <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick = {(event) => this.onRemove(event,item)}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick = {(event) => this.onDispatch(event,item._id)}
      >
        Dispatch
      </Button>

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
            Vendor Products Ready To Dispatch
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

export default  withStyles(styles)(ReadyToDispatch);