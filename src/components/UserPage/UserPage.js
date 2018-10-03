import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import axios from 'axios';
import './UserPage.css'


const mapStateToProps = state => ({
  user: state.user,
});

class UserPage extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        city: '',
        current_temp: '',
        humidity: '',
        sky: '' ,
        description: '',
        wind: '',
        code: null,
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
        url: `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.city},US&APPID=c0ff50f9018d710e46090ab603c45046&units=imperial`
      }).then((response) => {
        console.log(response.data.list[0]);
        this.setState({
          current_temp: response.data.list[0].main.temp,
          humidity: response.data.list[0].main.humidity,
          sky: response.data.list[0].weather[0].main ,
          description: response.data.list[0].weather[0].description ,
          wind: response.data.list[0].wind.speed ,
          code: response.data.list[0].weather[0].id ,
        })
      }).catch(function(error){
        console.log('Error in getWeather:', error);
        alert('Error Getting Weather')
      });
  }
  
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
  }

  render() {
    let content = null;
    let description = this.state.description;
    let code = this.state.code;
    let wind = this.state.wind;
    let sky = this.state.sky;
    let currentTemp= this.state.current_temp;

    if (this.props.user.userName) {
      content = (
        <div>
          <h1
            id="welcome"
          >
             { this.props.user.userName }'s Closet 
          </h1>
          <p>Your ID is: {this.props.user.id}</p>
          <div id="weatherInfo">
            <div id= "weatherInputContainer">
              <input placeholder="Current City" 
                onChange={this.handleChange}
                name="city"/>
              <button id="weatherBTN" onClick={this.getWeather}>
                Get Weather
              </button>
            </div>
            {code !== null && <div id="weatherContent">
              <div id="weatherAlerts">
                {25 > wind > 15 && <p>Remember a windbreaker!</p>}
                {sky ==='Rain' && <p>Remember an umbrella or rain coat!</p>}
                {(currentTemp<65 && currentTemp>=55) && <p>It's a bit brisk: consider a sweater.</p>}
                {(40<currentTemp && currentTemp<55)&& <p>It's chilly! Wear a jacket </p>}
                {(0<currentTemp && currentTemp<40) && <p>Bundle up! It's going to be very cold. </p>}
                {currentTemp<0 && <p>Honestly, don't go outside: it's a tundra nightmare. </p>}
              </div>
              <h4>Current Weather</h4>
              <div id="weatherIconContainer">
                {description ==="few clouds" && <img className="weatherIcon" src={require("./cloudy-day-1.svg")}></img>}
                {description ==="scattered clouds" && <img className="weatherIcon" src={require("./cloudy-day-2.svg")}></img>}
                {description ==="broken clouds" && <img className="weatherIcon" src={require("./cloudy.svg")}></img>}
                {description ==="clear sky" && <img className="weatherIcon" src={require("./day.svg")}></img>}
                {description ==="shower rain" && <img className="weatherIcon" src={require("./rainy-1.svg")}></img>}
                {description ==="Rain" || description === "light rain" && <img className="weatherIcon" src={require("./rainy-6.svg")}></img>}
                {description === "thunderstorm" && <img className="weatherIcon" src={require("./thunder.svg")}></img>}
              </div>
              <div id="tempData">
                <p><b>Temperature:</b> {this.state.current_temp}°F</p>
                <p><b>Humidity:</b> {this.state.humidity} %</p>
                <p><b>Conditions:</b> {this.state.sky}</p> 
                <p>{this.state.description}</p>
                <p><b>Wind:</b> {this.state.wind} mph</p>
              </div>
            </div>}
            </div>
        </div>
      );
    }
    
    return (
      <div >
        <Header title="Project Base" />
        <Nav />
        <br/>
        <div id="userContent">
          { content }
        </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);

