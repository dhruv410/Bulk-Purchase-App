import React, {Component} from 'react';
import Button from '@material-ui/core/Button';

import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
// import { mainListItems, secondaryListItems } from './listItems';
// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';

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

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    // width: `calc(90% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  title: {
    flexGrow: 1,
  }
});

class VendorDashboard extends Component {

    constructor(props){
        super(props)

    this.NewVendorProduct = this.NewVendorProduct.bind(this);
    this.ProductStatus = this.ProductStatus.bind(this);
    this.ReadyToDispatch = this.ReadyToDispatch.bind(this);
    this.Dispatched = this.Dispatched.bind(this);
    this.Logout = this.Logout.bind(this);
    }
    NewVendorProduct(event) {
        this.props.history.push('/newvendorproduct')
    }
    ProductStatus(event) {
        this.props.history.push('/productstatus')
    }
    ReadyToDispatch(event) {
        this.props.history.push('/readytodispatch')
    }
    Dispatched(event) {
        this.props.history.push('/dispatched')
    }
    Logout(event) {
        this.props.history.push('/vendorsignin')
    }

render() {
    const {classes} = this.props;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          <Button color= "inherit" onClick = {this.NewVendorProduct} >
                New Product                 
        </Button>
        <Button color= "inherit" onClick = {this.ProductStatus} >
                Product Status         
        </Button>
        <Button color= "inherit" onClick = {this.ReadyToDispatch} >
                Ready To Dispatch             
        </Button>
        <Button color= "inherit" onClick = {this.Dispatched} >
                Dispatched             
        </Button>
        <Button color= "inherit" onClick = {this.Logout} >
                Logout            
        </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
    }
}

export default withStyles(styles)(VendorDashboard);
