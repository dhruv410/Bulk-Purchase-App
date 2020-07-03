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

class UserDashboard extends Component {

    constructor(props){
        super(props)

    this.NewUserProduct = this.NewUserProduct.bind(this);
    this.MyOrders = this.MyOrders.bind(this);
    this.UserDispatched = this.UserDispatched.bind(this);
    this.UserPlaced = this.UserPlaced.bind(this);
    this.Logout = this.Logout.bind(this);
    this.Cancelled = this.Cancelled.bind(this);
    }
    NewUserProduct(event) {
        this.props.history.push('/newuserproduct')
    }
    MyOrders(event) {
        // window.location.reload()
        this.props.history.push('/myorders')
    }
    UserDispatched(event) {
        this.props.history.push('/userdispatched')
    }
    UserPlaced(event) {
      this.props.history.push('/userplaced')
    }
    Cancelled(event) {
      this.props.history.push('/cancelled')
    }
    Logout(event) {
        this.props.history.push('/usersignin')
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
          <Button color= "inherit" onClick = {this.NewUserProduct} >
                Buy                 
        </Button>
        <Button color= "inherit" onClick = {this.MyOrders} >
                Waiting      
        </Button>
        <Button color= "inherit" onClick = {this.UserPlaced} >
                Placed         
        </Button>
        <Button color= "inherit" onClick = {this.UserDispatched} >
                Dispatched             
        </Button>
        <Button color= "inherit" onClick = {this.Cancelled} >
                Cancelled             
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

export default withStyles(styles)(UserDashboard);
