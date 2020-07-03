import React from 'react';
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
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import UserSignUp from './components/usersignup.js'
import UserSignIn from './components/usersignin.js'
import VendorSignUp from './components/vendorsignup.js'
import VendorSignIn from './components/vendorsignin.js'
import UserDashboard from './components/userdashboard.js'
import NewUserProduct from './components/newuserproduct.js'
import MyOrders from './components/myorders.js'
import UserDispatched from './components/userdispatched.js'
import UserPlaced from './components/userplaced.js'
import Cancelled from './components/cancelled.js'
import VendorDashboard from './components/vendordashboard.js'
import NewVendorProduct from './components/newvendorproduct.js'
import ProductStatus from './components/productstatus.js'
import ReadyToDispatch from './components/readytodispatch.js'
import Dispatched from './components/dispatched.js'
import Main from './components/main.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// redirect_to_singup(event)
// {
//   this.props.history.push()
// }

function App() {
  return (
    // <SignUp />
    <Router>
        <Route exact path ='/' component = {UserSignUp} />
        <Route path='/usersignup' component = {UserSignUp} />
        <Route path='/usersignin' component = {UserSignIn} />
        <Route path='/vendorsignup' component = {VendorSignUp} />
        <Route path='/vendorsignin' component = {VendorSignIn} />
        <Route path='/userdashboard' component = {UserDashboard} /> 
        <Route path='/vendordashboard' component = {VendorDashboard} /> 
        <Route path='/newvendorproduct' component = {NewVendorProduct} />
        <Route path='/readytodispatch' component = {ReadyToDispatch} /> 
        <Route path='/productstatus' component = {ProductStatus} /> 
        <Route path='/dispatched' component = {Dispatched} /> 
        <Route path='/newuserproduct' component = {NewUserProduct} />
        <Route path='/myorders' component = {MyOrders} />
        <Route path='/userdispatched' component = {UserDispatched} />
        <Route path='/userplaced' component = {UserPlaced} />
        <Route path='/cancelled' component = {Cancelled} />
    </Router>
  );
}
export default App;
