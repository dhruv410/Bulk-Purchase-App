import React, {Component} from 'react';
import Button from '@material-ui/core/Button';



/* App component */
class Main extends React.Component {
    constructor(props){
        super(props)
        this.state = {
        }
        this.goToUserSignIn = this.goToUserSignIn.bind(this);
        this.goToVendorSignIn = this.goToVendorSignIn.bind(this);
      }
      goToUserSignIn(event) {
        this.props.history.push('/usersignin')
      }
      goToVendorSignIn(event) {
        this.props.history.push('/vendorsignin')
      }
  render() {
    const {classes} = this.props;
    return (
      <div>
          <div>
              <Button onClick = {this.goToUserSignIn}>
                User 
                </Button>
            </div>
            <div>
              <Button onClick = {this.goToVendorSignIn}>
                Vendor
                </Button>
            </div>
      </div>
    )
  }
}

export default Main;