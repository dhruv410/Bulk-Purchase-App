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
class NewVendorProduct extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
        this.onChangeProduct = this.onChangeProduct.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onBack = this.onBack.bind(this);
    }
    onChangeProduct(event) {
        this.setState({ product: event.target.value });
    }
    onChangePrice(event) {
        this.setState({ price: event.target.value });
    }
    onChangeQuantity(event) {
        this.setState({ quantity: event.target.value });
    }
    onBack(event) {
    this.props.history.push('/vendordashboard')
    }
    onSubmit(e){
    e.preventDefault()
    if (this.state.quantity < 0)
    {
      console.log('Quantity Invalid')
      return ;
    }
    const user = {
        product: this.state.product,
        quantity: this.state.quantity,
        price: this.state.price,
        vendor: localStorage.getItem('key'),
        remaining: this.state.quantity,
        status: 'Not Dispatched',
        vendorrating: 0
    }
    axios.post('http://localhost:4000/productadd', user)
    .then(res => {
        console.log(res.data)
        if(res.data.message === 'Confirmed')
        {
            this.goToVendorDashboard()
        }
        else{
        console.log(res.data)
        }
    })
    }

  render() {
      const {classes} = this.props;
    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Vendor New Product
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="product"
              label="Product"
              name="product"
              autoComplete="product"
              autoFocus
              value = {this.state.product}
              onChange = {this.onChangeProduct}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="quantity"
              label="Quantity"
              type="quantity"
              id="quantity"
              autoComplete="quantity"
              value = {this.state.quantity}
              onChange = {this.onChangeQuantity}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="price"
              label="Price"
              type="price"
              id="price"
              autoComplete="price"
              value = {this.state.price}
              onChange = {this.onChangeprice}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick = {this.onSubmit}
            >
              Add a New Product
            </Button>

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
            
          </form>
        </div>
        <Box mt={8}>
        </Box>
      </Container>
    )
  }
}

export default  withStyles(styles)(NewVendorProduct);