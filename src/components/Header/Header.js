import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.css';

const mapStateToProps = state => ({
  user: state.user,
});
//class extends components
class Header extends Component{
    render() {
      let welcomeStatement = null;
      if (this.props.user.userName) {
        welcomeStatement = (
          <div id="welcomeStatment">
            <h4 id="welcomeHeader">
              Welcome, { this.props.user.userName }!
            </h4>
            <br/>
            <button id="logoutBTN">Logout</button>
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
