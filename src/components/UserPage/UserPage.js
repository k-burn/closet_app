import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import axios from 'axios';


const mapStateToProps = state => ({
  user: state.user,
});

class UserPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
        current_temp: '',
        humidity: '',
        sky: '' ,
        description: '',
        wind: '',
    };
  }
  
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  getWeather = () => {
    console.log('in getWEATHER');
    
    axios({
        method: 'GET', 
        url: 'http://api.openweathermap.org/data/2.5/forecast?q=Minneapolis,US&APPID=c0ff50f9018d710e46090ab603c45046&units=imperial'
      }).then((response) => {
        console.log(response.data.list[0]);
        this.setState({
          current_temp: response.data.list[0].main.temp,
          humidity: response.data.list[0].main.humidity,
          sky: response.data.list[0].weather[0].main ,
          description: response.data.list[0].weather[0].description ,
          wind: response.data.list[0].wind.speed 
        })

      }).catch(function(error){
        console.log('Error in getWeather:', error);
        alert('Error Getting Weather')
      });
  }
  

  logout = () => {
    this.props.dispatch(triggerLogout());
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <h1
            id="welcome"
          >
            Welcome, { this.props.user.userName }!
          </h1>
          <p>Your ID is: {this.props.user.id}</p>
          <div id="weatherInfo">
            <input placeholder="Current City"></input>
            <button onClick={this.getWeather}>
              Get Weather
            </button>
            <p>{JSON.stringify(this.state)}</p>
            <h4>Current Weather</h4>
            <p>Temperature: {this.state.current_temp} F</p>
            <p>Humidity: {this.state.humidity} %</p>
            <p>Conditions: {this.state.sky}</p>
            <p> {this.state.description}</p>
            <p>Wind: {this.state.wind} mph</p>

          </div>
          <button
            onClick={this.logout}
          >
            Log Out
          </button>
        
        </div>
      );
    }

    return (
      <div>
        <Nav />
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);

