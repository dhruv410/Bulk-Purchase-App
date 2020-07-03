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
class NewUserProduct extends Component {

    // var user3 = []
    constructor(props){
        super(props)
        this.state = {
          data: [],
          quantity: 0,
          data1: 0,
          search: ''
        }
        // const user2 = { vendor: localStorage.getItem('key') } 
        // axios.post('http://localhost:4000/productshow', user2)
        // .then(res => {
        //     // user3 = res3;
        //     res.data.map((items) => {
        //     //   console.log(items)
        //     })
        // })
        this.onOrder = this.onOrder.bind(this);
        this.onShow = this.onShow.bind(this);
        this.onBack = this.onBack.bind(this);
        this.getUserProducts = this.getUserProducts.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.getRating = this.getRating.bind(this);
    }
    componentDidMount(){
      this.getUserProducts()
    }
    getUserProducts(){
        // console.log('3')

      const user2 = {} 
      axios.post('http://localhost:4000/productdisplay', user2)
      .then(res => {
          // console.log('3')
          this.setState({
            data: res.data
          })
          this.getRating()
      })
    }
    onChangeQuantity(event,index) {
        this.setState({ quantity: event.target.value});
        // console.log(this.state.quantity)
    }
    onChangeSearch(event,index) {
      this.setState({ search: event.target.value});
      // console.log(this.state.quantity)
  }
    onBack(event) {
    this.props.history.push('/userdashboard')
    }
    getRating()
    {
      const user3 = {
        // index: item
      }
      axios.post('http://localhost:4000/getrating', user3)
      .then(res =>{
        // console.log(res.data.ans, 'x')
        // return (res.data.ans);
        // this.setState({
        //   data1: res.data.ans
        // })
      })
    }
    onShow(event, item)
    {
      // console.log('3')
      const user3 = {
        index: item
      }
      axios.post('http://localhost:4000/vendorshow', user3)
      .then(res => {
        console.log(res.data)
              alert (res.data.join("\n"))
          // this.setState({
            // data: res.data
          // })
      })
    }
    onOrder(e,index){
    console.log(this.state.quantity)
    if (this.state.quantity < 0 || this.state.quantity > index.remaining )
    {
        console.log('Quantity Invalid')
        return ;
    }

    console.log(index);
    e.preventDefault()
    const user = {
        email: localStorage.getItem('key'),
        id: index ,
        orderquantity: this.state.quantity,
        vendorrated: 0,
        orderrated: 0,
        vendorrating: 0
    }
    axios.post('http://localhost:4000/productupdate', user)
    .then(res => {
    })
    // console.log('xx')
    axios.post('http://localhost:4000/productorder', user)
    .then(res => {
        // console.log(res.data)
        if(res.data.message === 'Ordered')
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
      if (item.remaining <= 0 || item.status == 'Cancelled' || (this.state.search != '' && item.product!=this.state.search)){
      return (<div> </div>)
      }
      else {return (
        <div>
        <li>
          Product = {item.product}
          <br></br>
          Remaining = {item.remaining}  
          <br></br>
          <Button
          type="submit"
          // fullWidth
          // variant="contained"
          color="primary"
          className={classes.submit}
          onClick = {(event) => this.onShow(event,item)}
         >
          Vendor = {item.vendor}
        </Button>
          {/* {this.getRating(item)} */}
          <br></br>
          Rating = {item.vendorrating}
        </li>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="quantity"
            label="Quantity"
            name="quantity"
            autoComplete="quantity"
            autoFocus
            value = {this.state.quantity[index]}
            onChange = {(event) => this.onChangeQuantity(event,this.state.quantity[index])}
          />
          </form>
        <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick = {(event) => this.onOrder(event,item)}
      >
        Order
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
            Order
          </Typography>
          <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="search"
            label="Search"
            name="search"
            autoComplete="search"
            autoFocus
            value = {this.state.search}
            onChange = {this.onChangeSearch}
          />
          </form>
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

export default  withStyles(styles)(NewUserProduct);