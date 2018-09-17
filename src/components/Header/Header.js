import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  user: state.user,
});
//class extends components
class Header extends Component{
    render() {
      let content = null;
      if (this.props.user.userName) {
        content = (
          <div>
            <h4 id="welcomeHeader">
              Welcome, { this.props.user.userName }!
            </h4>
          </div>)
      }
        return(
            //you can only return one thing, so wrap it all up in one div
            <div>
                <h1>the Closet App</h1>
                { content }
            </div>
        )
    }
}

//export component
export default connect(mapStateToProps)(Header);
