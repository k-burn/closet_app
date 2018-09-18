import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.css';
import { triggerLogout } from '../../redux/actions/loginActions';



const mapStateToProps = state => ({
  user: state.user,
});

//class extends components
class Header extends Component{

  logout = () => {
    this.props.dispatch(triggerLogout());
  }
    render() {
      let welcomeStatement = null;
      if (this.props.user.userName) {
        welcomeStatement = (
          <div id="welcomeStatement">
            <h4 id="welcomeHeader">
              Welcome, { this.props.user.userName }!
            </h4>
            <br/>
            <button id="logoutBTN" onClick={this.logout}>Logout</button>
          </div>)
      }
        return(
            //you can only return one thing, so wrap it all up in one div
            <div>
                <h1>the Closet App</h1>
                { welcomeStatement } 
            </div>
        )
    }
}

//export component
export default connect(mapStateToProps)(Header);
